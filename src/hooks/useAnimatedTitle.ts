import { useEffect } from 'react'

export function useAnimatedTitle(text: string): void {
  useEffect(() => {
    const banner = `★ ${text} ★   `
    let offset = 0
    const timer = window.setInterval(() => {
      offset = (offset + 1) % banner.length
      document.title = banner.slice(offset) + banner.slice(0, offset)
    }, 280)
    return () => window.clearInterval(timer)
  }, [text])
}
