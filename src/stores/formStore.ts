import { create } from 'zustand'
import type { ChatMessage, BgType, LayoutRatio, Template } from '../types'

let nextId = 1
const genId = () => `msg_${nextId++}`

const defaultMessages = [{ id: genId(), text: '', sender: 'you' as const }]

interface FormStore {
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
  showWatermark: boolean
  showWifi: boolean
  airplaneMode: boolean
  showContact: boolean
  contactAvatar: string | null
  headerColor: string
  chatMode: 'personal' | 'group'
  groupName: string
  groupAvatar: string | null
  memberCount: number
  showSenderName: boolean
  isMuted: boolean
  isVerified: boolean

  addMessage: () => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, data: Partial<ChatMessage>) => void
  setQuote: (id: string | null) => void
  setField: <K extends keyof Omit<FormStore, 'addMessage' | 'removeMessage' | 'updateMessage' | 'setQuote' | 'setField' | 'applyTemplate' | 'reset'>>(key: K, value: FormStore[K]) => void
  applyTemplate: (template: Template) => void
  reset: () => void
}

const defaultState = {
  messages: defaultMessages,
  senderName: 'John',
  time: '09:41',
  battery: 80,
  carrier: 'Axis',
  quoteMessageId: defaultMessages[0].id,
  bgType: 'solid' as BgType,
  bgColor: '#1C1C1E',
  bgGradientEnd: '#E8E8ED',
  bgImage: null as string | null,
  layout: '9:16' as LayoutRatio,
  showWatermark: false,
  showWifi: true,
  airplaneMode: false,
  showContact: true,
  contactAvatar: null as string | null,
  headerColor: '#075E54',
  chatMode: 'personal' as 'personal' | 'group',
  groupName: 'Grup Santuy',
  groupAvatar: null as string | null,
  memberCount: 8,
  showSenderName: true,
  isMuted: false,
  isVerified: false,
}

export const useFormStore = create<FormStore>((set) => ({
  ...defaultState,

  addMessage: () => set((s) => ({
    messages: [...s.messages, { id: genId(), text: '', sender: 'you' }],
  })),

  removeMessage: (id) => set((s) => ({
    messages: s.messages.filter((m) => m.id !== id),
    quoteMessageId: s.quoteMessageId === id ? null : s.quoteMessageId,
  })),

  updateMessage: (id, data) => set((s) => ({
    messages: s.messages.map((m) => (m.id === id ? { ...m, ...data } : m)),
  })),

  setQuote: (id) => set({ quoteMessageId: id }),

  setField: (key, value) => {
    // Mutual exclusivity: showContact and group mode can't both be active
    if (key === 'showContact' && value === true) {
      set({ showContact: true, chatMode: 'personal' } as Partial<FormStore>)
    } else if (key === 'chatMode' && value === 'group') {
      set({ chatMode: 'group', showContact: false } as Partial<FormStore>)
    } else {
      set({ [key]: value } as Partial<FormStore>)
    }
  },

  applyTemplate: (template) => {
    set({
      senderName: template.preset.senderName,
      time: template.preset.time,
      battery: template.preset.battery,
      carrier: template.preset.carrier ?? 'Axis',
      bgType: template.preset.bgType,
      bgColor: template.preset.bgColor,
      bgGradientEnd: template.preset.bgGradientEnd ?? '#E8E8ED',
      layout: template.preset.layout,
      bgImage: null,
      showWatermark: false,
      showWifi: true,
      airplaneMode: false,
      showContact: true,
      chatMode: 'personal',
      headerColor: template.preset.headerColor ?? '#075E54',
    })
  },

  reset: () => { const id = genId(); set({ ...defaultState, messages: [{ id, text: '', sender: 'you' }], quoteMessageId: id }) },
}))
