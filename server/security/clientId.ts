import { createHash } from 'node:crypto'
import { likeSecret } from '../config'

export function clientIdFromIp(ip: string): string {
  return createHash('sha256')
    .update(likeSecret + '|' + ip)
    .digest('hex')
    .slice(0, 32)
}
