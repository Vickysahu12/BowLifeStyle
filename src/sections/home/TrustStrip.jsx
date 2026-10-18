import { trustPoints } from '../../data/content'
import { Icon } from '../../components/ui/Icon'

// Four promises in one quiet line under the hero.
export function TrustStrip() {
  return (
    <section aria-label="Our promises" className="shell mt-8 lg:mt-10">
      <ul className="no-scrollbar flex gap-8 overflow-x-auto border-y border-line py-4 lg:justify-between lg:gap-4">
        {trustPoints.map((t) => (
          <li key={t.title} className="flex shrink-0 items-center gap-2.5 text-[13px] text-ink">
            <Icon name={t.icon} size={20} className="text-bronze" />
            {t.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
