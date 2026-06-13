import type { ReactNode } from 'react'

interface SiteFrameProps {
  children: ReactNode
}

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="pageWrap" id="top">
      <div className="siteFrame">{children}</div>
    </div>
  )
}
