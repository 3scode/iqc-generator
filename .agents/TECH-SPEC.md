# IQC Generator — Technical Specification

> **iPhone Quote Chat Creator**
> Bikin quote chat iPhone aesthetic dalam 1 klik. Langsung siap posting, tanpa edit ulang.

---

## BAGIAN 1: Tech Stack & Arsitektur

### Tech Stack

| Layer | Technology | Version | Keterangan |
|-------|------------|---------|------------|
| Runtime | Bun | latest | JavaScript runtime & package manager |
| Frontend | React | 19.3.x | UI framework |
| Language | TypeScript | 6.0.x | Type safety |
| Bundler | Vite | 8.1.x | Dev server + build |
| Styling | Tailwind CSS | 4.3.x | Utility-first CSS |
| State | Zustand | 5.x | Global state (form + preferences) |
| Canvas | html-to-image | 1.x | DOM → PNG export |
| Icons | Lucide React | latest | Icon set |
| Font | Inter (Google Fonts) | latest | Typography |
| Routing | React Router | 8.2.x | SPA routing |
| Hosting | Vercel | — | Static site, auto-deploy via Git, edge CDN |

### Arsitektur Sistem

```
Browser (Client-side)
┌─────────────────────────────────────────────────┐
│  IQC Generator App                              │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Creator  │  │Templates │  │   About      │  │
│  │  Page    │  │  Page    │  │   Page       │  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │               │          │
│  ┌────┴──────────────┴───────────────┴───────┐  │
│  │           Zustand Store                    │  │
│  │  (form state, preferences, UI state)       │  │
│  └────────────────────────────────────────────┘  │
│       │              │               │          │
│  ┌────┴──────────────┴───────────────┴───────┐  │
│  │           Utility Layer                   │  │
│  │  Canvas renderer, template engine,        │  │
│  │  download handler, validation             │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │localStor-│  │  File    │  │  Clipboard   │  │
│  │age (pref)│  │  Reader  │  │  API         │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
         │
         ▼
    CDN (Vercel Edge)
    ┌────────────────┐
    │ Static Assets  │
    │ (JS, CSS,      │
    │  fonts, images)│
    └────────────────┘
```

### Struktur Folder

```
src/
├── assets/               # Static assets (images, fonts)
├── components/           # Shared UI components
│   ├── ui/               # Atoms (Button, Input, Toggle, Toast)
│   ├── chat/             # Chat-specific (ChatBubble, PhoneFrame, StatusBar)
│   ├── quote/            # QuoteCard, LayoutSwitcher
│   └── layout/           # Header, BottomNav, Container
├── hooks/                # Custom React hooks
│   ├── useCanvasExport.ts
│   ├── useDarkMode.ts
│   ├── useClipboard.ts
│   └── useTemplates.ts
├── pages/                # Route pages
│   ├── Creator.tsx
│   ├── Templates.tsx
│   └── About.tsx
├── stores/               # Zustand stores
│   ├── formStore.ts      # Chat messages, quote config, colors
│   └── uiStore.ts        # Dark mode, layout ratio, modals
├── utils/                # Utility functions
│   ├── canvas.ts         # Canvas rendering engine
│   ├── download.ts       # Download handler
│   ├── validation.ts     # Form validation
│   └── templates.ts      # Template data + apply logic
├── data/                 # Static data
│   └── templates.json    # Preset template definitions
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared types
├── App.tsx               # Root component + router
├── main.tsx              # Entry point
└── index.css             # Tailwind + global styles
```

### Justifikasi

| Keputusan | Alasan |
|-----------|--------|
| **React + Vite** | SPA ringan, HMR cepat, dev experience optimal. Cocok untuk client-side tool tanpa backend. |
| **TypeScript** | Type safety untuk form state + canvas config yang kompleks |
| **Tailwind CSS** | Implementasi design system (color tokens, spacing, typography) cepat & konsisten |
| **Zustand** | State management minimalis tanpa boilerplate — cocok untuk form + preferences |
| **html-to-image** | Konversi DOM node ke PNG dengan kualitas tinggi, resolusi 2x |
| **Bun** | Package manager + runtime all-in-one, install 5x lebih cepat dari npm, built-in TypeScript support |
| **Vercel** | Deploy static site dari Git, free tier, edge CDN global, zero config untuk Vite |

