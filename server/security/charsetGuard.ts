const allowed = /[\p{Script=Latin}\p{Script=Cyrillic}0-9\s]|[!-/:-@[-`{-~]|[ -¿×÷]|[‐-‧‰-⁞₠-₿№]|\p{Extended_Pictographic}|[‍️⃣]|[\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}]/gu
const badBlock = /[＀-￯\u{1D400}-\u{1D7FF}\u{1FBF0}-\u{1FBF9}]/u

export function charsetBad(value: string): boolean {
  const text = value.normalize('NFC')
  if (badBlock.test(text)) {
    return true
  }
  return text.replace(allowed, '').length > 0
}
