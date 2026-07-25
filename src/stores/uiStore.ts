import { create } from 'zustand'
import type { ToastType } from '../types'

interface UiStore {
  darkMode: boolean
  modalOpen: boolean
  toast: { type: ToastType; message: string } | null

  toggleDarkMode: () => void
  setDarkMode: (v: boolean) => void
  openModal: () => void
  closeModal: () => void
  showToast: (type: ToastType, message: string) => void
  clearToast: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  darkMode: false,
  modalOpen: false,
  toast: null,

  toggleDarkMode: () => {},
  setDarkMode: () => {},

  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  showToast: (type, message) => {
    set({ toast: { type, message } })
    setTimeout(() => set({ toast: null }), 3000)
  },
  clearToast: () => set({ toast: null }),
}))
