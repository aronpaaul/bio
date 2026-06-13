import type { ReactNode } from 'react'

interface SectionBoxProps {
  id: string
  title: string
  children: ReactNode
}

export function SectionBox({ id, title, children }: SectionBoxProps) {
  return (
    <section className="sectionBox" id={id}>
      <h2 className="sectionTitle">{title}</h2>
      <div className="sectionBody">{children}</div>
    </section>
  )
}