### Code Snippets

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020' },
})
```

```bash
# Setup project with Bun
bun create vite . --template react-ts
bun add react-router-dom zustand html-to-image lucide-react
bun add -d tailwindcss @tailwindcss/vite vitest @testing-library/react @playwright/test
```

```ts
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

---

## BAGIAN 2: Database Design

### Ringkasan

| Item | Detail |
|------|--------|
| Database | **None** — 100% client-side |
| Persistence | `localStorage` untuk dark mode preference saja |
| State | In-memory (Zustand store) — hilang saat page di-reload |
| File Storage | Tidak ada — background image via FileReader (in-memory) |

### Alasan

IQC Generator adalah **zero-backend static web app**. Semua data:
- Chat messages → in-memory (Zustand)
- Dark mode pref → localStorage
- Background image → FileReader (in-memory, hilang saat page leave)
- Templates → static JSON (bundled in JS)

### localStorage Schema

```ts
interface LocalStoragePrefs {
  darkMode: boolean           // Dark mode preference
}
```

### Data Flow

```
User Input → Zustand Store → React Re-render → Canvas Preview
     ↓
Canvas Node → html-to-image → PNG Blob → Download / Clipboard
```

---

## BAGIAN 3: Interface Design

### Ringkasan

Karena IQC Generator adalah **SPA murni tanpa backend**, interface berupa:
- **Routes** (React Router) — navigasi antar halaman
- **Zustand Actions** — state mutations (setara dengan API calls)
- **No REST/GraphQL endpoints**

### Route List

| Route | Page | Screen (DESIGN.md) | Description |
|-------|------|-------------------|-------------|
| `/` | Creator | Creator (Home) | Form input + live preview |
| `/templates` | Templates | Templates | Browse & apply templates |
| `/about` | About | About / Help | Info, FAQ, privacy |

### Zustand Store Interface (Pengganti API)

#### formStore

```ts
interface ChatMessage {
  id: string
  text: string
  sender: 'you' | 'other'
}

interface FormStore {
  // State
  messages: ChatMessage[]
  senderName: string
  time: string
  battery: number
  signal: number
  quoteMessageId: string | null
  bgType: 'solid' | 'gradient' | 'image'
  bgColor: string
  bgGradientEnd: string
  bgImage: string | null  // data URL
  layout: '9:16' | '1:1' | '4:5'
  showWatermark: boolean

  // Actions
  addMessage: () => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, data: Partial<ChatMessage>) => void
  setQuote: (id: string | null) => void
  setField: <K extends keyof FormStore>(key: K, value: FormStore[K]) => void
  applyTemplate: (template: Template) => void
  reset: () => void
}
```

#### uiStore

```ts
interface UiStore {
  darkMode: boolean
  modalOpen: boolean
  toast: { type: string; message: string } | null

  toggleDarkMode: () => void
  openModal: () => void
  closeModal: () => void
  showToast: (type: string, message: string) => void
}
```

### Standarisasi Response Format

Tidak relevan — 100% client-side. Error handling via Zustand state + Toast component.

### State Flow Diagram

```
User types message
       ↓
formStore.updateMessage(id, { text })
       ↓
React re-renders PhoneFrame + QuoteCard
       ↓
html-to-image captures DOM
       ↓
User clicks "Download" → Blob → save
```

---

## BAGIAN 4: Alur Logika & Business Rules

### Alur 1: Create Quote

