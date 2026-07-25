# IQC Generator — Task List

> Breakdown per screen dari DESIGN.md + Testing + CI/CD

---

## 📋 Ringkasan

| Item | Detail |
|------|--------|
| **Tech Stack** | React 19.3 + Vite 8.1 + TypeScript 6.0 + Tailwind CSS 4.3 |
| **Runtime** | Bun (latest) |
| **State** | Zustand 5 |
| **Canvas** | html-to-image |
| **Routing** | React Router 8.2 |
| **Hosting** | Vercel |
| **Project Status** | Baru (empty directory) |
| **Total Tasks** | 14 |
| **Breakdown** | Per screen |

### Phase Distribution

| Phase | Tasks | Effort Total |
|-------|-------|-------------|
| **Foundation** | T-01, T-02 | M |
| **Core** | T-03 s/d T-08 | L+ |
| **Enhancement** | T-09 s/d T-12 | M |
| **Infrastructure** | T-13, T-14 | S |

---

## T-01: Setup Project

**Modul:** Foundation
**Phase:** Foundation
**Screen:** N/A
**Related FR:** N/A
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** React 19.3 + Vite 8.1 + TypeScript 6.0 + Tailwind CSS 4.3
**File yang diubah:** package.json, vite.config.ts, tsconfig.json, index.html, src/main.tsx, src/App.tsx

### Dependensi
- Tidak ada

### Sub-task Checklist
- [ ] Init project: `bun create vite . --template react-ts`
- [ ] Install dependencies: `bun add react-router-dom zustand html-to-image lucide-react`
- [ ] Install dev dependencies: `bun add -d tailwindcss @tailwindcss/vite vitest @testing-library/react @playwright/test`
- [ ] Setup Tailwind: `vite.config.ts` + `src/index.css` dengan `@import "tailwindcss"`
- [ ] Setup folder structure: `components/ui/`, `components/chat/`, `components/quote/`, `components/layout/`, `hooks/`, `pages/`, `stores/`, `utils/`, `data/`, `types/`
- [ ] Setup React Router di `App.tsx` (3 routes: `/`, `/templates`, `/about`)
- [ ] Setup TypeScript strict mode di `tsconfig.json`
- [ ] Setup `vercel.json` dengan SPA fallback rewrite
- [ ] Buat `.env.example`
- [ ] Setup linting (ESLint + Prettier)
- [ ] Jalankan `bun run dev` — pastikan blank page muncul tanpa error

### Acceptance Criteria
- [ ] `bun run dev` jalan tanpa error
- [ ] Folder structure sesuai Tech Spec
- [ ] Routing React Router berfungsi (3 routes)
- [ ] `vercel.json` siap deploy

---

## T-02: Design System

**Modul:** Foundation
**Phase:** Foundation
**Screen:** All
**Related FR:** FR-01, FR-06
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** Tailwind CSS 4.3
**File yang diubah:** src/index.css, tailwind config

### Dependensi
- T-01: Setup Project

### Sub-task Checklist
- [ ] Implementasi CSS custom properties untuk color tokens light mode (18 token dari DESIGN.md)
- [ ] Implementasi CSS custom properties untuk color tokens dark mode (10 token)
- [ ] Implementasi typography tokens via Tailwind `@theme` atau utility classes
- [ ] Implementasi spacing tokens (4px grid → 2xs s/d 3xl)
- [ ] Implementasi border radius tokens (sm, md, lg, full, bubble)
- [ ] Implementasi shadow/elevation tokens (sm, md, lg)
- [ ] Setup dark mode via Tailwind `@variant dark` + `class` strategy
- [ ] Setup Inter font via Google Fonts `@import` atau self-hosted
- [ ] Test semua token konsisten di light & dark mode

### Acceptance Criteria
- [ ] Semua color token dari DESIGN.md ada di CSS
- [ ] Dark mode toggle bisa switch seluruh UI
- [ ] Typography scale match design spec
- [ ] Shadow & radius sesuai spec

