import type { ReactNode } from 'react'

interface BlinkProps {
  children: ReactNode
}

export function Blink({ children }: BlinkProps) {
  return <span className="blink">{children}</span>
}
