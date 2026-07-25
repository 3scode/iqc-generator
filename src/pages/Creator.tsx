import { useState, useRef } from 'react'
import {
  Trash2, Quote, MessageSquare, Clock,
  Battery, Wifi, Palette, ImageIcon, Smartphone,
  Sparkles, Sliders, Signal, Zap, Plane
} from 'lucide-react'
import { useFormStore } from '../stores/formStore'
import { useUiStore } from '../stores/uiStore'
import { Button } from '../components/ui/Button'
import { QuoteCard } from '../components/quote/QuoteCard'

import { validateMessage, validateImage, validateMaxMessages } from '../utils/validation'
import { downloadBlob } from '../utils/download'
import { getLayoutSize } from '../utils/canvas'
import { templates } from '../data/templates'
import type { BgType } from '../types'

function Section({ icon: Icon, title, children }: { icon: typeof MessageSquare; title: string; children: React.ReactNode }) {
  return (
    <div className="neumorph-card bg-[--color-surface] p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-[#D5DCE6]/50 pb-3">
        <div className="w-8 h-8 rounded-[var(--radius-inner)] bg-[--color-surface] neumorph-sm flex items-center justify-center">
          <Icon className="size-4 text-[--color-accent]" strokeWidth={2} />
        </div>
        <h3 className="text-sm font-bold font-display tracking-tight text-[--color-foreground]">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export function Creator() {
  const store = useFormStore()
  const showToast = useUiStore((s) => s.showToast)
  const fileRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    store.messages.forEach((m) => {
      const r = validateMessage(m.text)
      if (!r.valid) e[`msg_${m.id}`] = r.error!
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const [exporting, setExporting] = useState(false)

  const handleDownload = async () => {
    if (!validate()) return
    if (!store.quoteMessageId) {
      showToast('warning', 'Pilih satu pesan sebagai quote via ikon kutipan')
      return
    }

    const size = getLayoutSize(store.layout)
    setExporting(true)

    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: {
            messages: store.messages,
            senderName: store.senderName,
            time: store.time,
            battery: store.battery,
            carrier: store.carrier,
            quoteMessageId: store.quoteMessageId,
            bgType: store.bgType,
            bgColor: store.bgColor,
            bgGradientEnd: store.bgGradientEnd,
            bgImage: store.bgImage,
            layout: store.layout,
            showWifi: store.showWifi,
            airplaneMode: store.airplaneMode,
            showContact: store.showContact,
            contactAvatar: store.contactAvatar,
            headerColor: store.headerColor,
            chatMode: store.chatMode,
            groupName: store.groupName,
            groupAvatar: store.groupAvatar,
            memberCount: store.memberCount,
            showSenderName: store.showSenderName,
            isMuted: store.isMuted,
            isVerified: store.isVerified,
          },
          origin: window.location.origin,
          width: size.width,
          height: size.height,
          format: 'png',
          scale: 3,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Gagal mengekspor gambar' }))
        throw new Error(body.error || 'Gagal mengekspor gambar')
      }
      const blob = await res.blob()
      downloadBlob(blob, 'iqc-quote.png')
      showToast('success', 'Quote tersimpan: IQC-Quote.png')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal mengekspor gambar'
      showToast('error', msg)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6 max-w-[520px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[--color-foreground]">Buat Quote</h1>
            <p className="text-sm text-[--color-muted] mt-1">Isi chat, pilih quote, download.</p>
          </div>
          <button onClick={store.reset} className="text-sm font-medium text-[--color-muted] hover:text-red-500 transition-colors cursor-pointer">
            Reset
          </button>
        </div>

        <Section icon={MessageSquare} title="Pesan Chat">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-[--color-muted] min-w-fit">Nama Kontak</label>
            <input
              value={store.senderName}
              onChange={(e) => store.setField('senderName', e.target.value)}
              placeholder="Nama kontak..."
              className="neumorph-input flex-1 h-9 px-3 text-sm bg-[--color-surface] text-[--color-foreground] placeholder:text-[--color-muted]/50"
            />
            <button
              onClick={() => store.setField('showContact', !store.showContact)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${store.showContact ? 'bg-[--color-accent]' : 'bg-[--color-muted]/30'} neumorph-inset-sm`}
              title={store.showContact ? 'Sembunyikan kontak' : 'Tampilkan kontak'}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${store.showContact ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={store.contactAvatar || ''}
              onChange={(e) => store.setField('contactAvatar', e.target.value || null)}
              placeholder="URL foto profil..."
              className="neumorph-input flex-1 h-9 px-3 text-sm bg-[--color-surface] text-[--color-foreground] placeholder:text-[--color-muted]/50"
            />
            <label className="neumorph-sm bg-[--color-surface] px-3 h-9 flex items-center rounded-[var(--radius-base)] text-xs font-medium text-[--color-muted] cursor-pointer hover:neumorph transition-all">
              Upload
              <input
                type="file" accept="image/*" hidden
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  const r = new FileReader()
                  r.onload = () => store.setField('contactAvatar', r.result as string)
                  r.readAsDataURL(f)
                }}
              />
            </label>
            {store.contactAvatar && (
              <button onClick={() => store.setField('contactAvatar', null)} className="text-xs text-[--color-muted] hover:text-red-500 transition-colors cursor-pointer">Hapus</button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {store.contactAvatar && (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[--color-muted]/20">
                <img src={store.contactAvatar} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#D5DCE6]/30">
            <span className="text-xs font-medium text-[--color-muted]">Mode Grup</span>
            <button
              onClick={() => store.setField('chatMode', store.chatMode === 'group' ? 'personal' : 'group')}
              className={`relative w-11 h-6 rounded-full transition-colors ${store.chatMode === 'group' ? 'bg-[--color-accent]' : 'bg-[--color-muted]/30'} neumorph-inset-sm`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${store.chatMode === 'group' ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {store.chatMode === 'group' && (
            <div className="space-y-3 p-3 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-inset-sm">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-[--color-muted] min-w-fit">Nama Grup</label>
                <input value={store.groupName} onChange={(e) => store.setField('groupName', e.target.value)} placeholder="Nama Grup" className="neumorph-input flex-1 h-9 px-3 text-sm bg-[--color-surface] text-[--color-foreground] placeholder:text-[--color-muted]/50" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={store.groupAvatar || ''}
                  onChange={(e) => store.setField('groupAvatar', e.target.value || null)}
                  placeholder="URL foto grup..."
                  className="neumorph-input flex-1 h-9 px-3 text-sm bg-[--color-surface] text-[--color-foreground] placeholder:text-[--color-muted]/50"
                />
                <label className="neumorph-sm bg-[--color-surface] px-3 h-9 flex items-center rounded-[var(--radius-base)] text-xs font-medium text-[--color-muted] cursor-pointer hover:neumorph transition-all">
                  Upload
                  <input
                    type="file" accept="image/*" hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      const r = validateImage(f)
                      if (!r.valid) { showToast('error', r.error!); return }
                      const reader = new FileReader()
                      reader.onload = () => store.setField('groupAvatar', reader.result as string)
                      reader.readAsDataURL(f)
                    }}
                  />
                </label>
                {store.groupAvatar && (
                  <button onClick={() => store.setField('groupAvatar', null)} className="text-xs text-[--color-muted] hover:text-red-500 transition-colors cursor-pointer">Hapus</button>
                )}
              </div>
              {store.groupAvatar && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[--color-muted]/20">
                    <img src={store.groupAvatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-[--color-muted]">Preview foto grup</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <label className="text-xs text-[--color-muted]">Peserta</label>
                <input type="range" min={2} max={50} value={store.memberCount} onChange={(e) => store.setField('memberCount', Number(e.target.value))} className="flex-1" />
                <span className="text-xs font-bold text-[--color-foreground] w-6 text-right">{store.memberCount}</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-[--color-muted] cursor-pointer">
                  <input type="checkbox" checked={store.showSenderName} onChange={(e) => store.setField('showSenderName', e.target.checked)} className="accent-[--color-accent]" />
                  Nama Pengirim
                </label>
                <label className="flex items-center gap-2 text-xs text-[--color-muted] cursor-pointer">
                  <input type="checkbox" checked={store.isMuted} onChange={(e) => store.setField('isMuted', e.target.checked)} className="accent-[--color-accent]" />
                  Mute
                </label>
                <label className="flex items-center gap-2 text-xs text-[--color-muted] cursor-pointer">
                  <input type="checkbox" checked={store.isVerified} onChange={(e) => store.setField('isVerified', e.target.checked)} className="accent-[--color-accent]" />
                  Verified
                </label>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {store.messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 items-start p-3 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-inset-sm">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <select
                      value={msg.sender}
                      onChange={(e) => store.updateMessage(msg.id, { sender: e.target.value as 'you' | 'other' })}
                      className="text-xs font-medium px-3 py-1.5 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-inset-sm text-[--color-foreground] outline-none cursor-pointer"
                    >
                      <option value="you">Pesan Kanan</option>
                      <option value="other">Pesan Kiri</option>
                    </select>
                  </div>
                  <input
                    value={msg.text}
                    onChange={(e) => { store.updateMessage(msg.id, { text: e.target.value }); setErrors((prev) => ({ ...prev, [`msg_${msg.id}`]: '' })) }}
                    placeholder="Ketik pesan..."
                    className={`neumorph-input w-full h-10 px-4 text-sm bg-[--color-surface] text-[--color-foreground] placeholder:text-[--color-muted]/50 ${errors[`msg_${msg.id}`] ? '!shadow-[inset_6px_6px_10px_rgb(239,68,68,0.3),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]' : ''}`}
                  />
                  {errors[`msg_${msg.id}`] && <p className="text-xs text-red-500">{errors[`msg_${msg.id}`]}</p>}
                </div>
                <div className="flex flex-col gap-1.5 pt-5">
                  <button
                    onClick={() => store.setQuote(store.quoteMessageId === msg.id ? null : msg.id)}
                    className={`p-2 rounded-[var(--radius-base)] transition-all duration-300 cursor-pointer bg-[--color-surface] ${
                      store.quoteMessageId === msg.id
                        ? 'text-[--color-accent] neumorph-inset-sm'
                        : 'text-[--color-muted] neumorph-sm hover:neumorph'
                    }`}
                    title="Jadikan Quote"
                  >
                    <Quote className="size-4" />
                  </button>
                  {store.messages.length > 1 && (
                    <button onClick={() => store.removeMessage(msg.id)} className="p-2 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-sm text-[--color-muted] hover:text-red-500 transition-all duration-300 cursor-pointer" title="Hapus">
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const check = validateMaxMessages(store.messages.length)
                if (!check.valid) {
                  showToast('warning', check.error!)
                  return
                }
                store.addMessage()
              }}
            >
              <MessageSquare className="size-4" /> Tambah Pesan
            </Button>
          </div>
        </Section>

        <Section icon={Sliders} title="Status Bar">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-[--color-muted] flex items-center gap-1.5">
              <Plane className="size-3.5" strokeWidth={2} /> Airplane Mode
            </span>
            <button
              onClick={() => store.setField('airplaneMode', !store.airplaneMode)}
              className={`relative w-11 h-6 rounded-full transition-colors ${store.airplaneMode ? 'bg-[--color-accent]' : 'bg-[--color-muted]/30'} neumorph-inset-sm`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${store.airplaneMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-[--color-muted] flex items-center gap-1.5">
              <Wifi className="size-3.5" strokeWidth={2} /> WiFi
            </span>
            <button
              onClick={() => store.setField('showWifi', !store.showWifi)}
              className={`relative w-11 h-6 rounded-full transition-colors ${store.showWifi ? 'bg-[--color-accent]' : 'bg-[--color-muted]/30'} neumorph-inset-sm`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${store.showWifi ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[120px]">
              <label className="text-xs font-medium text-[--color-muted] flex items-center gap-1.5 mb-1.5">
                <Clock className="size-3.5" strokeWidth={2} /> Waktu
              </label>
              <input
                value={store.time}
                onChange={(e) => store.setField('time', e.target.value)}
                placeholder="09:41"
                className="neumorph-input w-full h-10 px-3 text-sm bg-[--color-surface] text-[--color-foreground]"
              />
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="text-xs font-medium text-[--color-muted] flex items-center gap-1.5 mb-1.5">
                <Battery className="size-3.5" strokeWidth={2} /> Baterai
              </label>
              <div className="flex items-center gap-2 h-10">
                <input type="range" min={0} max={100} value={store.battery} onChange={(e) => store.setField('battery', Number(e.target.value))} className="flex-1" />
                <span className="text-sm font-bold font-display text-[--color-foreground] w-8 text-right">{store.battery}%</span>
              </div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="text-xs font-medium text-[--color-muted] flex items-center gap-1.5 mb-1.5">
                <Signal className="size-3.5" strokeWidth={2} /> Operator
              </label>
              <select value={store.carrier} onChange={(e) => store.setField('carrier', e.target.value)} className="w-full h-10 px-3 text-sm bg-[--color-surface] text-[--color-foreground] outline-none cursor-pointer">
                {['Telkomsel', 'Indosat', 'XL', 'Axis', 'Tri', 'Smartfren', 'By.U'].map((op) => <option key={op} value={op}>{op}</option>)}
              </select>
            </div>
          </div>
        </Section>

        <Section icon={Sparkles} title="Template">
          <div className="grid grid-cols-2 gap-3">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => { store.applyTemplate(tpl); showToast('success', `Template "${tpl.name}" diterapkan`) }}
                className="neumorph-sm bg-[--color-surface] p-3 rounded-[var(--radius-base)] text-left hover:neumorph transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="size-3 text-[--color-accent]" />
                  <span className="text-xs font-bold font-display text-[--color-foreground] truncate">{tpl.name}</span>
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Section icon={Palette} title="Background">
          <div className="grid grid-cols-3 gap-3">
            {(['solid', 'gradient', 'image'] as BgType[]).map((t) => (
              <button key={t} onClick={() => store.setField('bgType', t)}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-[var(--radius-base)] transition-all duration-300 cursor-pointer bg-[--color-surface] ${
                  store.bgType === t
                    ? 'text-[--color-accent] neumorph-inset-sm'
                    : 'text-[--color-muted] neumorph-sm hover:neumorph'
                }`}
              >
                {t === 'solid' && <Palette className="size-3.5" />}
                {t === 'gradient' && <Sparkles className="size-3.5" />}
                {t === 'image' && <ImageIcon className="size-3.5" />}
                {t}
              </button>
            ))}
          </div>
          {store.bgType === 'solid' && (
            <div className="flex items-center gap-4">
              <input type="color" value={store.bgColor} onChange={(e) => store.setField('bgColor', e.target.value)} />
              <span className="text-xs font-mono text-[--color-muted]">{store.bgColor}</span>
            </div>
          )}
          {store.bgType === 'gradient' && (
            <div className="flex items-center gap-4">
              <input type="color" value={store.bgColor} onChange={(e) => store.setField('bgColor', e.target.value)} />
              <span className="text-[--color-muted] text-sm">→</span>
              <input type="color" value={store.bgGradientEnd} onChange={(e) => store.setField('bgGradientEnd', e.target.value)} />
              <div className="flex-1 h-9 rounded-[var(--radius-base)]" style={{ background: `linear-gradient(135deg, ${store.bgColor}, ${store.bgGradientEnd})` }} />
            </div>
          )}
          {store.bgType === 'image' && (
            <>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const r = validateImage(file)
                if (!r.valid) { showToast('error', r.error!); return }
                const reader = new FileReader()
                reader.onload = () => store.setField('bgImage', reader.result as string)
                reader.readAsDataURL(file)
              }} hidden />
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
                  <ImageIcon className="size-4" /> {store.bgImage ? 'Ganti' : 'Pilih Gambar'}
                </Button>
                {store.bgImage && (
                  <Button variant="ghost" size="sm" onClick={() => store.setField('bgImage', null)}>
                    Hapus
                  </Button>
                )}
              </div>
              {store.bgImage && (
                <div className="rounded-[var(--radius-base)] overflow-hidden neumorph-inset-sm">
                  <img src={store.bgImage} alt="" className="w-full h-24 object-cover" />
                </div>
              )}
            </>
          )}
        </Section>

        <div className="neumorph-card p-5">
          <Button variant="secondary" fullWidth size="lg" onClick={handleDownload} loading={exporting}>
            <Smartphone className="size-5" /> Download Gambar
          </Button>
        </div>
      </div>

      <div className="lg:flex-1 lg:sticky lg:top-20 lg:self-start">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-display tracking-tight text-[--color-foreground] flex items-center gap-2">
            <Smartphone className="size-4" strokeWidth={2} /> Preview
          </h3>
          <span className="text-[10px] font-medium text-[--color-accent] bg-[--color-surface] px-2.5 py-1 rounded-full neumorph-inset-sm">Live</span>
        </div>
        <div className="neumorph-card bg-[--color-surface] p-6 flex justify-center overflow-auto min-h-[450px] items-center">
          {store.messages.some((m) => m.text.trim()) ? (
            <QuoteCard
              messages={store.messages}
              senderName={store.senderName}
              time={store.time}
              battery={store.battery}
              carrier={store.carrier}
              quoteMessageId={store.quoteMessageId}
              bgType={store.bgType}
              bgColor={store.bgColor}
              bgGradientEnd={store.bgGradientEnd}
              bgImage={store.bgImage}
              layout={store.layout}
              showWifi={store.showWifi}
              airplaneMode={store.airplaneMode}
              showContact={store.showContact}
              contactAvatar={store.contactAvatar}
              headerColor={store.headerColor}
              chatMode={store.chatMode}
              groupName={store.groupName}
              groupAvatar={store.groupAvatar}
              memberCount={store.memberCount}
              showSenderName={store.showSenderName}
              isMuted={store.isMuted}
              isVerified={store.isVerified}
            />
          ) : (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-[var(--radius-base)] bg-[--color-surface] neumorph-sm flex items-center justify-center mx-auto mb-4">
                <Smartphone className="size-6 text-[--color-muted]" strokeWidth={2} />
              </div>
              <p className="text-sm font-medium text-[--color-muted]">Isi pesan di form samping</p>
              <p className="text-xs text-[--color-muted]/60 mt-1">Preview akan muncul otomatis</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
