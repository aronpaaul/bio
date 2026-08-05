import { useEffect, useState } from 'react'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'GitHub', href: 'https://github.com/aronpaaul' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <LogoIcon className="w-7 h-7 text-black dark:text-white" />
          <span className="text-2xl font-medium tracking-tight text-black dark:text-white">Paul</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-block bg-black text-white dark:bg-white dark:text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Get in touch
          </a>
          <button
            className="md:hidden w-11 h-11 rounded-full border border-black/15 dark:border-white/25 flex flex-col items-center justify-center gap-[5px] text-black dark:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-current transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[2px] bg-current transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-[88rem] mx-auto mt-3 rounded-2xl border border-black/10 dark:border-white/15 bg-[#F5F5F5]/95 dark:bg-[#161616]/95 backdrop-blur-md p-3 flex flex-col shadow-xl">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-lg font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center bg-black text-white dark:bg-white dark:text-black text-base font-medium px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      )}
    </nav>
  )
}
