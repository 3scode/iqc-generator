import { useEffect, useState } from 'react'
import { useFormStore } from '../stores/formStore'
import { QuoteCard } from '../components/quote/QuoteCard'
import type { ChatMessage, BgType, LayoutRatio } from '../types'

export interface ExportState {
  messages: ChatMessage[]
  senderName: string
  time: string
  battery: number
  carrier: string
  quoteMessageId: string | null
  bgType: BgType
  bgColor: string
  bgGradientEnd: string
  bgImage: string | null
  layout: LayoutRatio
  showWifi: boolean
  airplaneMode?: boolean
  showContact?: boolean
  contactAvatar?: string | null
  headerColor?: string
  chatMode?: 'personal' | 'group'
  groupName?: string
  groupAvatar?: string | null
  memberCount?: number
  showSenderName?: boolean
  isMuted?: boolean
  isVerified?: boolean
}

declare global {
  interface Window { __EXPORT_STATE__?: ExportState }
}

export function ExportPage() {
  const [ready, setReady] = useState(false)
  const store = useFormStore()

  useEffect(() => {
    let state = window.__EXPORT_STATE__
    if (!state) {
      try {
        const hash = window.location.hash.slice(1)
        if (hash) state = JSON.parse(atob(hash.replace(/-/g, '+').replace(/_/g, '/')))
      } catch {
        // ignore invalid hash state
      }
    }
    if (!state) return
    useFormStore.setState({
      messages: state.messages,
      senderName: state.senderName,
      time: state.time,
      battery: state.battery,
      carrier: state.carrier,
      quoteMessageId: state.quoteMessageId,
      bgType: state.bgType,
      bgColor: state.bgColor,
      bgGradientEnd: state.bgGradientEnd,
      bgImage: state.bgImage,
      layout: state.layout,
      showWifi: state.showWifi,
      airplaneMode: state.airplaneMode ?? false,
      showContact: state.showContact ?? true,
      contactAvatar: state.contactAvatar ?? null,
      headerColor: state.headerColor ?? '#075E54',
      chatMode: state.chatMode ?? 'personal',
      groupName: state.groupName ?? 'Grup',
      groupAvatar: state.groupAvatar ?? null,
      memberCount: state.memberCount ?? 0,
      showSenderName: state.showSenderName ?? false,
      isMuted: state.isMuted ?? false,
      isVerified: state.isVerified ?? false,
    })
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
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
      </div>
    </div>
  )
}
