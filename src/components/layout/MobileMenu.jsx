import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { site } from '../../config/site'
import { useOverlay } from '../../hooks/useOverlay'
import { useSearch } from '../../features/search/SearchOverlay'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { CopyCode } from '../ui/CopyCode'
import { Logo } from './Logo'
import { cn } from '../../lib/cn'

const curtain = [0.76, 0, 0.24, 1]

/**
 * Full-screen phone menu. The screen lifts in from the bottom edge like the hero frames;
 * capital tabs with a sliding hairline switch between Shop / Occasions, each showing a
 * featured look and a two-column grid of portrait tiles. Tab content slides the way you moved.
 */
export function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)
  const { openSearch } = useSearch()
  const [tab, setTab] = useState(megaMenus[0].id)
  const [dir, setDir] = useState(1)
  const index = megaMenus.findIndex((m) => m.id === tab)
  const menu = megaMenus[index]
  const items = menu.columns.flatMap((c) => c.items)

  const pick = (id) => {
    setDir(megaMenus.findIndex((m) => m.id === id) > index ? 1 : -1)
    setTab(id)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', transition: { duration: 0.4, ease: curtain } }}
          transition={{ duration: 0.6, ease: curtain }}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4 pt-[env(safe-area-inset-top)]">
            <Logo className="h-8" full={false} />
            <button
              ref={focusRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="press -mr-2 grid size-11 place-items-center text-ink"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="anim-fade-up px-4 pt-4" style={{ '--delay': '250ms' }}>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openSearch()
                }}
                className="flex h-12 w-full items-center gap-3 border border-line-strong px-4 text-left text-[14px] text-ink-soft"
              >
                <Icon name="search" size={19} className="text-ink" />
                Search kurtas, bundis, colours
              </button>
            </div>

            <div role="tablist" aria-label="Menu sections" className="anim-fade-up mt-5 flex gap-7 border-b border-line px-4" style={{ '--delay': '320ms' }}>
              {megaMenus.map((m) => {
                const on = m.id === tab
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(m.id)}
                    className={cn('caps relative pb-3 text-[13px] transition-colors duration-300', on ? 'text-ink' : 'text-ink-soft')}
                  >
                    {m.label}
                    {on && (
                      <motion.span
                        layoutId="mobile-underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-ink"
                        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={tab}
                  role="tabpanel"
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60, transition: { duration: 0.18 } }}
                  transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
                  className="px-4 pt-5"
                >
                  <Link to={menu.feature.to} onClick={onClose} className="anim-fade-up group relative block h-48 overflow-hidden" style={{ '--delay': '380ms' }}>
                    <Img id={menu.feature.image} alt="" sizes="420px" className="absolute! inset-0" position="50% 25%" />
                    <span className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" aria-hidden="true" />
                    <span className="absolute inset-y-0 left-5 flex max-w-[62%] flex-col justify-center text-paper">
                      <span className="display text-[24px] leading-[1.1]">{menu.feature.title}</span>
                      <span className="caps mt-3 inline-flex items-center gap-1.5 text-[10px]">
                        Shop now <Icon name="arrow" size={12} />
                      </span>
                    </span>
                  </Link>

                  <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5">
                    {items.map((item, i) => (
                      <li key={item.label} className="anim-fade-up" style={{ '--delay': `${420 + i * 45}ms` }}>
                        <Link to={item.to} onClick={onClose} className="press block">
                          <Img id={item.image} alt="" sizes="200px" className="aspect-[3/4] bg-stone" position="50% 18%" />
                          <span className="caps mt-2 block text-[11px] text-ink">{item.label}</span>
                          <span className="line-clamp-1 block text-[12px] text-ink-soft">{item.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={menu.to} onClick={onClose} className="link-under mt-5 inline-block text-[13px]">
                    View all
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-6 border-t border-line">
              {navLinks.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <Link to={l.to} onClick={onClose} className={cn('caps flex h-14 items-center justify-between px-4 text-[12px]', l.accent ? 'text-bronze' : 'text-ink')}>
                    {l.label}
                    <Icon name="caret-right" size={14} />
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="grid grid-cols-4 gap-2 px-4 py-6">
              {[
                { icon: 'package', label: 'Orders', to: '/account' },
                { icon: 'heart', label: 'Wishlist', to: '/wishlist' },
                { icon: 'chat', label: 'Help', to: '/help' },
                { icon: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${site.phone.replace(/\D/g, '')}` },
              ].map((a) => {
                const inner = (
                  <>
                    <span className="grid size-12 place-items-center border border-line-strong text-ink">
                      <Icon name={a.icon} size={21} />
                    </span>
                    <span className="mt-1.5 block text-[12px] text-ink-soft">{a.label}</span>
                  </>
                )
                return (
                  <li key={a.label} className="text-center">
                    {a.to ? (
                      <Link to={a.to} onClick={onClose} className="press flex flex-col items-center">
                        {inner}
                      </Link>
                    ) : (
                      <a href={a.href} className="press flex flex-col items-center">
                        {inner}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5 pb-[max(14px,env(safe-area-inset-bottom))] text-paper">
            <span className="text-[13px]">
              Extra 10% off everything
              <span className="block text-[12px] text-paper/65">Use the code at checkout</span>
            </span>
            <CopyCode code="BOW10" light />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
