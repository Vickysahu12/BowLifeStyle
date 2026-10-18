import { Link } from 'react-router'
import { categories } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Button } from '../components/ui/Button'
import { Sun } from '../components/layout/Logo'
import { Icon } from '../components/ui/Icon'

const CRAFT = [
  { title: 'Print', body: 'Botanical hems, patchwork and folk scenes, placed so the pattern sits where it flatters: at the hem, the cuff, the yoke.', image: 'k03-2' },
  { title: 'Embroidery', body: 'Threadwork, chikankari and hand-set mirrors on jackets and kurtas made for the wedding week.', image: 'k44-2' },
  { title: 'Cut', body: 'Regular fits with room through the shoulder and a length that works with a pajama or trousers.', image: 'k16-2' },
]

export function AboutPage() {
  useDocumentTitle('Our Story')
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="shell grid items-end gap-10 pt-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pt-12">
        <div className="lg:pb-10">
          <Sun className="h-10 w-auto" />
          <h1 className="display mt-6 text-[44px] text-ink sm:text-[64px]">Dress beyond routine</h1>
          <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-ink-soft">
            BowLifestyle started with a simple complaint: men’s occasion wear was either plain or loud, rarely considered. We make kurtas, bundis and jacket sets
            with a point of view, prints you will be asked about and embroidery that rewards a closer look, cut to feel easy from the haldi to the last dance.
          </p>
          <Button to="/shop" className="mt-8">
            Shop the collection
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Img id="k41-1" alt="Two men in embroidered kurta sets" sizes="(min-width: 1024px) 26vw, 50vw" className="aspect-[2/3]" position="50% 25%" />
          <Img id="k30-1" alt="Navy silk kurta with floral embroidery" sizes="(min-width: 1024px) 26vw, 50vw" className="mt-12 aspect-[2/3]" position="50% 20%" />
        </div>
      </section>

      <section id="craft" className="shell scroll-mt-40 pt-24 lg:pt-32">
        <h2 className="caps text-[20px] tracking-[0.12em] sm:text-[26px]">How we make it</h2>
        <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6">
          {CRAFT.map((c, i) => (
            <li key={c.title}>
              <div className="overflow-hidden" data-reveal-frame style={{ '--reveal-delay': `${i * 100}ms` }}>
                <Img id={c.image} alt="" sizes="(min-width: 768px) 32vw, 100vw" className="aspect-[4/5]" position="50% 40%" />
              </div>
              <h3 className="display mt-5 text-[30px]">{c.title}</h3>
              <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-24 lg:pt-32">
        <div className="bg-ink px-6 py-12 text-paper sm:px-12 lg:py-16">
          <h2 className="display max-w-[20ch] text-[34px] sm:text-[44px]">Four ways in. Find your fit.</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={c.to} className="caps flex items-center justify-between border-b border-paper/25 py-3 text-[12px] transition-colors hover:border-paper">
                  {c.label}
                  <Icon name="arrow" size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
