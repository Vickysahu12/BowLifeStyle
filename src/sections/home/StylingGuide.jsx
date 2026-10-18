import { Link } from 'react-router'
import { stylingGuide } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'

// How to wear it: four looks on a stepped line (every other one sits lower), each with a
// one-line rule of thumb. Swipes on phones.
export function StylingGuide() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="style-title">
      <SectionHeading id="style-title" title="How to wear it" sub="A short guide to dressing for each function, from the first haldi to the last dance." />
      <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
        {stylingGuide.map((g, i) => (
          <li key={g.id} className={cn('w-[70vw] shrink-0 snap-start sm:w-[40vw] lg:w-auto', i % 2 === 1 && 'lg:mt-16')}>
            <Link to={g.to} className="group block">
              <div className="overflow-hidden" data-reveal-frame style={{ '--reveal-delay': `${i * 100}ms` }}>
                <Img id={g.image} alt="" sizes="(min-width: 1024px) 23vw, 70vw" className="aspect-[3/4]" position="50% 20%" imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
              </div>
              <h3 className="display mt-4 text-[26px] leading-tight">{g.title}</h3>
              <p className="mt-1 text-[14px] text-ink-soft">{g.body}</p>
              <span className="link-under mt-3 inline-block text-[13px]">Shop the look</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
