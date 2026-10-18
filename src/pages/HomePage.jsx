import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HeroSlider } from '../sections/home/HeroSlider'
import { TrustStrip } from '../sections/home/TrustStrip'
import { ShopByCategory } from '../sections/home/ShopByCategory'
import { CuratedCollections } from '../sections/home/CuratedCollections'
import { PromoTiles } from '../sections/home/PromoTiles'
import { FilmBand } from '../sections/home/FilmBand'
import { ShopByOccasion } from '../sections/home/ShopByOccasion'
import { Story } from '../sections/home/Story'
import { CompleteTheLook } from '../sections/home/CompleteTheLook'
import { StylingGuide } from '../sections/home/StylingGuide'
import { OfferStrip } from '../sections/home/OfferStrip'
import { Testimonials } from '../sections/home/Testimonials'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <ShopByCategory />
      <CuratedCollections />
      <PromoTiles />
      <FilmBand />
      <ShopByOccasion />
      <Story />
      <CompleteTheLook />
      <StylingGuide />
      <OfferStrip />
      <Testimonials />
    </>
  )
}
