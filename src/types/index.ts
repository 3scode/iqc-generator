export interface ChatMessage {
  id: string
  text: string
  sender: 'you' | 'other'
}

export type LayoutRatio = '9:16' | '1:1' | '4:5'
export type BgType = 'solid' | 'gradient' | 'image'
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Template {
  id: string
  name: string
  category: string
  thumbnail: string
  preset: {
    senderName: string
    messages: { text: string; sender: 'you' | 'other' }[]
    quoteMessageIndex: number
    time: string
    battery: number
    signal: number
    carrier?: string
    bgType: BgType
    bgColor: string
    bgGradientEnd?: string
    layout: LayoutRatio
    headerColor?: string
  }
}

export interface LayoutDimensions {
  width: number
  height: number
}

export const LAYOUT_MAP: Record<LayoutRatio, LayoutDimensions> = {
  '9:16': { width: 440, height: 956 },
  '1:1': { width: 440, height: 956 },
  '4:5': { width: 440, height: 956 },
}
