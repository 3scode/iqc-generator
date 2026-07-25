import { file, serve } from 'bun'
import { join } from 'path'

const DIST = join(import.meta.dir, 'dist')
const PORT = parseInt(process.env.PORT || '8080')

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
}

async function serveStatic(url: string): Promise<Response> {
  let pathname = new URL(url, 'http://localhost').pathname

  // SPA fallback: return index.html for non-file routes
  if (!pathname.includes('.')) {
    pathname = '/index.html'
  }

  const filePath = join(DIST, pathname)
  const f = file(filePath)
  const exists = await f.exists()

  if (!exists) {
    // Fallback to index.html for SPA
    const fallback = file(join(DIST, 'index.html'))
    return new Response(fallback, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const ext = pathname.substring(pathname.lastIndexOf('.'))
  return new Response(f, {
    headers: { 'Content-Type': MIME[ext] || 'application/octet-stream' },
  })
}

// ── Browser Pool ─────────────────────────────────────────────────────
// No persistent browser pool – Vercel serverless instances are short‑lived.
// Launch a fresh Chromium for each export request.
async function launchBrowser() {
  const { chromium } = await import('playwright-core')
  const { default: sparticuz } = await import('@sparticuz/chromium')
  const path = await import('path')

  const executablePath = await sparticuz.executablePath()
  process.env.LD_LIBRARY_PATH = path.dirname(executablePath)

  if (typeof sparticuz.setGraphicsMode === 'function') {
    sparticuz.setGraphicsMode(false)
  }

  const browser = await chromium.launch({
    args: sparticuz.args,
    executablePath,
    headless: sparticuz.headless === true || sparticuz.headless === 'shell' || sparticuz.headless === 'new',
  })

  console.log('✅ Chromium browser launched (per‑request)')
  return browser
}

// ── Export API handler ────────────────────────────────────────────────
async function handleExport(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { state, origin, width = 440, height = 956, format = 'png', scale = 3 } = body

  if (!state || !origin) {
    return Response.json({ error: 'state and origin are required' }, { status: 400 })
  }

  try {
    const browser = await launchBrowser()

    const context = await browser.newContext({
      viewport: { width: Number(width), height: Number(height) },
      deviceScaleFactor: Number(scale),
      colorScheme: 'dark',
      locale: 'id-ID',
      hasTouch: true,
      isMobile: true,
    })

    try {
      const page = await context.newPage()

      await page.addInitScript((s: any) => {
        window.__EXPORT_STATE__ = s
      }, state)

      const exportUrl = origin ? `${origin}/export` : `http://localhost:${PORT}/export`

      // Use 'domcontentloaded' instead of 'networkidle' — much faster, and we wait for fonts separately
      await page.goto(exportUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      })

      await page.waitForSelector('[data-export-root]', { timeout: 10000 })

      // Load fonts and replace emoji in parallel
      await Promise.all([
        page.evaluate(() => document.fonts.ready),
        page.evaluate(() => {
          const appleEmoji = (e: string) =>
            'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/' +
            [...e].map(c => c.codePointAt(0)!.toString(16)).join('-') + '.png'
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
          const replace: [Text, string, string][] = []
          while (walker.nextNode()) {
            const node = walker.currentNode as Text
            const text = node.textContent || ''
            const re = /((?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])(?:[\u{FE00}-\u{FE0F}]|[\u{200D}](?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])))*/gu
            let m
            while ((m = re.exec(text)) !== null) replace.push([node, m[0], appleEmoji(m[0])])
          }
          const done = new Set<Node>()
          for (const [node, emoji, url] of replace) {
            if (done.has(node)) continue
            done.add(node)
            const text = node.textContent || ''
            const parts: (Text | HTMLImageElement)[] = []
            let last = 0
            const re2 = /((?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])(?:[\u{FE00}-\u{FE0F}]|[\u{200D}](?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])))*/gu
            let m2
            while ((m2 = re2.exec(text)) !== null) {
              if (m2.index > last) parts.push(document.createTextNode(text.slice(last, m2.index)))
              const img = document.createElement('img')
              img.src = appleEmoji(m2[0])
              img.alt = m2[0]
              img.style.cssText = 'width:1.2em;height:1.2em;vertical-align:middle;display:inline'
              parts.push(img)
              last = m2.index + m2[0].length
            }
            if (last < text.length) parts.push(document.createTextNode(text.slice(last)))
            const frag = document.createDocumentFragment()
            parts.forEach(p => frag.appendChild(p))
            node.parentNode!.replaceChild(frag, node)
          }
        }),
      ])

      await page.waitForTimeout(200)

      const buffer = await page.screenshot({
        type: format === 'jpeg' ? 'jpeg' : 'png',
        ...(format === 'jpeg' ? { quality: 0.95 } : {}),
        clip: { x: 0, y: 0, width: Number(width), height: Number(height) },
      })

      return new Response(buffer, {
        headers: {
          'Content-Type': `image/${format === 'jpeg' ? 'jpeg' : 'png'}`,
          'Cache-Control': 'public, max-age=0, s-maxage=3600',
        },
      })
    } finally {
      await context.close().catch(() => {})
      await browser.close().catch(() => {})
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}

// ── Server ───────────────────────────────────────────────────────────
const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === '/api/export') {
      return handleExport(req)
    }

    return serveStatic(req.url)
  },
})

console.log(`🚀 IQC Generator running at http://localhost:${PORT}`)
