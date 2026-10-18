import { Link } from 'react-router'
import { categories } from '../../data/content'
import { products } from '../../data/products'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { SectionHeading } from '../../components/ui/SectionHeading'

const counts = Object.fromEntries(categories.map((c) => [c.id, products.filter((p) => p.category === c.id).length]))

// Four tall frames, one per category, captioned underneath like a lookbook index.
export function ShopByCategory() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="cat-title">
      <SectionHeading id="cat-title" title="Shop by category" />
      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
        {categories.map((c, i) => (
          <li key={c.id}>
            <Link to={c.to} className="group block">
              <div className="overflow-hidden" data-reveal-frame style={{ '--reveal-delay': `${i * 90}ms` }}>
                <Img
                  id={c.image}
                  alt=""
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  className="aspect-[2/3]"
                  position="50% 20%"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                <span className="caps text-[12px] text-ink sm:text-[13px]">{c.label}</span>
                <span className="text-[12px] text-ink-soft tabular-nums">{counts[c.id]} styles</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
