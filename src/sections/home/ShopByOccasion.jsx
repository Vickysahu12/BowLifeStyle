import { useState } from 'react'
import { Link } from 'react-router'
import { occasions } from '../../data/content'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * Occasions as an accordion of tall strips on desktop: the strip under the pointer (or
 * keyboard focus) opens wide and shows its line; the rest stay narrow. Phones get a
 * swipeable row of the same frames.
 */
export function ShopByOccasion() {
  const [open, setOpen] = useState(occasions[0].id)

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="occ-title">
      <SectionHeading id="occ-title" title="Dress for the occasion" />

      {/* Desktop accordion */}
      <ul className="mt-8 hidden h-[min(640px,78svh)] gap-3 lg:flex">
        {occasions.map((o) => {
          const on = o.id === open
          return (
            <li
              key={o.id}
              className={cn('relative min-w-0 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]', on ? 'grow-[3.2]' : 'grow')}
              style={{ flexBasis: 0 }}
              onMouseEnter={() => setOpen(o.id)}
            >
              <Link to={o.to} onFocus={() => setOpen(o.id)} className="group block h-full" aria-label={`${o.label}: ${o.note}`}>
                <Img id={o.image} alt="" sizes="40vw" className="absolute! inset-0" position="50% 20%" imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" />
                <span className={cn('absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-500', on ? 'opacity-100' : 'opacity-60')} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 p-6 text-paper">
                  <span className={cn('caps block text-[11px] leading-[1.6] transition-opacity duration-300', on ? 'opacity-0' : 'opacity-100')}>{o.label}</span>
                  <span className={cn('absolute inset-x-6 bottom-6 transition-[opacity,transform] duration-500 ease-out', on ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-3 opacity-0')}>
                    <span className="display block text-[44px] leading-none whitespace-nowrap">{o.label}</span>
                    <span className="mt-3 flex items-center justify-between gap-4 text-[14px] text-paper/85">
                      {o.note}
                      <span className="caps flex items-center gap-1.5 text-[11px] text-paper">
                        Shop <Icon name="arrow" size={13} />
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Phones and tablets: swipe row */}
      <ul className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:hidden">
        {occasions.map((o) => (
          <li key={o.id} className="w-[62vw] shrink-0 snap-start sm:w-[36vw]">
            <Link to={o.to} className="press block">
              <div className="relative">
                <Img id={o.image} alt="" sizes="62vw" className="aspect-[2/3]" position="50% 20%" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
                <span className="display absolute inset-x-4 bottom-4 text-[28px] leading-none text-paper">{o.label}</span>
              </div>
              <span className="mt-2 block text-[13px] text-ink-soft">{o.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
