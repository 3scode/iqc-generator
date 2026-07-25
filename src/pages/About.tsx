import { useState } from 'react'
import { Zap, ExternalLink, ChevronDown, MessageSquareText } from 'lucide-react'

const faqs = [
  { q: 'Apa itu IQC Generator?', a: 'IQC (iPhone Quote Chat) Generator adalah tool untuk membuat gambar quote bergaya chat iPhone dari percakapan, siap diposting ke media sosial.' },
  { q: 'Apakah gratis?', a: 'Ya, gratis. Semua fitur bisa dipakai tanpa biaya. Image preview dan download sudah termasuk.' },
  { q: 'Format gambar?', a: 'PNG dan JPEG. Bisa langsung disalin ke clipboard juga.' },
  { q: 'Data saya aman?', a: 'Semua proses ada di browser. Tidak ada data dikirim ke server.' },
  { q: 'Bisa pakai gambar sendiri?', a: 'Bisa. Upload gambar dari perangkat sebagai background quote.' },
]

export function About() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-[600px] mx-auto space-y-6 py-6">
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-[var(--radius-base)] bg-[--color-surface] neumorph flex items-center justify-center mx-auto mb-4">
          <MessageSquareText className="size-7 text-[--color-accent]" strokeWidth={2} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[--color-foreground]">IQC Generator</h1>
        <p className="text-sm text-[--color-muted] mt-2">v1.0.0</p>
        <p className="text-sm text-[--color-muted] mt-4 max-w-[400px] mx-auto leading-relaxed">
          Buat quote bergaya chat iPhone dengan tampilan realistic. Preview real-time, download satu klik.
        </p>
      </div>

      <div className="neumorph-card bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold font-display tracking-tight text-[--color-foreground] flex items-center gap-2">
          <Zap className="size-4 text-[--color-accent]" strokeWidth={2} /> Cara Pakai
        </h2>
        <ol className="space-y-3">
          {[
            'Tulis pesan-pesan seperti di chat iPhone.',
            'Tap ikon kutipan di pesan yang ingin dijadikan quote.',
            'Sesuaikan warna, layout, status bar, dan background.',
            'Klik "Generate Quote" untuk preview penuh.',
            'Download sebagai PNG/JPEG atau salin ke clipboard.',
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[--color-muted]">
              <span className="font-bold text-[--color-accent] shrink-0 w-6 h-6 rounded-full bg-[--color-surface] neumorph-sm flex items-center justify-center text-xs">{i + 1}</span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="neumorph-card bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold font-display tracking-tight text-[--color-foreground] flex items-center gap-2">
          <ChevronDown className="size-4 text-[--color-accent]" strokeWidth={2} /> FAQ
        </h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-[var(--radius-base)] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-[--color-foreground] bg-[--color-surface] neumorph-sm transition-all duration-300 cursor-pointer"
              >
                <span>{f.q}</span>
                <ChevronDown className={`size-4 text-[--color-muted] transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} strokeWidth={2} />
              </button>
              {open === i && (
                <div className="px-4 pb-3 pt-2 text-sm text-[--color-muted] leading-relaxed bg-[--color-surface] neumorph-inset-sm -mt-1 rounded-b-[var(--radius-base)]">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-6">
        <a href="https://github.com/anomalyco/IQCGenerator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[--color-muted] hover:text-[--color-foreground] transition-colors">
          <ExternalLink className="size-4" strokeWidth={2} /> GitHub
        </a>
      </div>
    </div>
  )
}
