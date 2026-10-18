import { useRef, useState } from 'react'
import { imageSet } from '../../data/media'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** One photo with a hover magnifier: the full-res file at 2.2x, panned to the cursor. */
function ZoomFrame({ id, alt, priority }) {
  const [zoom, setZoom] = useState(null) // { x, y } in % while hovering
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div className="relative aspect-[2/3] cursor-zoom-in overflow-hidden bg-stone" onMouseMove={onMove} onMouseLeave={() => setZoom(null)}>
      <Img id={id} alt={alt} sizes="(min-width: 1024px) 30vw, 100vw" priority={priority} position="50% 20%" className="absolute! inset-0" />
      <div
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 bg-no-repeat transition-opacity duration-200', zoom ? 'opacity-100' : 'opacity-0')}
        style={{
          backgroundImage: `url(${imageSet(id).src})`,
          backgroundSize: '220%',
          backgroundPosition: zoom ? `${zoom.x}% ${zoom.y}%` : 'center',
        }}
      />
      {priority && (
        <span
          className={cn(
            'caps pointer-events-none absolute right-4 bottom-4 flex items-center gap-1.5 bg-paper/90 px-3 py-2 text-[10px] backdrop-blur-sm transition-opacity duration-200',
            zoom && 'opacity-0',
          )}
        >
          <Icon name="zoom" size={14} /> Hover to zoom
        </span>
      )}
    </div>
  )
}

/**
 * Product gallery.
 * Desktop: the full look and the close crop side by side, each with a hover magnifier.
 * Phones: full-width swipeable photos with a dash indicator.
 */
export function Gallery({ images, name }) {
  const [active, setActive] = useState(0)
  const railRef = useRef(null)

  return (
    <div>
      {/* Phones */}
      <div className="relative -mx-4 sm:-mx-6 lg:hidden">
        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        >
          {images.map((id, i) => (
            <Img key={id} id={id} alt={`${name}, photo ${i + 1}`} sizes="100vw" priority={i === 0} className="aspect-[2/3] w-full shrink-0 snap-start" position="50% 20%" />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
          {images.map((id, i) => (
            <span key={id} className={cn('h-[2px] bg-paper shadow transition-all duration-300', i === active ? 'w-8' : 'w-4 opacity-60')} />
          ))}
        </div>
      </div>

      {/* Desktop: both frames side by side, each with its own magnifier */}
      <ul className="hidden grid-cols-2 gap-2 lg:grid" aria-label={`${name} photos`}>
        {images.map((id, i) => (
          <li key={id}>
            <ZoomFrame id={id} alt={`${name}, photo ${i + 1}`} priority={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  )
}
