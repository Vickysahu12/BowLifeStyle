import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getProductBySlug, getRelated, getSiblings } from '../services/catalog'
import { categoryLabels, categorySingular, occasionLabels, sizeChart } from '../data/content'
import { site } from '../config/site'
import { useCart, unitPrice, PAJAMA_SUFFIX } from '../features/cart/CartContext'
import { useToast } from '../features/toast/Toast'
import { HeartButton } from '../features/wishlist/HeartButton'
import { Gallery } from '../features/product/Gallery'
import { PincodeCheck } from '../features/product/PincodeCheck'
import { ProductReviews } from '../features/product/ProductReviews'
import { ProductRail } from '../features/product/ProductRail'
import { QtyStepper } from '../features/cart/QtyStepper'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice, discountOf } from '../lib/format'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Accordion } from '../components/ui/Accordion'
import { Modal } from '../components/ui/Modal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { CopyCode } from '../components/ui/CopyCode'
import { NotFoundPage } from './NotFoundPage'
import { cn } from '../lib/cn'

function Option({ selected, onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'press border text-[14px] transition-[border-color,background-color,color] duration-150',
        selected ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink hover:border-ink',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFoundPage />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const navigate = useNavigate()
  const cart = useCart()
  const { show } = useToast()
  useDocumentTitle(product.name)

  const isKurta = product.category === 'kurtas'
  const [pajama, setPajama] = useState(false)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const [addState, setAddState] = useState('idle') // idle | adding | added
  const [chartOpen, setChartOpen] = useState(false)
  const buyRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)

  const siblings = getSiblings(product)
  const related = getRelated(product)
  const recent = useRecentlyViewed(product.id)
  const discount = discountOf(product)

  const variant = size ? `${size}${isKurta && pajama ? PAJAMA_SUFFIX : ''}` : null
  const price = unitPrice(product, isKurta && pajama ? `x${PAJAMA_SUFFIX}` : '')
  const mrp = product.compareAt ? product.compareAt + (isKurta && pajama ? site.pajamaFee : 0) : null

  // Sticky phone bar appears once the main buttons scroll out of view.
  useEffect(() => {
    const el = buyRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const needsChoice = () => {
    if (variant) return false
    setError('Please select a size.')
    buyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return true
  }

  const addToBag = async () => {
    if (needsChoice() || addState !== 'idle') return
    setAddState('adding')
    await new Promise((r) => setTimeout(r, 450))
    cart.add(product.id, variant, qty)
    setAddState('added')
    cart.setOpen(true)
    setTimeout(() => setAddState('idle'), 1800)
  }

  const buyNow = () => {
    if (needsChoice()) return
    cart.add(product.id, variant, qty)
    navigate('/checkout')
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: product.name, url })
      else {
        await navigator.clipboard.writeText(url)
        show({ title: 'Link copied', body: 'Send it to whoever is helping you decide' })
      }
    } catch {
      // share sheet dismissed
    }
  }

  return (
    <>
      <div className="shell pt-4 lg:pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: categoryLabels[product.category], to: `/shop/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="shell mt-4 grid gap-8 lg:mt-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-ink-soft">
                {product.fabric} {categorySingular[product.category]}
              </p>
              <h1 className="display mt-1.5 text-[30px] text-ink sm:text-[38px]">{product.name}</h1>
            </div>
            <button
              type="button"
              onClick={share}
              aria-label="Share"
              className="press mt-1 grid size-10 shrink-0 place-items-center border border-line-strong transition-colors hover:border-ink"
            >
              <Icon name="share" size={18} />
            </button>
          </div>

          <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-[13px]">
            <span className="flex gap-0.5 text-bronze" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={13} weight={i < Math.round(product.rating) ? 'fill' : 'light'} />
              ))}
            </span>
            <span className="link-under text-ink-soft">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </a>

          <div className="mt-5 border-y border-line py-5">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span key={price} className="anim-fade-in text-[26px] tabular-nums">
                {formatPrice(price)}
              </span>
              {mrp && (
                <>
                  <span className="text-[15px] text-ink-soft tabular-nums line-through">{formatPrice(mrp)}</span>
                  <span className="caps border border-bronze px-1.5 py-1 text-[10px] leading-none text-bronze">{discount}% off</span>
                </>
              )}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">Inclusive of all taxes. Free shipping above {formatPrice(site.freeShippingOver)}.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 bg-stone px-4 py-3 text-[13px]">
              <Icon name="tag" size={17} className="text-bronze" />
              <span>Extra 10% off with</span>
              <CopyCode code="BOW10" />
            </div>
          </div>

          {/* Same design in other colours */}
          {siblings.length > 1 && (
            <div className="mt-6">
              <p className="text-[14px]">
                Colour: <span className="font-medium">{product.color}</span>
                <span className="ml-2 text-[12px] text-ink-soft">({siblings.length} colours)</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/product/${s.slug}`}
                      replace
                      aria-label={`${s.color}${s.id === product.id ? ', selected' : ''}`}
                      aria-current={s.id === product.id}
                      className={cn(
                        'block border p-0.5 transition-colors duration-200',
                        s.id === product.id ? 'border-ink' : 'border-transparent hover:border-line-strong',
                      )}
                    >
                      <Img id={s.images[0]} alt="" sizes="56px" className="h-[84px] w-14" position="50% 20%" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div ref={buyRef} className="mt-7 scroll-mt-40">
            <fieldset>
              <div className="flex items-center justify-between">
                <legend className="text-[14px]">
                  Size{size && <span className="ml-1.5 text-ink-soft">{size}</span>}
                </legend>
                <button type="button" onClick={() => setChartOpen(true)} className="link-under flex items-center gap-1.5 text-[13px]">
                  <Icon name="ruler" size={15} /> Size guide
                </button>
              </div>
              <div className="mt-3 grid grid-cols-6 gap-1.5">
                {product.sizes.map((s) => (
                  <Option
                    key={s}
                    selected={size === s}
                    onClick={() => {
                      setSize(s)
                      setError('')
                    }}
                    className="h-12"
                  >
                    {s}
                  </Option>
                ))}
              </div>
            </fieldset>

            {isKurta && (
              <fieldset className="mt-5">
                <legend className="text-[14px]">Bottom</legend>
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <Option selected={!pajama} onClick={() => setPajama(false)} className="px-3 py-3 text-left">
                    <span className="block">Kurta only</span>
                    <span className={cn('block text-[12px]', !pajama ? 'text-paper/70' : 'text-ink-soft')}>Wear it your way</span>
                  </Option>
                  <Option selected={pajama} onClick={() => setPajama(true)} className="px-3 py-3 text-left">
                    <span className="flex items-center gap-1.5">
                      <Icon name="hanger" size={16} /> Add pajama
                    </span>
                    <span className={cn('block text-[12px]', pajama ? 'text-paper/70' : 'text-ink-soft')}>+ {formatPrice(site.pajamaFee)}, matching shade</span>
                  </Option>
                </div>
              </fieldset>
            )}

            <p role="alert" className={cn('mt-3 min-h-5 text-[13px] text-danger', error && 'anim-shake')}>
              {error}
            </p>

            <div className="mt-1 flex items-center gap-3">
              <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} min={1} max={5} label={product.name} />
              <span className="text-[12px] text-ink-soft">Ships in 24 hours</span>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={addToBag}
                className={cn(
                  'press caps relative flex h-14 flex-1 items-center justify-center gap-2.5 overflow-hidden text-[12px] transition-colors duration-300',
                  addState === 'added' ? 'bg-success text-white' : 'bg-ink text-paper hover:bg-ink-hover',
                )}
              >
                {addState === 'adding' && <span className="anim-fade-in size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden="true" />}
                {addState === 'added' && <Icon name="check" size={18} weight="bold" className="anim-pop" />}
                {addState === 'idle' && <Icon name="bag" size={18} />}
                <span aria-live="polite">{addState === 'adding' ? 'Adding' : addState === 'added' ? 'Added to bag' : 'Add to bag'}</span>
              </button>
              <HeartButton product={product} size="lg" />
            </div>
            <Button variant="outline" size="lg" onClick={buyNow} className="mt-2 w-full">
              Buy now
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-3 border-y border-line text-center text-[12px] text-ink-soft">
            {[
              ['ruler', 'Free size exchange'],
              ['returns', '7-day returns'],
              ['cash', 'Cash on delivery'],
            ].map(([icon, label], i) => (
              <li key={label} className={cn('px-2 py-4', i > 0 && 'border-l border-line')}>
                <Icon name={icon} size={22} className="mx-auto text-bronze" />
                <span className="mt-1.5 block leading-tight">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <PincodeCheck />
          </div>

          <div className="mt-4 border-t border-line">
            <Accordion title="Product details" defaultOpen>
              <p>{product.blurb}</p>
              <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-[13px]">
                <dt>Fabric</dt>
                <dd className="text-ink">{product.fabric}</dd>
                <dt>Colour</dt>
                <dd className="text-ink">{product.color}</dd>
                <dt>In the box</dt>
                <dd className="text-ink">{product.includes}</dd>
                <dt>Occasion</dt>
                <dd className="text-ink">{product.occasions.map((o) => occasionLabels[o]).join(', ')}</dd>
                <dt>Product code</dt>
                <dd className="text-ink uppercase">BL-{product.id}</dd>
              </dl>
            </Accordion>
            <Accordion title="Fit & care">
              <p>Regular fit. If you are between sizes, take the larger one for a relaxed drape.</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Shipping & exchange">
              <p>
                Dispatched within 24 hours. Delivered in 2 to 7 days across India. Free shipping above {formatPrice(site.freeShippingOver)}, otherwise{' '}
                {formatPrice(site.shippingFee)}.
              </p>
              <p className="mt-2">Free size exchange and easy returns within 7 days of delivery, as long as the tags are on.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="shell mt-20">
        <ProductReviews product={product} />
      </div>

      <ProductRail id="related-title" title="You may also like" products={related} />
      {recent.length > 0 && <ProductRail id="recent-title" title="Recently viewed" products={recent} />}

      {/* Phone sticky buy bar */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-300 ease-out lg:hidden',
          showSticky ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <Img id={product.images[0]} alt="" sizes="40px" className="h-14 w-10 shrink-0" position="50% 20%" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px]">{product.name}</p>
          <p className="text-[15px] tabular-nums">
            {formatPrice(price)} {size && <span className="text-[12px] text-ink-soft">, size {size}</span>}
          </p>
        </div>
        <Button onClick={addToBag}>{addState === 'added' ? 'Added' : 'Add to bag'}</Button>
      </div>

      <Modal open={chartOpen} onClose={() => setChartOpen(false)} title="Size guide">
        <p className="text-[14px] text-ink-soft">Garment measurements in inches. Measure a kurta you already like and match the chest.</p>
        <table className="mt-4 w-full text-left text-[14px]">
          <thead>
            <tr className="caps border-b border-line text-[10px] text-ink-soft">
              <th className="py-2 font-normal">Size</th>
              <th className="py-2 font-normal">Chest</th>
              <th className="py-2 font-normal">Length</th>
              <th className="py-2 font-normal">Shoulder</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map(([s, ...m]) => (
              <tr key={s} className={cn('border-b border-line', size === s && 'bg-stone')}>
                <td className="py-2.5 font-medium">{s}</td>
                {m.map((v, i) => (
                  <td key={i} className="py-2.5 tabular-nums">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[13px] text-ink-soft">Still unsure? WhatsApp us at {site.phone} with your height and usual shirt size.</p>
      </Modal>
    </>
  )
}
