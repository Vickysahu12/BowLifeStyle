import { offers } from '../../data/content'
import { CopyCode } from '../../components/ui/CopyCode'

// Three offers in a stone band, split by hairlines. Each code copies with one tap.
export function OfferStrip() {
  return (
    <section className="pt-20 lg:pt-28" aria-label="Offers">
      <ul className="grid bg-stone sm:grid-cols-3">
        {offers.map((o, i) => (
          <li key={o.code} className={i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l' : undefined}>
            <div className="flex flex-col items-center px-6 py-10 text-center lg:py-14">
              <p className="display text-[30px] leading-tight lg:text-[36px]">{o.title}</p>
              <p className="mt-2 text-[14px] text-ink-soft">{o.body}</p>
              <CopyCode code={o.code} className="mt-5" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
