import { useCallback, useState } from 'react'
import { X, Copy, Image, FileImage } from 'lucide-react'
import { useUiStore } from '../../stores/uiStore'
import { useFormStore } from '../../stores/formStore'
import { QuoteCard } from './QuoteCard'
import { Button } from '../ui/Button'
import { downloadBlob } from '../../utils/download'
import { getLayoutSize } from '../../utils/canvas'

const BASE_URL = '/iqc'

export function FullPreviewModal() {
  const { modalOpen: isOpen, closeModal, showToast } = useUiStore()
  const store = useFormStore()
  const [exporting, setExporting] = useState<'idle' | 'png' | 'jpeg'>('idle')

  const callExportApi = useCallback(async (format: 'png' | 'jpeg'): Promise<Blob> => {
    const size = getLayoutSize(store.layout)

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
          headerColor: store.headerColor,
          chatMode: store.chatMode,
          groupName: store.groupName,
          groupAvatar: store.groupAvatar,
          memberCount: store.memberCount,
          showSenderName: store.showSenderName,
          isMuted: store.isMuted,
          isVerified: store.isVerified,
        },
        /*DEBUG*/origin: window.location.origin + BASE_URL,
        width: size.width,
        height: size.height,
        format,
        scale: 3,
      }),
    })

    if (!res.ok) throw new Error('Export gagal')
    return res.blob()
  }, [store])

  const handleExport = useCallback(async (format: 'png' | 'jpeg') => {
    setExporting(format)
    try {
      const blob = await callExportApi(format)
      downloadBlob(blob, `iqc-quote.${format}`)
      showToast('success', `Quote tersimpan: IQC-Quote.${format}`)
    } catch {
      showToast('error', 'Gagal mengekspor gambar')
    } finally {
      setExporting('idle')
    }
  }, [callExportApi, showToast])

  const handleCopy = useCallback(async () => {
    try {
      const blob = await callExportApi('png')
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast('success', 'Quote disalin ke clipboard')
    } catch {
      showToast('error', 'Gagal menyalin, coba Download')
    }
  }, [callExportApi, showToast])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(0,0,0,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      <div
        className="max-w-[95vw] max-h-[90vh] flex flex-col overflow-hidden p-0 rounded-[20px]"
        style={{
          backgroundColor: 'rgba(224,229,236,0.78)',
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          boxShadow: '0 50px 100px rgba(0,0,0,.15)',
          border: '.5px solid rgba(255,255,255,.3)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D5DCE6]/50">
          <h2 className="text-base font-bold font-display tracking-tight text-[--color-foreground]">Preview</h2>
          <button onClick={closeModal} className="p-1.5 text-[--color-muted] hover:text-[--color-foreground] transition-colors cursor-pointer rounded-[var(--radius-base)] hover:bg-[--color-surface] neumorph-sm">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 flex justify-center items-start bg-[--color-background]">
          <div data-export-root>
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
              headerColor={store.headerColor}
              chatMode={store.chatMode}
              groupName={store.groupName}
              groupAvatar={store.groupAvatar}
              memberCount={store.memberCount}
              showSenderName={store.showSenderName}
              isMuted={store.isMuted}
              isVerified={store.isVerified}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-[#D5DCE6]/50">
          <Button variant="secondary" size="sm" onClick={() => handleExport('png')} loading={exporting === 'png'}>
            <Image className="size-4" /> PNG
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleExport('jpeg')} loading={exporting === 'jpeg'}>
            <FileImage className="size-4" /> JPEG
          </Button>
          <Button variant="primary" size="sm" onClick={handleCopy}>
            <Copy className="size-4" /> Salin
          </Button>
        </div>
      </div>
    </div>
  )
}