---

## T-03: Creator Screen — Form Panel

**Modul:** Core — Creator
**Phase:** Core
**Screen:** Creator (Home)
**Related FR:** FR-01, FR-03, FR-05, FR-07, FR-08
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** L
**Tech Stack:** React 19.3 + Zustand 5 + Lucide React
**File yang diubah:** src/pages/Creator.tsx, src/components/chat/MessageListItem.tsx, src/stores/formStore.ts

### Dependensi
- T-01: Setup Project
- T-02: Design System

### Sub-task Checklist
- [ ] Buat Zustand `formStore` — state untuk messages, senderName, time, battery, signal, quoteMessageId, bgType, bgColor, bgGradientEnd, bgImage, layout, showWatermark
- [ ] Buat actions: `addMessage`, `removeMessage`, `updateMessage`, `setQuote`, `setField`, `reset`
- [ ] Buat komponen `MessageListItem` — input text + sender dropdown (You/Other) + delete + "Jadikan Quote" toggle
- [ ] Buat form section: list of MessageListItem + "Add Message" button
- [ ] Buat form section: sender name input
- [ ] Buat form section: status bar config (time text input, battery slider 0-100, signal select 1-4)
- [ ] Buat form section: quote config (radio/select yang message jadi quote)
- [ ] Buat form section: background config (Solid → color picker, Gradient → 2 color picker, Image → file upload)
- [ ] Layout Creator page: 2-column (form left, preview right) desktop / single column mobile
- [ ] Validasi: min 1 message, max 10, max 200 chars, max 20 chars sender name

### Acceptance Criteria
- [ ] Form panel render semua field sesuai DESIGN.md
- [ ] Add/remove message works dengan animasi
- [ ] Zustand store update saat form diisi
- [ ] Validasi mencegah data invalid
- [ ] Responsive: stack di mobile, side-by-side di desktop

---

## T-04: Creator Screen — Preview Panel + Phone Frame

**Modul:** Core — Creator
**Phase:** Core
**Screen:** Creator (Home)
**Related FR:** FR-02, FR-04
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** L
**Tech Stack:** React 19.3 + Tailwind CSS 4.3
**File yang diubah:** src/components/chat/PhoneFrame.tsx, src/components/chat/ChatBubble.tsx, src/components/chat/StatusBar.tsx, src/pages/Creator.tsx

### Dependensi
- T-03: Creator — Form Panel

### Sub-task Checklist
- [ ] Buat komponen `StatusBar` — time (left/center), signal bars (right), battery percentage + icon
- [ ] Buat komponen `ChatBubble` — 2 variants: Sent (blue bg, right aligned) + Received (grey bg, left aligned)
- [ ] ChatBubble pakai proper `isQuote` → tampilkan glow/badge "Quote"
- [ ] Buat komponen `PhoneFrame` — iPhone outline dengan rounded corners + notch + status bar + home indicator
- [ ] Buat komponen `QuoteCard` — large quote text (28px bold) + author name + background
- [ ] Wire up live preview: subscribe ke Zustand formStore dan render semua komponen real-time
- [ ] Dark mode: PhoneFrame otomatis ganti light/dark sesuai uiStore
- [ ] Empty state: ketika belum ada data, tampilkan placeholder
- [ ] Animasi crossfade 150ms saat preview update

### Acceptance Criteria
- [ ] PhoneFrame render sesuai DESIGN.md (status bar + chat bubbles + quote overlay)
- [ ] ChatBubble sent vs received visually distinct
- [ ] Live preview update real-time (tanpa klik generate)
- [ ] Quote message ditandai dengan visual indicator
- [ ] Phone frame look realistis ala iPhone

---

## T-05: Creator Screen — Layout Switcher + Background Config