```
1. User opens Creator page (/)
2. Default form state loaded (1 empty message, default time/battery/signal)
3. User types chat message(s) → live preview updates via Zustand
4. User selects sender (You/Other) per message
5. User taps "Jadikan Quote" on one message → quote overlay appears
6. User adjusts status bar (time, battery, signal)
7. User selects layout ratio (9:16 / 1:1 / 4:5)
8. User selects background (solid/gradient/image)
9. User clicks "Generate IQC"
   a. Zustand state validated (min 1 message, quote selected)
   b. DOM node cloned → html-to-image renders to PNG canvas
   c. 2x resolution PNG blob generated
10. Full Preview modal opens with final image
11. User clicks "Download PNG"
    a. Blob → URL.createObjectURL → <a download> click
    b. File name: iqc-quote-{timestamp}.png
12. Toast: "Berhasil diunduh!"
```

### Alur 2: Apply Template

```
1. User opens Templates page (/templates)
2. Template grid loaded from static JSON data
3. User browses / searches templates
4. User clicks "Apply" on template card
   a. formStore.applyTemplate(template) called
   b. All form fields populated from template preset
   c. Redirect to Creator page (/)
5. User sees prefilled form + live preview
6. User tweaks as needed
7. User generates & downloads
```

### Business Rules

| Rule | Description |
|------|-------------|
| BR-01 | Min 1 message, max 10 messages |
| BR-02 | Max 200 chars per message |
| BR-03 | Max 20 chars for sender name |
| BR-04 | Only 1 quote message at a time |
| BR-05 | Time format: "09:41" (HH:MM) |
| BR-06 | Battery: 0-100% |
| BR-07 | Signal: 1-4 bars |
| BR-08 | Layout: 9:16 (720×1280), 1:1 (720×720), 4:5 (720×900) |
| BR-09 | Export resolution: 2x for retina quality |
| BR-10 | Background image max 5MB, format PNG/JPG/WebP |

### Error Handling & Retry Strategy

**Karena 100% client-side, error handling minimal:**

| Error | Handler |
|-------|---------|
| **Canvas render fail** | Try-catch → Toast "Gagal render. Coba ubah pengaturan." |
| **Download fail** | Try-catch → Toast "Gagal mengunduh. Coba lagi." |
| **Clipboard not supported** | Fallback → Toast "Browser tidak support copy. Gunakan download." |
| **FileReader invalid type** | Validation → Toast "Format gambar tidak didukung." |
| **FileReader size > 5MB** | Validation → Toast "Ukuran gambar maksimal 5MB." |
| **localStorage quota** | Try-catch → Graceful degradation (pref tidak tersimpan) |

**Tidak perlu retry/circuit breaker — semua operasi lokal, bukan network.**

### Code Snippets

```ts
// src/utils/canvas.ts
import { toPng } from 'html-to-image'

export async function renderQuote(
  element: HTMLElement,
  options: { width: number; height: number }
): Promise<Blob> {
  const dataUrl = await toPng(element, {
    width: options.width * 2,
    height: options.height * 2,
    style: {
      transform: `scale(2)`,
      transformOrigin: 'top left',
    },
    pixelRatio: 2,
  })
  const res = await fetch(dataUrl)
  return res.blob()
}
```

```ts
// src/utils/download.ts
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
```

---

## BAGIAN 5: Keamanan, Performa, CI/CD & Deployment

### Keamanan

| Item | Implementation |
|------|---------------|
| **Input Sanitization** | Chat messages rendered as text nodes (not innerHTML) — XSS aman |
| **File Upload** | Via FileReader — tidak dikirim ke server |
| **HTTPS** | Vercel provides auto TLS/SSL |
| **No Backend** | Zero attack surface — semua client-side |
| **No Tracking** | Optional privacy-first analytics (Plausible/Umami) |

### Performa

| Parameter | Target | Strategy |
|-----------|--------|----------|
| Bundle Size (JS) | < 150kB gzipped | Code splitting per page, lazy load templates |
| FCP | < 1.5s | Minimal dependencies, CDN, preconnect Google Fonts |
| Preview Latency | < 100ms | Zustand direct mutation, no debounce on preview |
| Canvas Render | < 500ms | offscreen canvas, requestAnimationFrame |
| Lighthouse | ≥ 95 | Optimized images, semantic HTML, no render-blocking |

