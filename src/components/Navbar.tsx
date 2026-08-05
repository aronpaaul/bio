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
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
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
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="bg-black text-white dark:bg-white dark:text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  )
}
