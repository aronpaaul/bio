const linkRe = /(https?:\/\/|www\.|t\.me|telegram\.me|@[a-z0-9_]{3,}|\b[a-z0-9-]+\.(com|ru|net|org|io|gg|me|xyz|tg|top|club|link|shop)\b)/i
const wordRe = /(meow\s*client|meowclient|discord\.gg|join\s+my|подпишись|subscribe|промокод|promo\s*code)/i

export function spamReason(name: string, message: string): string | null {
  const text = (name + ' ' + message).normalize('NFKC').toLowerCase()
  if (linkRe.test(text)) {
    return 'link'
  }
  if (wordRe.test(text)) {
    return 'blockedWord'
  }
  return null
}
