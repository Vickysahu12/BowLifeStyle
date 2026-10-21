import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { testimonials } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/**
 * Customer notes (sample content), one at a time: the quote large on the left, the piece
 * he bought on the right. Arrows and the name list switch between them.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()
  const t = testimonials[index]
  const product = getProductSync(t.productId)
  const go = (i) => {
    setDir(i > index ? 1 : -1)
    setIndex((i + testimonials.length) % testimonials.length)
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="notes-title">
      <h2 id="notes-title" className="caps text-[20px] tracking-[0.12em] sm:text-[26px]">
        What customers say
      </h2>
      <div className="mt-8 grid gap-8 border-y border-line py-10 lg:grid-cols-[1fr_200px] lg:items-center lg:gap-16 lg:py-12">
        <div className="flex flex-col gap-10 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.figure
              key={t.name}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <blockquote className="display max-w-[34ch] text-[26px] leading-[1.25] sm:text-[34px]">“{t.text}”</blockquote>
              <figcaption className="mt-6 text-[14px] text-ink-soft">
                <span className="text-ink">{t.name}</span>, {t.city}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <ul className="flex gap-5" aria-label="Choose a note">
              {testimonials.map((x, i) => (
                <li key={x.name}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === index}
                    className={cn('caps link-line text-[10.5px] transition-colors', i === index ? 'text-ink' : 'text-ink-soft hover:text-ink')}
                    data-active={i === index}
                  >
                    {x.name.split(' ')[0]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-1">
              {[
                [-1, 'arrow-left', 'Previous note'],
                [1, 'arrow', 'Next note'],
              ].map(([d, icon, label]) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(index + d)}
                  aria-label={label}
                  className="press grid size-10 place-items-center border border-line-strong transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Icon name={icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link to={`/product/${product.slug}`} className="group grid grid-cols-[96px_1fr] items-center gap-4 lg:block">
          <Img key={product.id} id={product.images[0]} alt="" sizes="200px" className="anim-fade-in aspect-[2/3]" position="50% 20%" />
          <span className="lg:mt-4 lg:block">
            <span className="block text-[12px] text-ink-soft">He bought</span>
            <span className="caps mt-1 block text-[11px] leading-[1.5] group-hover:text-bronze">{product.name}</span>
            <span className="mt-1 block text-[13px] tabular-nums">{formatPrice(product.price)}</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
