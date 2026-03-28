// Image Upload Routes - Cloudflare R2 Storage
// FashionKas v3.0 - Enhanced with thumbnail generation, Supabase fallback, multi-upload
import { Hono } from 'hono'
import { createSupabaseClient, verifyJWT } from '../lib/supabase'

type Bindings = { 
  SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; JWT_SECRET: string; 
  R2_BUCKET: R2Bucket 
}

export const imageRoutes = new Hono<{ Bindings: Bindings }>()

async function getStoreId(c: any): Promise<string> {
  const auth = c.req.header('Authorization')
  if (!auth) throw new Error('No token')
  const payload = await verifyJWT(auth.replace('Bearer ', ''), c.env.JWT_SECRET)
  return payload.store_id
}

// Upload image to R2 (with Supabase Storage fallback)
imageRoutes.post('/upload', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const contentType = c.req.header('Content-Type') || ''
    
    let imageData: ArrayBuffer
    let filename: string
    let mimeType: string
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await c.req.formData()
      const file = formData.get('image') as File
      if (!file) return c.json({ success: false, message: 'No image file provided' }, 400)
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return c.json({ success: false, message: 'Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.' }, 400)
      }
      if (file.size > 5 * 1024 * 1024) {
        return c.json({ success: false, message: 'Ukuran file maks 5MB' }, 400)
      }
      
      imageData = await file.arrayBuffer()
      const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1]
      filename = `${storeId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      mimeType = file.type
    } else if (contentType.includes('application/json')) {
      const body = await c.req.json()
      if (!body.image) return c.json({ success: false, message: 'No image data' }, 400)
      
      const match = body.image.match(/^data:(image\/(jpeg|png|webp|gif));base64,(.+)$/)
      if (!match) return c.json({ success: false, message: 'Format base64 tidak valid' }, 400)
      
      mimeType = match[1]
      const ext = match[2] === 'jpeg' ? 'jpg' : match[2]
      const base64Data = match[3]
      
      const binaryStr = atob(base64Data)
      const bytes = new Uint8Array(binaryStr.length)
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i)
      }
      imageData = bytes.buffer
      
      if (imageData.byteLength > 5 * 1024 * 1024) {
        return c.json({ success: false, message: 'Ukuran file maks 5MB' }, 400)
      }
      
      filename = `${storeId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    } else {
      return c.json({ success: false, message: 'Content-Type tidak valid' }, 400)
    }

    // Strategy 1: Upload to R2 if available
    if (c.env.R2_BUCKET) {
      try {
        const key = `products/${filename}`
        await c.env.R2_BUCKET.put(key, imageData, {
          httpMetadata: { contentType: mimeType },
          customMetadata: { storeId, uploadedAt: new Date().toISOString() }
        })
        const url = `/api/images/serve/${key}`
        
        // Save reference in Supabase for tracking
        try {
          const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
          await db.insert('product_images', {
            store_id: storeId,
            storage_key: key,
            url: url,
            size: imageData.byteLength,
            mime_type: mimeType,
            storage_type: 'r2'
          })
        } catch { /* tracking insert is non-critical */ }
        
        return c.json({ 
          success: true, 
          data: { url, key, size: imageData.byteLength, storage: 'r2' },
          message: 'Image berhasil diupload!' 
        })
      } catch (r2Err: any) {
        // R2 failed, fall through to Supabase fallback
        console.error('R2 upload failed:', r2Err.message)
      }
    }
    
    // Strategy 2: Upload to Supabase Storage as fallback
    try {
      const supabaseStorageUrl = `${c.env.SUPABASE_URL}/storage/v1/object/product-images/${filename}`
      const uploadRes = await fetch(supabaseStorageUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': mimeType,
          'x-upsert': 'true'
        },
        body: imageData
      })
      
      if (uploadRes.ok) {
        const publicUrl = `${c.env.SUPABASE_URL}/storage/v1/object/public/product-images/${filename}`
        return c.json({ 
          success: true, 
          data: { url: publicUrl, key: filename, size: imageData.byteLength, storage: 'supabase' },
          message: 'Image berhasil diupload!' 
        })
      }
    } catch { /* Supabase storage fallback failed */ }
    
    // Strategy 3: Return base64 data URI as last resort
    const uint8 = new Uint8Array(imageData)
    let binary = ''
    for (let i = 0; i < uint8.length; i++) {
      binary += String.fromCharCode(uint8[i])
    }
    return c.json({ 
      success: true, 
      data: { 
        url: `data:${mimeType};base64,${btoa(binary)}`,
        fallback: true,
        size: imageData.byteLength,
        storage: 'base64',
        message: 'R2 & Supabase Storage belum aktif, menggunakan base64' 
      },
      message: 'Upload berhasil (mode base64)' 
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Serve image from R2
imageRoutes.get('/serve/*', async (c) => {
  try {
    if (!c.env.R2_BUCKET) {
      return c.text('R2 not configured', 404)
    }
    
    const key = c.req.path.replace('/api/images/serve/', '')
    const object = await c.env.R2_BUCKET.get(key)
    
    if (!object) return c.text('Image not found', 404)
    
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e: any) {
    return c.text('Error: ' + e.message, 500)
  }
})

// Delete image from R2
imageRoutes.delete('/delete', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const { key } = await c.req.json()
    if (!key) return c.json({ success: false, message: 'key wajib' }, 400)
    
    if (!key.includes(storeId)) {
      return c.json({ success: false, message: 'Unauthorized' }, 403)
    }
    
    if (c.env.R2_BUCKET) {
      await c.env.R2_BUCKET.delete(key)
    }
    
    // Also remove from Supabase tracking
    try {
      const db = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY)
      // Query and delete by key
      const images = await db.query('product_images', { eq: [['storage_key', key], ['store_id', storeId]] })
      if (images && images.length > 0) {
        await db.remove('product_images', images[0].id)
      }
    } catch { /* tracking delete is non-critical */ }
    
    return c.json({ success: true, message: 'Image dihapus' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// List images for a store
imageRoutes.get('/list', async (c) => {
  try {
    const storeId = await getStoreId(c)
    
    if (!c.env.R2_BUCKET) {
      return c.json({ success: true, data: [], message: 'R2 belum dikonfigurasi' })
    }
    
    const listed = await c.env.R2_BUCKET.list({ prefix: `products/${storeId}/` })
    const images = listed.objects.map(obj => ({
      key: obj.key,
      url: `/api/images/serve/${obj.key}`,
      size: obj.size,
      uploaded: obj.uploaded
    }))
    
    return c.json({ success: true, data: images })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
