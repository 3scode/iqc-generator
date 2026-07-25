import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '../formStore'
import type { Template } from '../../types'

const sampleTemplate: Template = {
  id: 'test',
  name: 'Test',
  category: 'Populer',
  thumbnail: '',
  preset: {
    senderName: 'Tester',
    messages: [{ text: 'Hello', sender: 'you' }],
    quoteMessageIndex: 0,
    time: '10:00',
    battery: 50,
    signal: 3,
    bgType: 'solid',
    bgColor: '#fff',
    layout: '1:1',
  },
}

describe('formStore', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('starts with one empty message', () => {
    const s = useFormStore.getState()
    expect(s.messages).toHaveLength(1)
    expect(s.messages[0].text).toBe('')
  })

  it('adds a message', () => {
    useFormStore.getState().addMessage()
    expect(useFormStore.getState().messages).toHaveLength(2)
  })

  it('removes a message', () => {
    const id = useFormStore.getState().messages[0].id
    useFormStore.getState().removeMessage(id)
    expect(useFormStore.getState().messages).toHaveLength(0)
  })

  it('updates a message', () => {
    const id = useFormStore.getState().messages[0].id
    useFormStore.getState().updateMessage(id, { text: 'Updated' })
    expect(useFormStore.getState().messages[0].text).toBe('Updated')
  })

  it('sets and clears quote', () => {
    const id = useFormStore.getState().messages[0].id
    useFormStore.getState().setQuote(id)
    expect(useFormStore.getState().quoteMessageId).toBe(id)
    useFormStore.getState().setQuote(null)
    expect(useFormStore.getState().quoteMessageId).toBeNull()
  })

  it('sets a field', () => {
    useFormStore.getState().setField('senderName', 'Alice')
    expect(useFormStore.getState().senderName).toBe('Alice')
    useFormStore.getState().setField('battery', 99)
    expect(useFormStore.getState().battery).toBe(99)
  })

  it('applies template', () => {
    useFormStore.getState().applyTemplate(sampleTemplate)
    const s = useFormStore.getState()
    expect(s.senderName).toBe('Tester')
    expect(s.time).toBe('10:00')
    expect(s.layout).toBe('1:1')
  })

  it('resets to defaults', () => {
    useFormStore.getState().setField('senderName', 'Bob')
    useFormStore.getState().reset()
    expect(useFormStore.getState().senderName).toBe('John')
  })
})
