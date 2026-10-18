import { Link } from 'react-router'
import { promoTiles } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'

// Two large editorial banners side by side, the title set in capitals across the photo.
export function PromoTiles() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-label="Featured edits">
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {promoTiles.map((t, i) => (
          <li key={t.id}>
            <Link to={t.to} className="group relative block overflow-hidden" data-reveal-frame style={{ '--reveal-delay': `${i * 120}ms` }}>
              <Img
                id={t.image}
                alt=""
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] sm:aspect-[5/6] lg:aspect-[6/5]"
                position={t.focus}
                imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-ink/25 transition-colors duration-500 group-hover:bg-ink/35" aria-hidden="true" />
              <span className="absolute inset-0 grid place-items-center p-6 text-center text-paper">
                <span>
                  <span className="caps block text-[20px] tracking-[0.18em] sm:text-[24px]">{t.title}</span>
                  <span className="caps mt-4 inline-block border-b border-paper/80 pb-1 text-[11px]">Shop now</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
