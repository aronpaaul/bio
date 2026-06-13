function isControl(char: string): boolean {
  const code = char.charCodeAt(0)
  return code < 32 || code === 127
}

export function cleanText(value: string): string {
  const safe = Array.from(value)
    .map((char) => (isControl(char) ? ' ' : char))
    .join('')
  return safe.replace(/\s+/g, ' ').trim()
}