### CI/CD Pipeline

**Branch Strategy:** Trunk-based (main branch, deploy on push)

| Stage | Trigger | Actions |
|-------|---------|---------|
| Lint | Push to any branch | `bun run lint` (ESLint + Prettier) |
| Typecheck | Push to any branch | `bun run typecheck` (tsc --noEmit) |
| Build | Push to main | `bun run build` (Vite production build) |
| Deploy | Build success on main | Vercel auto-deploy from Git |

**Rollback Strategy:**
- Vercel: One-click rollback to previous deploy via dashboard
- Git: `git revert` commit → push → auto-deploy

### Deployment

```json
// vercel.json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Development Setup

```bash
# Clone & install
git clone <repo-url> && cd iqc-generator
bun install

# Dev server (hot reload)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Testing
bun run test
bun run test:e2e
```

---

## BAGIAN 6: Monitoring & Observability

### Ringkasan

Karena 100% static site, observability minimal. Tidak ada server-side metrics.

### Logging

| Item | Detail |
|------|--------|
| Console | `console.error` untuk error handling |
| Error Boundary | React Error Boundary untuk menangkap render error |

### Metrics (via Optional Analytics)

| Metric | Tool | Note |
|--------|------|------|
| Page views | Plausible / Umami | Privacy-first, cookie-less |
| Generate events | Custom event | `plausible('generate')` |
| Download events | Custom event | `plausible('download')` |
| Template apply | Custom event | `plausible('apply-template')` |

### Error Tracking

| Tool | Note |
|------|------|
| **None in V1** | Karena tidak ada backend, dan error bersifat lokal (browser), cukup dengan console.error + Error Boundary UI |

### Availability

| Item | Detail |
|------|--------|
| Uptime | 99.9% (Vercel SLA) |
| Maintenance | Zero — static site, deploy tanpa downtime |

### Fallback

- **JS disabled:** `<noscript>` tag — "Aplikasi membutuhkan JavaScript untuk berjalan."
- **Canvas not supported:** Deteksi via `typeof HTMLCanvasElement` → fallback UI "Browser Anda tidak mendukung fitur canvas."
- **Offline:** Tidak diperlukan — semua assets di-cache browser setelah load.

---

## BAGIAN 7: Environment Variables

### Ringkasan

Karena 100% client-side static site, hanya ada **1 env** yang diperlukan:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_APP_URL` | `https://iqc-generator.vercel.app` | Base URL untuk meta tags & share |

Opsional (analytics):

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_PLAUSIBLE_DOMAIN` | `iqc-generator.vercel.app` | Plausible analytics domain |
| `VITE_UMAMI_WEBSITE_ID` | `xxx-xxx` | Umami website ID |
| `VITE_UMAMI_URL` | `https://umami.example.com` | Umami instance URL |

---

## BAGIAN 8: Testing Strategy

### Ringkasan

| Layer | Framework | Coverage Target |
|-------|-----------|-----------------|
| Unit | Vitest | 80%+ |
| Component | Vitest + React Testing Library | 80%+ |
| E2E | Playwright | Critical flows |

### Unit Testing

```ts
// src/utils/__tests__/validation.test.ts
import { describe, it, expect } from 'vitest'
import { validateMessage } from '../validation'

describe('validateMessage', () => {
  it('returns valid for normal message', () => {
    expect(validateMessage('Hello!')).toEqual({ valid: true })
  })
  it('returns error for empty message', () => {
    expect(validateMessage('')).toEqual({ valid: false, error: 'Pesan tidak boleh kosong' })
  })
  it('returns error for message > 200 chars', () => {
    expect(validateMessage('a'.repeat(201))).toEqual({ valid: false, error: 'Maksimal 200 karakter' })
  })
})
```

### Component Testing