**Modul:** Core — Creator
**Phase:** Core
**Screen:** Creator (Home)
**Related FR:** FR-04, FR-05
**Prioritas:** 🟡 Mid
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** React 19.3 + Tailwind CSS 4.3
**File yang diubah:** src/components/quote/LayoutSwitcher.tsx, src/pages/Creator.tsx, src/utils/canvas.ts

### Dependensi
- T-04: Creator — Preview Panel

### Sub-task Checklist
- [ ] Buat komponen `LayoutSwitcher` — 3 buttons: 9:16 (Story), 1:1 (Feed), 4:5 (Portrait)
- [ ] Layout button aktif punya visual indicator (primary solid)
- [ ] QuoteCard container mengubah aspect ratio sesuai layout
- [ ] Background type switcher: Solid / Gradient / Image
- [ ] Color picker untuk solid color dan gradient start/end
- [ ] File upload untuk background image (max 5MB, validasi format PNG/JPG/WebP)
- [ ] Live preview background berubah sesuai config

### Acceptance Criteria
- [ ] 3 layout ratio options work dan preview berubah
- [ ] Background solid/gradient/image tampil di preview
- [ ] File upload validasi format & size
- [ ] Layout switcher responsive

---

## T-06: Full Preview Modal + Export

**Modul:** Core — Export
**Phase:** Core
**Screen:** Full Preview (Modal)
**Related FR:** FR-09, FR-10, FR-11, FR-12, FR-13
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** L
**Tech Stack:** React 19.3 + html-to-image
**File yang diubah:** src/components/quote/FullPreviewModal.tsx, src/utils/canvas.ts, src/utils/download.ts, src/stores/uiStore.ts

### Dependensi
- T-04: Creator — Preview Panel

### Sub-task Checklist
- [ ] Buat komponen `FullPreviewModal` — overlay + centered card + close button
- [ ] Clone DOM QuoteCard + render ke Canvas via `html-to-image` dengan resolusi 2x
- [ ] Tampilkan hasil render di modal ukuran penuh
- [ ] Buat button "Download PNG" → Blob → `URL.createObjectURL` → trigger download
- [ ] Buat fallback "Copy to Clipboard" via Clipboard API
- [ ] Watermark toggle (opsional, default off)
- [ ] Spinner saat rendering, toast sukses setelah download
- [ ] Animasi modal open/close (scale + fade)
- [ ] Buat Zustand `uiStore` — modalOpen, toast state, toggleDarkMode

### Acceptance Criteria
- [ ] Modal open dengan animasi smooth
- [ ] Gambar render dengan resolusi 2x
- [ ] Download menghasilkan file `.png`
- [ ] Copy to clipboard work (atau fallback)
- [ ] Toast muncul setelah download sukses
- [ ] Tutup modal via ✕ atau backdrop click

---

## T-07: Templates Screen

**Modul:** Core — Templates
**Phase:** Core
**Screen:** Templates
**Related FR:** FR-14, FR-15, FR-16
**Prioritas:** 🟡 Mid
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** React 19.3 + Tailwind CSS 4.3
**File yang diubah:** src/pages/Templates.tsx, src/data/templates.ts, src/utils/templates.ts

### Dependensi
- T-01: Setup Project
- T-02: Design System

### Sub-task Checklist
- [ ] Buat file `src/data/templates.ts` — minimal 6 template (Classic Blue, Dark Elegant, Pink Aesthetic, Green Mint, Neon Vibes, Monochrome)
- [ ] Setiap template punya: id, name, category, thumbnail path, preset data lengkap
- [ ] Buat halaman Templates — grid layout (2 col mobile, 3 col tablet, 4 col desktop)
- [ ] Buat TemplateCard — thumbnail + nama + badge kategori + button "Apply"
- [ ] Buat search bar + filter chips (All, Populer, Minimal, Colorful)
- [ ] Search debounce 300ms untuk filtering
- [ ] Fungsi "Apply" → set semua form state dari preset → redirect ke `/`
- [ ] Loading skeleton saat grid loading
- [ ] Empty state "Tidak ada template" saat search no result

