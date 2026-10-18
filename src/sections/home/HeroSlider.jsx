import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { heroSlides } from '../../data/content'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const DURATION = 7000
const STAGGER = [0, 140, 280] // left, centre, right

/**
 * One frame of the triptych. Every slide's photo for this position is stacked; the
 * incoming one wipes up from the bottom edge over the outgoing one, which stays put
 * underneath so the change reads as a blind lifting, never a flash of empty frame.
 */
function Frame({ pos, index, prev, className, sizes, priority }) {
  return (
    <div className={cn('relative overflow-hidden bg-stone', className)}>
      {heroSlides.map((s, i) => (
        <Img
          key={s.id}
          id={s.images[pos]}
          alt=""
          sizes={sizes}
          priority={priority && i === 0}
          position="50% 18%"
          className={cn(
            'absolute! inset-0',
            i === index ? 'anim-wipe z-10' : i === prev ? 'z-0' : 'opacity-0',
          )}
          style={{ '--delay': `${STAGGER[pos]}ms` }}
        />
      ))}
    </div>
  )
}

/**
 * Campaign triptych: three looks side by side, the centre one taller. The headline sits
 * under the left frame, the line and button under the right, so the whole set fits the
 * first screen. Autoplay pauses on hover, focus and hidden tabs; swipe on touch.
 */
export function HeroSlider() {
  const [{ index, prev }, setState] = useState({ index: 0, prev: null })
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()
  const startX = useRef(null)
  const slide = heroSlides[index]
  const count = heroSlides.length
  const go = (i) =>
    setState((s) => {
      const next = (i + count) % count
      return next === s.index ? s : { index: next, prev: s.index }
    })

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const controls = (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2" role="tablist" aria-label="Choose look">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Look ${i + 1}: ${s.title}`}
            onClick={() => go(i)}
            className="group relative grid h-6 place-items-center"
          >
            <span className={cn('relative block h-px overflow-hidden bg-ink/20 transition-[width] duration-500 ease-out', i === index ? 'w-14' : 'w-7 group-hover:bg-ink/45')}>
              {i === index && (
                <span
                  key={`${s.id}-${index}`}
                  className="hero-progress absolute inset-0 bg-ink"
                  data-paused={hovered || hidden}
                  style={{ '--duration': `${DURATION}ms`, transform: reduce ? 'scaleX(1)' : undefined }}
                  onAnimationEnd={() => go(index + 1)}
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        {[
          { d: -1, icon: 'arrow-left', label: 'Previous look' },
          { d: 1, icon: 'arrow', label: 'Next look' },
        ].map((b) => (
          <button
            key={b.d}
            type="button"
            onClick={() => go(index + b.d)}
            aria-label={b.label}
            className="press grid size-10 place-items-center border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <Icon name={b.icon} size={16} />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section
      aria-roledescription="carousel"
      aria-label="This season's looks"
      className="shell pt-3 lg:pt-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
        startX.current = null
      }}
    >
      <div
        className="grid grid-cols-1 gap-3 lg:h-[clamp(500px,calc(100svh-206px),760px)] lg:grid-cols-[1fr_1.32fr_1fr] lg:gap-4"
      >
        {/* Left: frame, then the headline */}
        <div className="hidden min-h-0 flex-col lg:flex">
          <Frame pos={0} index={index} prev={prev} sizes="25vw" className="h-[68%] shrink-0" />
          <div className="flex flex-1 items-end pb-1">
            <h1 key={slide.id} className="anim-fade-up display text-[clamp(40px,3.6vw,60px)] text-ink" aria-live="polite">
              {slide.title}
            </h1>
          </div>
        </div>

        {/* Centre: the lead look, full height */}
        <Frame pos={1} index={index} prev={prev} sizes="(min-width: 1024px) 36vw, 100vw" priority className="aspect-[4/5] lg:aspect-auto lg:h-full" />

        {/* Right: frame, then the line, button and controls */}
        <div className="hidden min-h-0 flex-col lg:flex">
          <Frame pos={2} index={index} prev={prev} sizes="25vw" className="h-[68%] shrink-0" />
          <div className="flex flex-1 flex-col justify-end gap-5 pb-1">
            <p key={slide.id} className="anim-fade-up max-w-[36ch] text-[15px] leading-relaxed text-ink-soft" style={{ '--delay': '120ms' }}>
              {slide.sub}
            </p>
            <div className="flex items-center gap-4">
              <Button to={slide.cta.to} size="lg" className="flex-1">
                {slide.cta.label}
              </Button>
            </div>
            {controls}
          </div>
        </div>

        {/* Phones: copy under the centre frame */}
        <div className="lg:hidden">
          <h1 key={slide.id} className="anim-fade-up display text-[40px] text-ink" aria-live="polite">
            {slide.title}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{slide.sub}</p>
          <Button to={slide.cta.to} size="lg" className="mt-5 w-full">
            {slide.cta.label}
          </Button>
          <div className="mt-4">{controls}</div>
        </div>
      </div>
    </section>
  )
}
