import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

/**
 * Product tile, lookbook style: a tall 2:3 photo, a small square tag, and a centred
 * caption in capitals. On pointer devices the closer crop fades in on hover and a size
 * row slides up for one-tap add to bag. Touch devices open the product page instead.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 23vw, 50vw', priority, className }) {
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [added, setAdded] = useState(null)
  const discount = discountOf(product)
  const href = `/product/${product.slug}`
  const tag = product.badge ?? (discount > 0 ? `${discount}% off` : product.isNew ? 'New' : null)

  const quickAdd = (size) => {
    add(product.id, size)
    setAdded(size)
    setTimeout(() => setAdded(null), 1400)
    show({
      title: 'Added to bag',
      body: `${product.name}, size ${size}`,
      image: product.images[0],
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <article className={cn('group relative', className)}>
      <div className="relative overflow-hidden bg-stone">
        <Link to={href} className="block" aria-label={product.name}>
          <Img
            id={product.images[0]}
            alt={`${product.name} in ${product.color.toLowerCase()} ${product.fabric.toLowerCase()}`}
            sizes={sizes}
            priority={priority}
            className="aspect-[2/3]"
            position="50% 20%"
            imgClassName="transition-transform duration-[1400ms] ease-out hover-device:group-hover:scale-[1.03]"
          />
          <Img
            id={product.images[1]}
            alt=""
            sizes={sizes}
            className="absolute! inset-0 opacity-0 transition-opacity duration-500 hover-device:group-hover:opacity-100"
            position="50% 20%"
          />
        </Link>

        {tag && (
          <span className="caps pointer-events-none absolute top-2.5 left-2.5 border border-ink/80 bg-paper/95 px-1.5 py-[3px] text-[9px] leading-none tracking-[0.12em] text-ink">
            {tag}
          </span>
        )}

        <HeartButton product={product} className="absolute top-1.5 right-1.5" />

        {/* Pointer devices: size row slides up from the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-paper/95 backdrop-blur-sm transition-transform duration-300 ease-out hover-device:block hover-device:group-hover:translate-y-0 hover-device:group-focus-within:translate-y-0">
          <p className="caps px-3 pt-2.5 text-center text-[9.5px] text-ink-soft">{added ? `Added, size ${added}` : 'Quick add'}</p>
          <div className="grid grid-cols-6 gap-px p-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => quickAdd(s)}
                className={cn(
                  'press h-8 text-[11px] font-medium transition-colors',
                  added === s ? 'bg-ink text-paper' : 'text-ink hover:bg-ink hover:text-paper',
                )}
                aria-label={`Add ${product.name}, size ${s}, to bag`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link to={href} className="block px-1 pt-3.5 text-center">
        <h3 className="caps line-clamp-2 text-[11px] leading-[1.5] tracking-[0.12em] text-ink">{product.name}</h3>
        <p className="mt-1 text-[12px] text-ink-soft">{product.fabric}</p>
        <p className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2 text-[13px]">
          {product.compareAt && <span className="text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>}
          <span className={cn('tabular-nums', product.compareAt ? 'text-bronze' : 'text-ink')}>{formatPrice(product.price)}</span>
        </p>
      </Link>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[2/3] animate-pulse bg-stone" />
      <div className="mx-auto mt-3.5 h-2.5 w-3/4 bg-stone" />
      <div className="mx-auto mt-2 h-2.5 w-1/3 bg-stone" />
      <div className="mx-auto mt-2 h-3 w-1/2 bg-stone" />
    </div>
  )
}
