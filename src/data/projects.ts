import type { Language } from '../i18n/language'

export interface Project {
  name: string
  href: string
  description: Record<Language, string>
  isNew: boolean
}

export const projects: Project[] = [
  {
    name: 'WinShield',
    href: 'https://winshield.cc/',
    description: {
      ru: 'Защита от DDoS и универсальная капча для Minecraft-серверов. Ботам тут не рады. React + Rust, кровь, пот и сегфолты.',
      en: 'DDoS protection and a universal captcha for Minecraft servers. Bots not welcome. React + Rust, blood, sweat and segfaults.',
      sv: 'DDoS-skydd och en universell captcha för Minecraft-servrar. Bottar är inte välkomna. React + Rust, blod, svett och segfaults.',
    },
    isNew: true,
  },
  {
    name: 'AttackSquad',
    href: 'https://t.me/attacksquad3',
    description: {
      ru: 'Коллектив по пентесту Minecraft-серверов. Находим дыры раньше других. Шлем не выдаём.',
      en: 'A Minecraft-server pentest crew. We find the holes before anyone else. Helmets not included.',
      sv: 'Ett pentest-gäng för Minecraft-servrar. Vi hittar hålen före alla andra. Hjälm ingår ej.',
    },
    isNew: false,
  },
]