### Acceptance Criteria
- [ ] 6+ template tampil di grid
- [ ] Search + filter work
- [ ] Apply template → redirect ke Creator dengan form terisi
- [ ] Responsive grid
- [ ] Loading skeleton + empty state

---

## T-08: About Screen

**Modul:** Core — About
**Phase:** Core
**Screen:** About / Help
**Related FR:** FR-17, FR-18
**Prioritas:** 🟢 Low
**Status:** ⬜ Todo
**Effort:** S
**Tech Stack:** React 19.3 + Tailwind CSS 4.3
**File yang diubah:** src/pages/About.tsx, src/components/ui/Accordion.tsx

### Dependensi
- T-02: Design System

### Sub-task Checklist
- [ ] Buat halaman About — deskripsi tool + tagline + versi
- [ ] Buat komponen `Accordion` — expandable Q&A
- [ ] Buat FAQ section (minimal 4 pertanyaan: Apa itu IQC? Apakah data aman? Format gambar? Bisa komersial?)
- [ ] Buat Privacy Statement — 100% client-side, zero data stored
- [ ] Buat Credits — "Made with ❤️ by ..." + copyright
- [ ] Responsive: max-width 720px centered di desktop, full width di mobile

### Acceptance Criteria
- [ ] About page render dengan 3 section (About, FAQ, Privacy)
- [ ] FAQ accordion expand/collapse dengan animasi
- [ ] Responsive layout

---

## T-09: Dark Mode

**Modul:** Enhancement
**Phase:** Enhancement
**Screen:** All
**Related FR:** FR-06
**Prioritas:** 🟡 Mid
**Status:** ⬜ Todo
**Effort:** S
**Tech Stack:** React 19.3 + Tailwind CSS 4.3
**File yang diubah:** src/stores/uiStore.ts, src/hooks/useDarkMode.ts, src/components/layout/Header.tsx

### Dependensi
- T-02: Design System
- T-03: Creator — Form Panel

### Sub-task Checklist
- [ ] Buat hook `useDarkMode` — sync Zustand uiStore.darkMode ke `<html>` class + localStorage
- [ ] Deteksi system preference via `prefers-color-scheme` media query
- [ ] Buat toggle component di Header (icon sun/moon)
- [ ] Semua komponen pakai Tailwind `dark:` variant
- [ ] Persist preference di localStorage

### Acceptance Criteria
- [ ] Toggle switch light/dark untuk seluruh UI
- [ ] Preference tersimpan di localStorage
- [ ] Default follow system preference
- [ ] Transisi smooth antar mode

---

## T-10: Error Handling

**Modul:** Enhancement
**Phase:** Enhancement
**Screen:** All
**Related FR:** N/A
**Prioritas:** 🟡 Mid
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** React 19.3
**File yang diubah:** src/components/ui/Toast.tsx, src/utils/validation.ts, src/components/ErrorBoundary.tsx

### Dependensi
- T-03: Creator — Form Panel
- T-06: Full Preview Modal

### Sub-task Checklist
- [ ] Buat komponen `Toast` — 4 variants (success, error, warning, info)
- [ ] Toast slide in top → hold 3s → slide out
- [ ] Integrasikan ke uiStore (showToast action)
- [ ] Buat React Error Boundary — fallback UI jika crash
- [ ] Buat `src/utils/validation.ts` — validasi form (empty, max chars, file size, file type)
- [ ] Implementasi validasi di form Creator (red border + error text)
- [ ] Error handling canvas render gagal (try-catch → error toast)
- [ ] Error handling download gagal (try-catch → error toast)
- [ ] Error handling clipboard fallback (toast "Browser tidak support")

### Acceptance Criteria
- [ ] Toast muncul untuk semua error scenario
- [ ] Form validation tampil inline (red border + text)
- [ ] Error Boundary catch unexpected errors
- [ ] Error toast auto dismiss 3 detik

