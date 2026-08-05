import { ArrowPill } from './ArrowPill'
import { LogoIcon } from './LogoIcon'

const links = [
  { label: 'GitHub', value: 'github.com/aronpaaul', href: 'https://github.com/aronpaaul' },
  { label: 'Telegram', value: 't.me/skinnyboy', href: 'https://t.me/skinnyboy' },
  { label: 'Site', value: 'paul.rip', href: 'https://paul.rip' },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#F5F5F5] dark:bg-[#0e0e11] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <h2
              className="text-black dark:text-white text-5xl md:text-6xl font-medium leading-none mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base max-w-sm mb-8 leading-relaxed">
              Have a product that needs building — or hardening? I&apos;m open to interesting work.
            </p>
            <ArrowPill label="Message me on Telegram" href="https://t.me/skinnyboy" external large />
          </div>
          <ul className="w-full md:max-w-sm md:justify-self-end border-t border-black/10 dark:border-white/15">
            {links.map((link) => (
              <li key={link.label} className="flex items-center justify-between py-4 border-b border-black/10 dark:border-white/15">
                <span className="text-black/50 dark:text-white/50 text-sm">{link.label}</span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black dark:text-white text-lg hover:text-black/60 dark:hover:text-white/60 transition-colors duration-200"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-black/10 dark:border-white/15 pt-8 flex items-center justify-between text-black/50 dark:text-white/50 text-sm">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <LogoIcon className="w-5 h-5" />
            <span className="font-medium">Paul</span>
          </div>
          <span>© 2026 · paul.rip</span>
        </div>
      </div>
    </section>
  )
}
