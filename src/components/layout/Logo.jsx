import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// The client's wordmark (public/brand). `full` adds the "Dress Beyond Routine" line;
// `light` inverts it for dark grounds (the black type turns paper-white, bronze stays warm).
export function Logo({ className, full = true, light, link = true }) {
  const img = (
    <img
      src={full ? '/brand/wordmark.png' : '/brand/name.png'}
      alt={`${site.name}, ${site.tagline}`}
      width={full ? 440 : 440}
      height={full ? 105 : 88}
      className={cn('h-full w-auto', light && 'brightness-0 invert')}
      draggable={false}
    />
  )
  if (!link) return <span className={cn('block', className)}>{img}</span>
  return (
    <Link to="/" className={cn('block', className)} aria-label={`${site.name} home`}>
      {img}
    </Link>
  )
}

/** The logo's sunburst, used once per page as the brand ornament. */
export function Sun({ className, spin }) {
  return <img src="/brand/sun.png" alt="" aria-hidden="true" width={314} height={174} className={cn(spin && 'sun-slow', className)} draggable={false} />
}
