import { useEffect, useState } from 'react'
import { site } from '../../config/site'

const INTERVAL = 4500

// One announcement at a time, gently cycling. Pauses on hover.
export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const items = site.announcements

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <div className="bg-ink text-paper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Store announcements">
      <div className="shell flex h-9 items-center justify-between gap-4">
        <a href={`https://wa.me/${site.phone.replace(/\D/g, '')}`} className="hidden text-[12px] text-paper/70 transition-colors hover:text-paper lg:block">
          WhatsApp {site.phone}
        </a>
        <p key={index} className="caps anim-fade-up flex-1 text-center text-[10.5px] tracking-[0.2em] lg:flex-none">
          {items[index]}
        </p>
        <a href="/account" className="hidden text-[12px] text-paper/70 transition-colors hover:text-paper lg:block">
          Track your order
        </a>
      </div>
    </div>
  )
}
