import { story } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Sun } from '../../components/layout/Logo'

// Brand note: a wide portrait with a close crop overlapping its corner, and the copy beside.
export function Story() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-32" aria-labelledby="story-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="relative pb-16 sm:pb-24 lg:pb-28">
          <div data-reveal-frame className="w-[82%]">
            <Img id={story.image} alt="Two men in embroidered kurta sets" sizes="(min-width: 1024px) 40vw, 80vw" className="aspect-[4/5]" position="50% 25%" />
          </div>
          <div data-reveal-frame style={{ '--reveal-delay': '220ms' }} className="absolute right-0 bottom-0 w-[44%] border-[6px] border-paper sm:border-8">
            <Img id={story.detail} alt="Close-up of hand embroidery on an ivory jacket" sizes="(min-width: 1024px) 20vw, 44vw" className="aspect-[3/4]" position="50% 40%" />
          </div>
        </div>
        <div data-reveal>
          <Sun className="h-10 w-auto" />
          <h2 id="story-title" className="display mt-6 text-[36px] sm:text-[48px]">
            {story.title}
          </h2>
          <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-ink-soft">{story.body}</p>
          <Button to={story.cta.to} variant="outline" className="mt-8">
            {story.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
