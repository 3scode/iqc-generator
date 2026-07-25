const MAX_MESSAGES = 10
const MAX_CHARS = 200
const MAX_NAME_CHARS = 20
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export function validateMessage(text: string): { valid: boolean; error?: string } {
  if (!text.trim()) return { valid: false, error: 'Pesan tidak boleh kosong' }
  if (text.length > MAX_CHARS) return { valid: false, error: `Maksimal ${MAX_CHARS} karakter` }
  return { valid: true }
}

export function validateSenderName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) return { valid: false, error: 'Nama tidak boleh kosong' }
  if (name.length > MAX_NAME_CHARS) return { valid: false, error: `Maksimal ${MAX_NAME_CHARS} karakter` }
  return { valid: true }
}

export function validateMaxMessages(count: number): { valid: boolean; error?: string } {
  if (count >= MAX_MESSAGES) return { valid: false, error: `Maksimal ${MAX_MESSAGES} pesan` }
  return { valid: true }
}

export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return { valid: false, error: 'Format harus PNG/JPG/WebP' }
  if (file.size > MAX_IMAGE_SIZE) return { valid: false, error: 'Maksimal 5MB' }
  return { valid: true }
}
