import { useEffect } from 'react'

const key = 'paulScrollY'

export function useScrollMemory() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    let saved = 0
    try {
      saved = Number(sessionStorage.getItem(key)) || 0
    } catch {}
    if (saved > 0) {
      const restore = () => {
        const html = document.documentElement
        const prev = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        window.scrollTo(0, saved)
        html.style.scrollBehavior = prev
      }
      requestAnimationFrame(() => requestAnimationFrame(restore))
    }

    let raf = 0
    function onScroll() {
      if (raf) {
        return
      }
      raf = requestAnimationFrame(() => {
        raf = 0
        try {
          sessionStorage.setItem(key, String(Math.round(window.scrollY)))
        } catch {}
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) {
        cancelAnimationFrame(raf)
      }
    }
  }, [])
}
