import { useState } from 'react'
import { Link } from 'react-router'
import { useWishlist } from '../features/wishlist/WishlistContext'
import { useCart } from '../features/cart/CartContext'
import { useToast } from '../features/toast/Toast'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { PageTitle } from '../components/ui/SectionHeading'
import { cn } from '../lib/cn'

/** One saved piece: pick a size right on the card, then move it to the bag. */
function SavedItem({ product: p, index, onMove, onRemove }) {
  const [size, setSize] = useState(null)
  const [error, setError] = useState(false)

  const move = () => {
    if (!size) return setError(true)
    onMove(p, size)
  }

  return (
    <li className="anim-fade-up group" style={{ '--delay': `${index * 40}ms` }}>
      <div className="relative overflow-hidden bg-stone">
        <Link to={`/product/${p.slug}`}>
          <Img id={p.images[0]} alt={p.name} sizes="(min-width: 1024px) 23vw, 50vw" className="aspect-[2/3]" position="50% 20%" imgClassName="transition-transform duration-1000 group-hover:scale-[1.03]" />
        </Link>
        <button
          type="button"
          onClick={() => onRemove(p)}
          aria-label={`Remove ${p.name} from wishlist`}
          className="press absolute top-2 right-2 grid size-9 place-items-center bg-paper/90 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
      <Link to={`/product/${p.slug}`} className="mt-3 block text-center">
        <p className="caps line-clamp-2 text-[11px] leading-[1.5] tracking-[0.12em]">{p.name}</p>
        <p className="mt-1 text-[13px] tabular-nums">
          {p.compareAt && <span className="mr-2 text-ink-soft line-through">{formatPrice(p.compareAt)}</span>}
          <span className={p.compareAt ? 'text-bronze' : undefined}>{formatPrice(p.price)}</span>
        </p>
      </Link>
      <div className="mt-3 grid grid-cols-6 gap-px border border-line" role="group" aria-label={`Size for ${p.name}`}>
        {p.sizes.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={size === s}
            onClick={() => {
              setSize(s)
              setError(false)
            }}
            className={cn('h-8 text-[11px] transition-colors', size === s ? 'bg-ink text-paper' : 'hover:bg-stone')}
          >
            {s}
          </button>
        ))}
      </div>
      <p role="alert" className={cn('mt-1 min-h-4 text-[12px] text-danger', error && 'anim-shake')}>
        {error ? 'Pick a size first.' : ''}
      </p>
      <Button onClick={move} variant="outline" size="sm" className="w-full">
        Move to bag
      </Button>
    </li>
  )
}

export function WishlistPage() {
  const wishlist = useWishlist()
  const cart = useCart()
  const { show } = useToast()
  useDocumentTitle('Wishlist')

  const moveToBag = (p, size) => {
    cart.add(p.id, size)
    wishlist.remove(p.id)
    show({ title: 'Moved to bag', body: `${p.name}, size ${size}`, image: p.images[0], action: { label: 'View bag', onClick: () => cart.setOpen(true) } })
  }
  const remove = (p) => {
    wishlist.remove(p.id)
    show({ title: 'Removed from wishlist', body: p.name, image: p.images[0], action: { label: 'Undo', onClick: () => wishlist.add(p.id) } })
  }

  return (
    <div className="shell py-10 lg:py-14">
      <PageTitle title="Wishlist" sub={wishlist.count ? `${wishlist.count} saved ${wishlist.count === 1 ? 'piece' : 'pieces'}` : 'Pieces you like, kept in one place.'} />

      {wishlist.count === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Icon name="heart" size={44} className="text-bronze" />
          <p className="display mt-5 text-[30px] text-ink">Nothing saved yet</p>
          <p className="mt-2 max-w-[36ch] text-[14px] text-ink-soft">Tap the heart on any piece to keep it here while you decide.</p>
          <Button to="/shop" className="mt-7">
            Explore the collection
          </Button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 lg:grid-cols-4">
          {wishlist.items.map((p, i) => (
            <SavedItem key={p.id} product={p} index={i} onMove={moveToBag} onRemove={remove} />
          ))}
        </ul>
      )}
    </div>
  )
}
