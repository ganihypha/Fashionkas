// Image Upload Routes - Cloudflare R2 Storage
// FashionKas v1.2 - Product image upload
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

// Upload image to R2
imageRoutes.post('/upload', async (c) => {
  try {
    const storeId = await getStoreId(c)
    const contentType = c.req.header('Content-Type') || ''
    
    let imageData: ArrayBuffer
    let filename: string
    let mimeType: string
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData upload
      const formData = await c.req.formData()
      const file = formData.get('image') as File
      if (!file) return c.json({ success: false, message: 'No image file provided' }, 400)
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return c.json({ success: false, message: 'Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.' }, 400)
      }
      
      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        return c.json({ success: false, message: 'Ukuran file maks 5MB' }, 400)
      }
      
      imageData = await file.arrayBuffer()
      const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1]
      filename = `${storeId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      mimeType = file.type
    } else if (contentType.includes('application/json')) {
      // Handle base64 upload
      const body = await c.req.json()
      if (!body.image) return c.json({ success: false, message: 'No image data' }, 400)
      
      // Parse base64 data URI
      const match = body.image.match(/^data:(image\/(jpeg|png|webp|gif));base64,(.+)$/)
      if (!match) return c.json({ success: false, message: 'Format base64 tidak valid' }, 400)
      
      mimeType = match[1]
      const ext = match[2] === 'jpeg' ? 'jpg' : match[2]
      const base64Data = match[3]
      
      // Decode base64
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
    
    // Check R2 bucket availability
    if (!c.env.R2_BUCKET) {
      // Fallback: return base64 as data URI (no R2 configured)
      return c.json({ 
        success: true, 
        data: { 
          url: `data:${mimeType};base64,${btoa(String.fromCharCode(...new Uint8Array(imageData)))}`,
          fallback: true,
          message: 'R2 belum dikonfigurasi, menggunakan base64' 
        },
        message: 'Upload berhasil (mode base64)' 
      })
    }
    
    // Upload to R2
    const key = `products/${filename}`
    await c.env.R2_BUCKET.put(key, imageData, {
      httpMetadata: { contentType: mimeType },
      customMetadata: { storeId, uploadedAt: new Date().toISOString() }
    })
    
    // Generate public URL (R2 custom domain or Workers route)
    const url = `/api/images/serve/${key}`
    
    return c.json({ 
      success: true, 
      data: { url, key, size: imageData.byteLength },
      message: 'Image berhasil diupload!' 
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
    
    // Verify ownership
    if (!key.includes(storeId)) {
      return c.json({ success: false, message: 'Unauthorized' }, 403)
    }
    
    if (c.env.R2_BUCKET) {
      await c.env.R2_BUCKET.delete(key)
    }
    
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
