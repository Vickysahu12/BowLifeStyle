import { Link } from 'react-router'
import { cn } from '../../lib/cn'

/**
 * Section title in wide capitals with an underlined "View all" beneath, as in a lookbook
 * index. `align="center"` centres both. No eyebrows: the title carries the section.
 */
export function SectionHeading({ title, sub, link, id, className, align = 'left' }) {
  const center = align === 'center'
  return (
    <div className={cn(center && 'text-center', className)}>
      <h2 id={id} className="caps text-[20px] leading-tight tracking-[0.12em] text-ink sm:text-[26px]">
        {title}
      </h2>
      {sub && <p className={cn('mt-2 max-w-[56ch] text-[15px] text-ink-soft', center && 'mx-auto')}>{sub}</p>}
      {link && (
        <Link to={link.to} className="link-under mt-3 inline-block text-[13px] text-ink">
          {link.label}
        </Link>
      )}
    </div>
  )
}

/** Page title for inner pages: capitals, a hairline under, an optional line of context. */
export function PageTitle({ title, sub, className, children }) {
  return (
    <div className={cn('border-b border-line pb-6', className)}>
      <h1 className="caps text-[24px] leading-tight tracking-[0.12em] text-ink sm:text-[30px]">{title}</h1>
      {sub && <p className="mt-2 text-[14px] text-ink-soft">{sub}</p>}
      {children}
    </div>
  )
}