```ts
// src/components/chat/__tests__/ChatBubble.test.tsx
import { render, screen } from '@testing-library/react'
import { ChatBubble } from '../ChatBubble'

describe('ChatBubble', () => {
  it('renders sent bubble with correct styling', () => {
    render(<ChatBubble text="Hello" type="sent" time="09:41" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('09:41')).toBeInTheDocument()
  })
})
```

### E2E Testing (Playwright)

```ts
// e2e/create-quote.spec.ts
import { test, expect } from '@playwright/test'

test('user can create and download a quote', async ({ page }) => {
  await page.goto('/')
  await page.fill('[data-testid="message-input-0"]', 'Test quote')
  await page.click('[data-testid="add-message"]')
  await page.click('[data-testid="generate-btn"]')
  await expect(page.locator('[data-testid="preview-modal"]')).toBeVisible()
  await page.click('[data-testid="download-btn"]')
})
```

### Test Folder Structure

```
src/
├── __tests__/              # Unit tests
│   └── utils/
├── components/
│   └── chat/__tests__/     # Component tests
├── stores/__tests__/        # Store tests
└── pages/__tests__/         # Page tests
e2e/                         # E2E tests
└── create-quote.spec.ts
```

### Testing Config

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      lines: 80,
      branches: 70,
    },
  },
})
```

---

## BAGIAN 9: Data Migration & Seeding

### Ringkasan

**Tidak ada legacy system.** Ini adalah aplikasi baru dari nol.

Satu-satunya "seed data" adalah template bawaan:

```ts
// src/data/templates.ts
export const templates: Template[] = [
  {
    id: 'tpl-classic-blue',
    name: 'Classic Blue',
    category: 'populer',
    thumbnail: '/templates/classic-blue.png',
    preset: {
      senderName: 'John',
      messages: [
        { text: 'Hey, how are you?', sender: 'other' },
        { text: 'I\'m good, thanks!', sender: 'you' },
      ],
      quoteMessageIndex: 1,
      time: '09:41',
      battery: 85,
      signal: 4,
      bgType: 'solid',
      bgColor: '#F2F2F7',
      layout: '9:16',
    },
  },
  {
    id: 'tpl-dark-elegant',
    name: 'Dark Elegant',
    category: 'populer',
    thumbnail: '/templates/dark-elegant.png',
    preset: {
      senderName: 'Alex',
      messages: [
        { text: 'Check this out! 🔥', sender: 'other' },
        { text: 'Wow, that\'s amazing!', sender: 'you' },
      ],
      quoteMessageIndex: 1,
      time: '22:15',
      battery: 23,
      signal: 3,
      bgType: 'gradient',
      bgColor: '#1a1a2e',
      bgGradientEnd: '#16213e',
      layout: '9:16',
    },
  },
  // ... minimal 6 template
]
```

### Template Image Generation

Thumbnail template bisa di-generate otomatis saat build (script Node.js yang render tiap preset → screenshot → save ke `/public/templates/`), atau manual dibuat sekali.

---

## Tech Spec Review

```
🔍 Tech Spec Review — Konsistensi Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tech Stack:           ✅ React + Vite + TS + Tailwind — sesuai platform Web
Arsitektur:           ✅ 100% client-side — zero backend, zero database
Struktur Folder:      ✅ Best practice React + Vite
State Management:     ✅ Zustand — 2 store (form + UI)
Canvas Export:        ✅ html-to-image — 2x resolusi
Routing:              ✅ React Router — 3 routes sesuai DESIGN.md
Alur Logika:          ✅ 2 main flows — Create + Template Apply
Business Rules:       ✅ 10 rules — jelas & measurable
Error Handling:       ✅ 6 error types — semua client-side native
Performa:             ✅ Target spesifik (FCP < 1.5s, bundle < 150kB)
CI/CD:                ✅ Trunk-based, 4 stages, Vercel deploy
Monitoring:           ✅ Minimal — sesuai arsitektur static
Testing:              ✅ Unit + Component + E2E — Vitest + Playwright
Environment:          ✅ Minimal (1-4 vars) — sesuai static site
Templates:            ✅ 6+ template bawaan sebagai seed data
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ✅ All clear
```
