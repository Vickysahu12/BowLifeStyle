import { useId, useState } from 'react'
import { Link } from 'react-router'
import { site } from '../../config/site'
import { serviceRow } from '../../data/content'
import { subscribe } from '../../services/newsletter'
import { Logo, Sun } from './Logo'
import { Icon } from '../ui/Icon'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  if (state === 'done') {
    return (
      <p role="status" className="anim-fade-up flex items-center justify-center gap-2 text-[14px] text-bronze-bright">
        <Icon name="check-circle" size={18} weight="fill" /> You are on the list. The first letter is on its way.
      </p>
    )
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex border border-paper/30 transition-colors focus-within:border-paper">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[14px] text-paper outline-none placeholder:text-paper/60"
        />
        <button type="submit" disabled={state === 'sending'} className="press caps bg-paper px-5 text-[11px] text-ink transition-colors hover:bg-bronze-soft disabled:opacity-60">
          {state === 'sending' ? 'Joining' : 'Join'}
        </button>
      </div>
      <p role="alert" className="mt-2 min-h-4 text-[12px] text-[#f0b8a8]">
        {error}
      </p>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 lg:mt-32">
      <div className="border-y border-line bg-stone">
        <ul className="shell grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4">
          {serviceRow.map((s) => (
            <li key={s.title} className="flex items-center gap-3.5">
              <Icon name={s.icon} size={26} className="shrink-0 text-bronze" />
              <span>
                <span className="caps block text-[11px] text-ink">{s.title}</span>
                <span className="mt-0.5 block text-[13px] text-ink-soft">{s.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-ink text-paper">
        {/* The close: sunburst, the line, and the letter signup */}
        <div className="shell flex flex-col items-center border-b border-paper/12 py-14 text-center lg:py-20">
          <Sun className="h-14 w-auto lg:h-16" spin />
          <p className="display mt-6 text-[34px] leading-tight sm:text-[48px]">Dress beyond routine.</p>
          <p className="mt-3 max-w-[46ch] text-[14px] text-paper/70">New drops, early access to sales and styling notes for the season. One letter a fortnight.</p>
          <div className="mt-6 w-full max-w-[420px] text-left">
            <Newsletter />
          </div>
        </div>

        <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Logo light full={false} className="h-9" />
            <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-paper/70">{site.footer.blurb}</p>
            <ul className="mt-6 flex gap-2">
              {site.footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="press grid size-10 place-items-center border border-paper/25 transition-colors hover:border-bronze-bright hover:text-bronze-bright"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="caps text-[11px] text-bronze-bright">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="link-line text-[14px] text-paper/75 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="shell flex flex-col gap-4 border-t border-paper/12 py-5 text-[12px] text-paper/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {YEAR} {site.name}. Demo storefront: prices, reviews and orders are sample data.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {PAYMENTS.map((p) => (
              <li key={p} className="border border-paper/20 px-2.5 py-1 text-paper/80">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
