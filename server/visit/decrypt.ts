import { createDecipheriv } from 'node:crypto'

export function decryptPayload(key: Buffer, ivHex: string, dataHex: string): string {
  const iv = Buffer.from(ivHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const tag = data.subarray(data.length - 16)
  const ciphertext = data.subarray(0, data.length - 16)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
}
