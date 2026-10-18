import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

const OPEN_DELAY = 90
const CLOSE_DELAY = 160

/** True when `to` (with its query string) matches the current URL. */
export function useIsActive() {
  const { pathname, search } = useLocation()
  return (to) => {
    const [path, query] = to.split('?')
    if (query) return pathname === path && search.replace('?', '') === query
    return pathname === path && !search
  }
}

function MenuTile({ item, index, onNavigate }) {
  return (
    <li className="anim-fade-up" style={{ '--delay': `${index * 40}ms` }}>
      <Link to={item.to} onClick={onNavigate} className="group block">
        <Img id={item.image} alt="" sizes="160px" className="aspect-[2/3] bg-stone" position="50% 20%" imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="caps mt-3 block text-[11px] text-ink">{item.label}</span>
        <span className="mt-0.5 block text-[13px] text-ink-soft">{item.desc}</span>
      </Link>
    </li>
  )
}

/**
 * Desktop navigation. A hairline underline marks the hovered item; dropdown triggers open
 * one full-width panel under the header whose photo tiles slide left / right as he moves
 * between menus. Opens on hover (with intent delay), click or keyboard; closes on leave,
 * Escape, outside click or navigation.
 */
export function MegaNav() {
  const reduce = useReducedMotion()
  const isActive = useIsActive()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(null) // menu id
  const [hovered, setHovered] = useState(null) // pill target
  const [dir, setDir] = useState(0)
  const timer = useRef(null)
  const triggers = useRef({})

  const menu = megaMenus.find((m) => m.id === open)

  // Mirror of `open` so timers read the latest value.
  const openRef = useRef(null)
  useEffect(() => {
    openRef.current = open
  }, [open])

  const show = useCallback((id, delay = OPEN_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const prev = openRef.current
      const ids = megaMenus.map((m) => m.id)
      setDir(prev && prev !== id ? (ids.indexOf(id) > ids.indexOf(prev) ? 1 : -1) : 0)
      setOpen(id)
    }, delay)
  }, [])
  const hide = useCallback((delay = CLOSE_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), delay)
  }, [])
  const closeNow = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(null)
  }, [])

  // Close on navigation: reset during render when the URL changes.
  const locKey = pathname + search
  const [seenLoc, setSeenLoc] = useState(locKey)
  if (seenLoc !== locKey) {
    setSeenLoc(locKey)
    setOpen(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        triggers.current[open]?.focus()
        closeNow()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeNow])

  useEffect(() => () => clearTimeout(timer.current), [])

  const pill = (id) =>
    hovered === id && (
      <motion.span
        layoutId="nav-line"
        className="absolute inset-x-4 bottom-1 h-px bg-ink"
        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.35, bounce: 0 }}
      />
    )

  return (
    <>
      {/* Dim the page while a menu is open. Portalled so it sits under the sticky header. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-ink/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => hide(60)}
            onClick={closeNow}
          />
        )}
      </AnimatePresence>,
      document.body,
      )}

      <nav aria-label="Primary" className="relative hidden border-t border-line lg:block" onMouseLeave={() => { setHovered(null); hide() }}>
        <ul className="shell flex h-12 items-center justify-center gap-2">
          {megaMenus.map((m) => {
            const expanded = open === m.id
            return (
              <li key={m.id} onMouseEnter={() => { setHovered(m.id); show(m.id, open ? 0 : OPEN_DELAY) }}>
                <button
                  ref={(el) => (triggers.current[m.id] = el)}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls="mega-panel"
                  onClick={() => (expanded ? closeNow() : show(m.id, 0))}
                  onKeyDown={(e) => e.key === 'ArrowDown' && show(m.id, 0)}
                  className={cn(
                    'caps relative flex h-10 items-center gap-1.5 px-4 text-[12px] text-ink transition-colors duration-200',
                  )}
                >
                  {pill(m.id)}
                  {m.label}
                  <Icon name="caret-down" size={12} weight="bold" className={cn('transition-transform duration-300 ease-out', expanded && 'rotate-180')} />
                </button>
              </li>
            )
          })}
          <li aria-hidden="true" className="mx-1 h-3 w-px bg-line-strong" />
          {navLinks.map((l) => (
            <li key={l.label} onMouseEnter={() => { setHovered(l.label); if (open) hide(60) }}>
              <Link
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={cn(
                  'caps relative flex h-10 items-center gap-1.5 px-4 text-[12px] transition-colors',
                  l.accent ? 'text-bronze' : 'text-ink',
                )}
              >
                {pill(l.label)}
                {isActive(l.to) && hovered !== l.label && <span className="absolute inset-x-4 bottom-1 h-px bg-ink" aria-hidden="true" />}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shared panel: full width, flush under the nav */}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="mega-panel"
              role="region"
              aria-label={`${menu.label} menu`}
              onMouseEnter={() => clearTimeout(timer.current)}
              className="absolute inset-x-0 top-full border-y border-line bg-paper shadow-lift"
              initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={menu.id}
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -32, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                  className="shell grid grid-cols-[1fr_300px] gap-10 py-8"
                >
                  <div className="flex gap-10">
                    {menu.columns.map((col) => (
                      <div key={col.title} className="min-w-0 flex-1" style={{ flexGrow: col.items.length }}>
                        <p className="caps text-[11px] text-ink-soft">{col.title}</p>
                        <ul className="mt-4 grid gap-5" style={{ gridTemplateColumns: `repeat(${col.items.length}, minmax(0, 1fr))` }}>
                          {col.items.map((item, i) => (
                            <MenuTile key={item.label} item={item} index={i} onNavigate={closeNow} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link to={menu.feature.to} onClick={closeNow} className="group relative block min-h-[340px] overflow-hidden">
                    <Img id={menu.feature.image} alt="" sizes="300px" className="absolute! inset-0" position="50% 20%" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" aria-hidden="true" />
                    <span className="absolute inset-x-5 bottom-5 text-paper">
                      <span className="display block text-[24px] leading-tight">{menu.feature.title}</span>
                      <span className="caps mt-3 inline-flex items-center gap-1.5 text-[10px] text-paper/90">
                        Shop now <Icon name="arrow" size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
              <div className="border-t border-line">
                <div className="shell flex items-center justify-between py-3 text-[13px] text-ink-soft">
                  <span className="flex items-center gap-2">
                    <Icon name="truck" size={16} className="text-ink" /> Free shipping above ₹2,499. Cash on delivery across India.
                  </span>
                  <Link to={menu.to} onClick={closeNow} className="link-under text-[13px] text-ink">
                    View all
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
