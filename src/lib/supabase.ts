// Supabase client helper for Cloudflare Workers
export function createSupabaseClient(url: string, key: string) {
  const baseUrl = url.replace(/\/$/, '')
  
  async function query(table: string, options: {
    select?: string
    filter?: Record<string, any>
    eq?: [string, any][]
    order?: [string, boolean]
    limit?: number
    single?: boolean
  } = {}) {
    let endpoint = `${baseUrl}/rest/v1/${table}?`
    const params: string[] = []
    
    if (options.select) params.push(`select=${encodeURIComponent(options.select)}`)
    if (options.eq) {
      for (const [col, val] of options.eq) {
        params.push(`${col}=eq.${encodeURIComponent(val)}`)
      }
    }
    if (options.order) {
      params.push(`order=${options.order[0]}.${options.order[1] ? 'desc' : 'asc'}`)
    }
    if (options.limit) params.push(`limit=${options.limit}`)
    
    const headers: Record<string, string> = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': options.single ? 'return=representation,count=exact' : 'return=representation'
    }
    if (options.single) headers['Accept'] = 'application/vnd.pgrst.object+json'
    
    const res = await fetch(endpoint + params.join('&'), { headers })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Supabase query error: ${err}`)
    }
    return res.json()
  }

  async function insert(table: string, data: any) {
    const res = await fetch(`${baseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Supabase insert error: ${err}`)
    }
    return res.json()
  }

  async function update(table: string, id: string, data: any) {
    const res = await fetch(`${baseUrl}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Supabase update error: ${err}`)
    }
    return res.json()
  }

  async function remove(table: string, id: string) {
    const res = await fetch(`${baseUrl}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=representation'
      }
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Supabase delete error: ${err}`)
    }
    return res.json()
  }

  async function rpc(fn: string, params: any = {}) {
    const res = await fetch(`${baseUrl}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Supabase rpc error: ${err}`)
    }
    return res.json()
  }

  return { query, insert, update, remove, rpc, baseUrl, key }
}

// Simple JWT helper (for Cloudflare Workers - no Node.js crypto)
export async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const enc = new TextEncoder()
  
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const payloadB64 = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 86400 * 30 })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${headerB64}.${payloadB64}`))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  return `${headerB64}.${payloadB64}.${sigB64}`
}

export async function verifyJWT(token: string, secret: string): Promise<any> {
  const [headerB64, payloadB64, sigB64] = token.split('.')
  if (!headerB64 || !payloadB64 || !sigB64) throw new Error('Invalid token')
  
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  
  const sigStr = atob(sigB64.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - sigB64.length % 4) % 4))
  const sig = new Uint8Array([...sigStr].map(c => c.charCodeAt(0)))
  
  const valid = await crypto.subtle.verify('HMAC', key, sig, enc.encode(`${headerB64}.${payloadB64}`))
  if (!valid) throw new Error('Invalid signature')
  
  const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - payloadB64.length % 4) % 4)))
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired')
  
  return payload
}

// Simple password hash (SHA-256 based - good enough for PIN)
export async function hashPin(pin: string): Promise<string> {
  const enc = new TextEncoder()
  const hash = await crypto.subtle.digest('SHA-256', enc.encode(pin + 'fashionkas-salt-2026'))
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}
