import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { collectionTabs } from '../../data/content'
import { queryProducts } from '../../services/catalog'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../features/product/ProductCard'
import { cn } from '../../lib/cn'

const viewAllFor = (q) =>
  q.occasion ? `/shop?occasion=${q.occasion.join(',')}` : q.price ? `/shop?price=${q.price.join(',')}` : q.bestseller ? '/shop?sort=rating' : '/shop?sort=new'

// The season's grid: four across, two rows, with capital tabs and a hairline that slides
// under the active one. Cards re-enter on change.
export function CuratedCollections() {
  const [tab, setTab] = useState(collectionTabs[0].id)
  const reduce = useReducedMotion()
  const active = collectionTabs.find((t) => t.id === tab)
  const products = useMemo(() => queryProducts({ ...active.query, limit: 8 }), [active])

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="curated-title">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="curated-title" className="caps text-[20px] tracking-[0.12em] sm:text-[26px]">
          Explore the season
        </h2>
        <div role="tablist" aria-label="Collections" className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          {collectionTabs.map((t) => {
            const selected = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.id)}
                className={cn('caps relative shrink-0 pb-2 text-[11px] transition-colors duration-200', selected ? 'text-ink' : 'text-ink-soft hover:text-ink')}
              >
                {t.label}
                {selected && (
                  <motion.span
                    layoutId="curated-line"
                    className="absolute inset-x-0 bottom-0 h-px bg-ink"
                    transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:grid-cols-4 lg:gap-y-14">
        {products.map((p, i) => (
          <li key={`${tab}-${p.id}`} className="anim-fade-up" style={{ '--delay': `${(i % 4) * 60 + Math.floor(i / 4) * 90}ms` }}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to={viewAllFor(active.query)} variant="outline">
          View all
        </Button>
      </div>
    </section>
  )
}
