import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { lookbook } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { useReveal } from '../../hooks/useReveal'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

/**
 * "Dress the squad": one design in four colours. Tick the shades you want, pick a size for
 * each, and one button adds them all. The total updates as pieces go in and out.
 */
export function CompleteTheLook() {
  const ref = useReveal()
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const items = useMemo(() => lookbook.productIds.map(getProductSync), [])
  const [picked, setPicked] = useState(() => Object.fromEntries(lookbook.productIds.map((id) => [id, 'L'])))
  const chosen = items.filter((p) => picked[p.id])
  const total = chosen.reduce((s, p) => s + p.price, 0)

  const toggle = (id) => setPicked((prev) => ({ ...prev, [id]: prev[id] ? null : 'L' }))
  const setSize = (id, size) => setPicked((prev) => ({ ...prev, [id]: size }))

  const addAll = () => {
    chosen.forEach((p) => add(p.id, picked[p.id]))
    show({
      title: `${chosen.length} ${chosen.length === 1 ? 'piece' : 'pieces'} added to bag`,
      body: chosen.map((p) => `${p.color} ${picked[p.id]}`).join(', '),
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="look-title">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-40 lg:self-start" data-reveal>
          <h2 id="look-title" className="display text-[38px] sm:text-[48px]">
            {lookbook.title}
          </h2>
          <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">{lookbook.sub}</p>
          <div className="mt-8 border-t border-line pt-5">
            <p className="flex items-baseline justify-between text-[14px] text-ink-soft">
              {chosen.length} of {items.length} selected
              <span key={total} className="anim-fade-in text-[22px] text-ink tabular-nums">
                {formatPrice(total)}
              </span>
            </p>
            <Button onClick={addAll} disabled={chosen.length === 0} size="lg" className="mt-4 w-full">
              <Icon name="bag" size={18} />
              Add selected to bag
            </Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
          {items.map((p, i) => {
            const size = picked[p.id]
            const on = Boolean(size)
            return (
              <li key={p.id}>
                <div className={cn('relative transition-opacity duration-300', !on && 'opacity-45')} data-reveal-frame style={{ '--reveal-delay': `${i * 90}ms` }}>
                  <Link to={`/product/${p.slug}`} className="group block overflow-hidden">
                    <Img id={p.images[0]} alt={p.name} sizes="(min-width: 1024px) 18vw, 45vw" className="aspect-[2/3]" position="50% 20%" imgClassName="transition-transform duration-1000 group-hover:scale-[1.04]" />
                  </Link>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    aria-label={`Include ${p.name}`}
                    onClick={() => toggle(p.id)}
                    className={cn(
                      'press absolute top-2 left-2 grid size-7 place-items-center border transition-colors duration-200',
                      on ? 'border-ink bg-ink text-paper' : 'border-ink/40 bg-paper/90 text-transparent',
                    )}
                  >
                    <Icon name="check" size={15} weight="bold" />
                  </button>
                </div>
                <p className="caps mt-3 text-[11px] text-ink">{p.color}</p>
                <p className="text-[13px] text-ink-soft tabular-nums">{formatPrice(p.price)}</p>
                <label className={cn('mt-2 flex items-center gap-2 text-[12px] text-ink-soft', !on && 'invisible')}>
                  Size
                  <select
                    value={size ?? 'L'}
                    onChange={(e) => setSize(p.id, e.target.value)}
                    className="h-8 flex-1 border border-line-strong bg-white px-2 text-[13px] text-ink outline-none focus:border-ink"
                    tabIndex={on ? 0 : -1}
                  >
                    {SIZES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
