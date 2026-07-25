const linkRe = /(https?:\/\/|ftp:\/\/|www\.|t\.me|telegram\.(me|org)|vk\.(com|cc)|discord\.?(gg|com)|\b[a-z0-9-]{2,}\.(com|ru|net|org|io|gg|me|xyz|tg|top|club|link|shop|onion|biz|info|site|online|cc|tv|app|dev|фун|рф)\b)/i
const brandRe = /(meow\s*client|meowclient|мяу\s*кл[иi]ент|мяукл[иi]ент|кошка\s*кл[иi]ент|кошкакл[иi]ент|киска\s*кл[иi]ент)/i
const adultRe = /(\bporn|порно|hentai|хентай|onlyfans|xvideos|xnxx|brazzers|\bnudes?\b|\bnsfw\b|проститу|шлюх.{0,3}снять|эскорт|\bescort\b|intim|секс.?услуг|детск\w*\s*порн|\bцп\b)/i
const drugRe = /(cocaine|кокаин|героин|heroin|\bmeth\b|метамфетамин|амфетамин|\bmdma\b|\bмдма\b|\blsd\b|\bлсд\b|мефедрон|mephedrone|гашиш|марихуан|\bweed\b|наркотик|закладк|\bмёд\b.{0,6}\bшишк|телеграм.{0,12}магаз)/i
const extremRe = /(терроризм|террорист|теракт|\bисил\b|\bигил\b|\bisis\b|\bнацизм\b|\bnazi\b|heil\s*hitler|экстремизм|джихад|скулшут|разжига\w*\s*ненавист|массов\w*\s*убийств)/i
const promoRe = /(подпишись|подписывайся|subscribe|промокод|promo\s*code|join\s+my|заходи\s+на\s+канал|\bcasino\b|казино|букмекер|беспл\w*\s*(деньг|бонус)|заработок\s+в\s+интернет)/i

function haystacks(name: string, message: string): string[] {
  const norm = (name + ' ' + message).normalize('NFKC').toLowerCase()
  const deDot = norm.replace(/\(?\s*(?:dot|точка|тчк|d0t)\s*\)?/g, '.').replace(/\[\s*\.?\s*\]|\(\s*\.?\s*\)/g, '.')
  return [norm, norm.replace(/\s+/g, ''), deDot.replace(/\s+/g, '')]
}

export function spamReason(name: string, message: string): string | null {
  const hay = haystacks(name, message)
  if (hay.some((h) => linkRe.test(h))) return 'link'
  if (hay.some((h) => brandRe.test(h))) return 'brand'
  if (hay.some((h) => adultRe.test(h))) return 'adult'
  if (hay.some((h) => drugRe.test(h))) return 'drug'
  if (hay.some((h) => extremRe.test(h))) return 'extrem'
  if (hay.some((h) => promoRe.test(h))) return 'promo'
  return null
}
