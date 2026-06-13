import { navItems } from '../data/navLinks'
import { NavButton } from './NavButton'
import { useTranslation } from '../i18n/useTranslation'

export function NavMenu() {
  const { t } = useTranslation()
  return (
    <nav className="navMenu">
      {navItems.map((item) => (
        <NavButton key={item.href} label={t.nav[item.key]} href={item.href} />
      ))}
    </nav>
  )
}
