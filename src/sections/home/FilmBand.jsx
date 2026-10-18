import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { film } from '../../data/media'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'

/**
 * The campaign film, edge to edge. Plays muted and looped only while on screen (and
 * never on its own under reduced motion); pause and sound are always one tap away.
 */
export function FilmBand() {
  const video = useRef(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const el = video.current
    if (!el || reduce || userPaused) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, userPaused])

  const toggle = () => {
    const el = video.current
    if (!el) return
    if (el.paused) {
      setUserPaused(false)
      el.play().catch(() => {})
    } else {
      setUserPaused(true)
      el.pause()
    }
  }

  return (
    <section className="pt-20 lg:pt-28" aria-labelledby="film-title">
      <div className="relative isolate overflow-hidden bg-ink">
        <video
          ref={video}
          className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[21/9]"
          src={film.src}
          poster={film.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label="BowLifestyle campaign film"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" aria-hidden="true" />
        <div className="shell absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-8 text-paper sm:flex-row sm:items-end sm:justify-between lg:pb-12">
          <div>
            <h2 id="film-title" className="display max-w-[14ch] text-[38px] sm:text-[52px] lg:text-[64px]">
              Made for the baraat
            </h2>
            <Button to="/shop?occasion=wedding" variant="light" className="mt-6">
              Shop the wedding edit
            </Button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause film' : 'Play film'}
              className="press grid size-11 place-items-center border border-paper/50 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <Icon name={playing ? 'pause' : 'play'} size={18} weight="fill" />
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Turn sound on' : 'Mute'}
              className="press grid size-11 place-items-center border border-paper/50 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <Icon name={muted ? 'mute' : 'sound'} size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
