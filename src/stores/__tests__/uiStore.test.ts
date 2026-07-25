import { describe, it, expect, beforeEach } from 'vitest'
import { useUiStore } from '../uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with modal closed', () => {
    expect(useUiStore.getState().modalOpen).toBe(false)
  })

  it('opens and closes modal', () => {
    useUiStore.getState().openModal()
    expect(useUiStore.getState().modalOpen).toBe(true)
    useUiStore.getState().closeModal()
    expect(useUiStore.getState().modalOpen).toBe(false)
  })

  it('shows toast', () => {
    useUiStore.getState().showToast('success', 'OK')
    expect(useUiStore.getState().toast).toEqual({ type: 'success', message: 'OK' })
  })

  it('dark mode is locked false for neumorphic theme', () => {
    expect(useUiStore.getState().darkMode).toBe(false)
    useUiStore.getState().toggleDarkMode()
    expect(useUiStore.getState().darkMode).toBe(false)
  })
})
