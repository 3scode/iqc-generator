function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { state, origin, width = 440, height = 956, format = 'png', scale = 3 } = req.body

  if (!state || !origin) {
    res.status(400).json({ error: 'state and origin are required' })
    return
  }

  try {
    const path = await import('path')
    const { chromium } = await import('playwright-core')
    const { default: sparticuz } = await import('@sparticuz/chromium')

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

    try {
      const context = await browser.newContext({
        viewport: { width: Number(width), height: Number(height) },
        deviceScaleFactor: Number(scale),
        colorScheme: 'dark',
        locale: 'id-ID',
        hasTouch: true,
        isMobile: true,
      })
      const page = await context.newPage()

      await page.addInitScript((s: any) => {
        window.__EXPORT_STATE__ = s
      }, state)

      await page.goto(`${origin}/export`, {
        waitUntil: 'networkidle',
        timeout: 20000,
      })

      await page.waitForSelector('[data-export-root]', { timeout: 10000 })

      await page.evaluate(async () => {
        await document.fonts.ready
      })

      await page.evaluate(() => {
        const appleEmoji = (e: string) => 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/' + [...e].map(c => c.codePointAt(0)!.toString(16)).join('-') + '.png'
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        const replace: [Text, string, string][] = []
        while (walker.nextNode()) {
          const node = walker.currentNode as Text
          const text = node.textContent || ''
          const re = /((?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])(?:[\u{FE00}-\u{FE0F}]|[\u{200D}](?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]))*)/gu
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
          const re2 = /((?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}])(?:[\u{FE00}-\u{FE0F}]|[\u{200D}](?:[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]))*)/gu
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
      })

      await page.waitForTimeout(300)

      const buffer = await page.screenshot({
        type: format === 'jpeg' ? 'jpeg' : 'png',
        ...(format === 'jpeg' ? { quality: 0.95 } : {}),
        clip: { x: 0, y: 0, width: Number(width), height: Number(height) },
      })

      res.setHeader('Content-Type', `image/${format === 'jpeg' ? 'jpeg' : 'png'}`)
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
      res.status(200).send(buffer)
    } finally {
      await browser.close().catch(() => {})
    }
  } catch (err: unknown) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const config = {
  maxDuration: 120,
  memory: 1024,
}
