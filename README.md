<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript 7" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Bun-runtime-F9F9F9?logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Zustand-5-433E38?logo=react&logoColor=white" alt="Zustand 5" />
  <img src="https://img.shields.io/badge/Playwright-export-45BA4B?logo=playwright&logoColor=white" alt="Playwright Export" />
  <img src="https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white" alt="Vercel" />
</div>

<br />

# 📱 IQC Generator — iPhone Quote Chat Maker

**IQC (iPhone Quote Chat) Generator** adalah aplikasi web untuk membuat gambar quote chat bergaya iPhone dengan tampilan WhatsApp yang realistik. Cocok untuk konten sosial media, testimoni, atau sekedar bikin quote aesthetic.

### ✨ Demo

<p align="center">
  <a href="https://iqc-generator.vercel.app">
    <b>🚀 kunjungi iqc-generator.vercel.app</b>
  </a>
</p>

---

## 🎯 Fitur

| Fitur | Keterangan |
|---|---|
| **Quote Chat Realistik** | Pilih satu pesan jadi quote utama, tampil dengan efek ContextMenu, EmojiReactions, dan background chat |
| **💬 Mode Personal** | Tampilan chat 1-on-1 dengan avatar, nama kontak, dan status Online |
| **👥 Mode Grup** | Tampilan chat grup dengan foto grup, jumlah peserta, mute, dan verified badge |
| **🎨 Kustomisasi Background** | Solid color, gradient, atau gambar sendiri |
| **📱 Status Bar** | Atur waktu, baterai, operator, WiFi, Airplane Mode — real kayak iPhone |
| **📋 Template** | Pilih dari berbagai template siap pakai |
| **📸 Ekspor Gambar** | Download PNG resolusi tinggi (3× retina, 1290×2796 px) langsung satu klik |
| **🖼️ Live Preview** | Preview real-time di samping form |
| **🌗 Favicon Dinamis** | Favicon hitam-putih yang menyesuaikan light/dark mode |
| **🔄 Neumorphic Design** | UI dengan efek neumorphism yang elegan dan modern |

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|---|---|
| **React 19** + **TypeScript 7** | Frontend framework dengan type safety |
| **Vite 8** | Bundler super cepat |
| **Tailwind CSS 4** | Styling utility-first |
| **Zustand 5** | State management ringan |
| **React Router 7** | Routing SPA |
| **Lucide React** | Icon set |
| **Playwright** + **@sparticuz/chromium** | Server-side rendering untuk ekspor gambar |
| **Bun** | Runtime & package manager |
| **Vercel** | Hosting & serverless functions |

---

## 🚀 Cara Menjalankan

### Prerequisites
- [Bun](https://bun.sh) v1.x atau lebih baru

### Instalasi

```bash
# Clone repo
git clone https://github.com/3scode/iqc-generator.git
cd iqc-generator

# Install dependencies
bun install

# Jalankan development server
bun run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Scripts

```bash
bun run dev        # Development server
bun run build      # Build production
bun run lint       # TypeScript type-check
bun run test       # Jalankan unit test (29 tests)
bun run test:e2e   # Jalankan Playwright e2e (jika ada)
bun run preview    # Preview build production
```

---

## 🏗️ Arsitektur

```
src/
├── components/
│   ├── chat/          # ChatBubble, MessageInput, PhoneFrame, StatusBar
│   ├── layout/        # Header, BottomNav
│   ├── quote/         # QuoteCard, ContextMenu, EmojiReactions, FullPreviewModal
│   └── ui/            # Button, Input, Toggle, Accordion, Toast
├── pages/
│   ├── Creator.tsx    # Halaman utama pembuatan quote
│   ├── ExportPage.tsx # Halaman headless untuk render ekspor
│   ├── Templates.tsx  # Halaman template
│   └── About.tsx      # Halaman tentang
├── stores/
│   ├── formStore.ts   # State form (messages, quote, bg, layout, grup, dll)
│   └── uiStore.ts     # State UI (dark mode, modal, toast)
├── utils/
│   ├── canvas.ts      # Layout size calculator
│   ├── download.ts    # Utility download file
│   └── validation.ts  # Validasi form
├── data/
│   └── templates.ts   # Data template statis
├── types/
│   └── index.ts       # Type definitions
└── test/
    └── setup.ts       # Setup testing
```

### Export Pipeline

```
Creator → klik "Download Gambar"
  → POST /api/export (form state + origin)
  → Server: launch headless Chromium
  → Navigate ke /export dengan state via addInitScript
  → React render QuoteCard real (CSS, fonts, emoji)
  → document.fonts.ready → Twemoji DOM replacement → 300ms settle
  → Screenshot 3× retina (1290×2796 px)
  → Download PNG
```

---

## 🧪 Testing

Proyek ini memiliki **29 unit tests** yang mencakup:

| File Test | Jumlah |
|---|---|
| `src/stores/__tests__/formStore.test.ts` | 8 tests |
| `src/stores/__tests__/uiStore.test.ts` | 4 tests |
| `src/utils/__tests__/validation.test.ts` | 13 tests |
| `src/components/ui/__tests__/Button.test.tsx` | 4 tests |

---

## 🌐 Deployment

Proyek ini di-deploy ke **Vercel** secara otomatis dari branch `main`.

Konfigurasi:
- `vercel.json` — SPA rewrites + build command
- `.github/workflows/ci.yml` — CI: lint → typecheck → test → build

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan belajar dan pengembangan. Silakan gunakan, modifikasi, dan bagikan sesuai kebutuhan.

---

<p align="center">
  Dibuat dengan ❤️ oleh <a href="https://github.com/3scode">3scode</a>
</p>