---

## T-11: Testing (Unit + E2E)

**Modul:** Enhancement
**Phase:** Enhancement
**Screen:** All
**Related FR:** N/A
**Prioritas:** 🟡 Mid
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** Vitest + React Testing Library + Playwright

### Dependensi
- T-01: Setup Project
- T-03 s/d T-10 (setelah fitur selesai)

### Sub-task Checklist
- [ ] Setup Vitest config (`vitest.config.ts`) dengan jsdom environment
- [ ] Setup Playwright config (`playwright.config.ts`)
- [ ] Unit test: `src/utils/__tests__/validation.test.ts` — validasi message, file, etc.
- [ ] Unit test: `src/stores/__tests__/formStore.test.ts` — addMessage, removeMessage, setField, applyTemplate
- [ ] Unit test: `src/stores/__tests__/uiStore.test.ts` — toggleDarkMode, modal, toast
- [ ] Component test: `src/components/chat/__tests__/ChatBubble.test.tsx` — render sent & received
- [ ] Component test: `src/components/chat/__tests__/StatusBar.test.tsx` — render with different values
- [ ] Component test: `src/components/ui/__tests__/Button.test.tsx` — render variants & states
- [ ] E2E test: `e2e/create-quote.spec.ts` — buka page → isi form → generate → download
- [ ] E2E test: `e2e/template-flow.spec.ts` — templates page → apply → redirect → form terisi
- [ ] E2E test: `e2e/dark-mode.spec.ts` — toggle dark mode → UI berubah

### Acceptance Criteria
- [ ] `bun run test` — semua unit test pass
- [ ] `bun run test:e2e` — semua E2E test pass
- [ ] Coverage > 80% untuk utils + stores
- [ ] Critical flows tercover E2E

---

## T-12: CI/CD Pipeline + Deploy Vercel

**Modul:** Infrastructure
**Phase:** Infrastructure
**Screen:** N/A
**Related FR:** N/A
**Prioritas:** 🔴 High
**Status:** ⬜ Todo
**Effort:** M
**Tech Stack:** GitHub Actions + Vercel

### Dependensi
- T-01: Setup Project
- T-11: Testing

### Sub-task Checklist
- [ ] Buat `.github/workflows/ci.yml` — trigger on push ke main & PR
- [ ] CI stages: lint → typecheck → unit test → build
- [ ] Setup Vercel project via vercel.com (import dari GitHub repo)
- [ ] Config `vercel.json` — build command `bun run build`, output `dist`
- [ ] SPA fallback rewrite: `{ "source": "/(.*)", "destination": "/index.html" }`
- [ ] Setup environment variables di Vercel dashboard
- [ ] Auto-deploy: Vercel auto-deploy setiap push ke main branch
- [ ] Preview deploys for PR (Vercel preview URLs)
- [ ] Test production: verifikasi site live di `iqc-generator.vercel.app`
- [ ] Rollback test: verifikasi one-click rollback via Vercel dashboard

### Acceptance Criteria
- [ ] GitHub Actions CI pass (lint + typecheck + test + build)
- [ ] Vercel auto-deploy dari main branch
- [ ] PR preview URLs work
- [ ] Site accessible di production URL
- [ ] SPA routing works (refresh di `/templates` ga 404)

---

## Task Review

```
🔍 Task Review — Konsistensi Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase Coverage:      ✅ Foundation 2 | Core 6 | Enhancement 3 | Infra 1
Screen Coverage:     ✅ 4/4 screen dari DESIGN.md
Dependencies:        ✅ Linear, no circular
Effort:              ✅ S=4, M=7, L=3 — realistis untuk scope
Opsional Tasks:      ✅ Testing + CI/CD sesuai pilihan user
Hosting:             ✅ Vercel (sudah diupdate dari Netlify)
CI/CD:               ✅ GitHub Actions + Vercel auto-deploy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ✅ All clear
```
