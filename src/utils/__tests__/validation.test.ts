import { describe, it, expect } from 'vitest'
import { validateMessage, validateSenderName, validateMaxMessages, validateImage } from '../validation'

describe('validateMessage', () => {
  it('valid for normal message', () => {
    expect(validateMessage('Hello!')).toEqual({ valid: true })
  })
  it('invalid for empty', () => {
    expect(validateMessage('')).toEqual({ valid: false, error: 'Pesan tidak boleh kosong' })
  })
  it('invalid for whitespace', () => {
    expect(validateMessage('   ')).toEqual({ valid: false, error: 'Pesan tidak boleh kosong' })
  })
  it('invalid for > 200 chars', () => {
    expect(validateMessage('a'.repeat(201))).toEqual({ valid: false, error: 'Maksimal 200 karakter' })
  })
  it('valid at exactly 200 chars', () => {
    expect(validateMessage('a'.repeat(200))).toEqual({ valid: true })
  })
})

describe('validateSenderName', () => {
  it('valid for normal name', () => {
    expect(validateSenderName('John')).toEqual({ valid: true })
  })
  it('invalid for empty', () => {
    expect(validateSenderName('')).toEqual({ valid: false, error: 'Nama tidak boleh kosong' })
  })
  it('invalid for > 20 chars', () => {
    expect(validateSenderName('a'.repeat(21))).toEqual({ valid: false, error: 'Maksimal 20 karakter' })
  })
})

describe('validateMaxMessages', () => {
  it('valid when under limit', () => {
    expect(validateMaxMessages(5)).toEqual({ valid: true })
  })
  it('invalid when at limit', () => {
    expect(validateMaxMessages(10)).toEqual({ valid: false, error: 'Maksimal 10 pesan' })
  })
  it('invalid when over limit', () => {
    expect(validateMaxMessages(15)).toEqual({ valid: false, error: 'Maksimal 10 pesan' })
  })
})

describe('validateImage', () => {
  it('valid for PNG', () => {
    expect(validateImage(new File([], 'x.png', { type: 'image/png' }))).toEqual({ valid: true })
  })
  it('invalid for unsupported type', () => {
    expect(validateImage(new File([], 'x.gif', { type: 'image/gif' }))).toEqual({ valid: false, error: 'Format harus PNG/JPG/WebP' })
  })
})
