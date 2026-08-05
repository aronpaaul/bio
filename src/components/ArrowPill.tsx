import { ArrowRightIcon } from './ArrowRightIcon'

interface ArrowPillProps {
  label: string
  href: string
  external?: boolean
  large?: boolean
  fixedLight?: boolean
}

export function ArrowPill({ label, href, external, large, fixedLight }: ArrowPillProps) {
  const textSize = large ? 'text-base md:text-lg' : 'text-base'
  const pill = fixedLight
    ? 'bg-black text-white hover:bg-gray-800'
    : 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
  const circle = fixedLight ? 'bg-white' : 'bg-white dark:bg-black'
  const arrow = fixedLight ? 'text-black' : 'text-black dark:text-white'
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex items-center gap-3 ${pill} ${textSize} font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200`}
    >
      <span>{label}</span>
      <span className={`${circle} rounded-full p-2 flex items-center justify-center`}>
        <ArrowRightIcon className={`w-5 h-5 ${arrow}`} />
      </span>
    </a>
  )
}
