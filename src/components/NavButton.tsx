interface NavButtonProps {
  label: string
  href: string
}

export function NavButton({ label, href }: NavButtonProps) {
  return (
    <a className="navButton" href={href}>
      {label}
    </a>
  )
}
