import { Link } from 'react-router'
import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-ink text-paper hover:bg-ink-hover',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'border border-line-strong text-ink hover:border-ink',
  light: 'bg-paper text-ink hover:bg-white',
  'outline-light': 'border border-paper/80 text-paper hover:bg-paper hover:text-ink',
}

const sizes = {
  sm: 'h-10 px-5 text-[11px]',
  md: 'h-12 px-8 text-[12px]',
  lg: 'h-14 px-10 text-[12px]',
}

/**
 * Square button with a wide-tracked capital label. Renders a router <Link> when given `to`,
 * an <a> for `href`, otherwise a <button>.
 */
export function Button({ to, href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cn(
    'press caps inline-flex items-center justify-center gap-2.5 whitespace-nowrap',
    'transition-[background-color,border-color,color,transform,opacity] duration-200 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button type="button" className={classes} {...props}>{children}</button>
}
