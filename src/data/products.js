// Demo catalogue built from the client's photos (public/media/products/kNN-1 / kNN-2).
// `n` is the source photo number (src/assets/image/ImgNN.jpg). Shape mirrors what a
// products API would return, so services/catalog.js can switch to fetch() later.
// Prices, ratings and copy are sample data.

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

const CATEGORY = {
  kurtas: {
    includes: 'Kurta only. Add a matching pajama below.',
    care: ['Gentle hand wash or machine wash cold, inside out', 'Dry in shade', 'Iron on medium on the reverse'],
  },
  'kurta-sets': {
    includes: 'Kurta and pajama',
    care: ['Gentle hand wash in cold water', 'Do not bleach or wring', 'Iron on medium on the reverse'],
  },
  'bundi-sets': {
    includes: 'Bundi, kurta and pajama',
    care: ['Dry clean the bundi', 'Hand wash the kurta and pajama cold', 'Steam or iron on low, never directly on embroidery'],
  },
  'indo-western': {
    includes: 'Jacket, kurta and trousers',
    care: ['Dry clean only', 'Store on a broad hanger in a garment bag', 'Steam to release creases'],
  },
}

const item = (category) => (p) => ({ category, sizes: SIZES, ...CATEGORY[category], ...p })
const kurta = item('kurtas')
const set = item('kurta-sets')
const bundi = item('bundi-sets')
const jacket = item('indo-western')

const raw = [
  kurta({ n: 1, name: 'Ivory Botanical Hem Kurta', fabric: 'Cotton Silk', color: 'Ivory', hex: '#ece6da', occasions: ['festive', 'haldi'], price: 3299, compareAt: 3999, rating: 4.6, reviews: 84, bestseller: true, blurb: 'A clean ivory kurta that blooms into a dense botanical print at the hem, with small florals scattered up the body and sleeves.' }),
  set({ n: 2, name: 'White Bloom Print Kurta Set', fabric: 'Cotton', color: 'White', hex: '#efefeb', occasions: ['haldi', 'everyday'], price: 2999, rating: 4.5, reviews: 61, isNew: true, blurb: 'Hand-painted style blooms in teal and marigold on a crisp white kurta, paired with a relaxed white pajama.' }),
  kurta({ n: 3, name: 'Ivory Butterfly Garden Kurta', fabric: 'Cotton Silk', color: 'Ivory', hex: '#e9e2d2', occasions: ['festive', 'haldi'], price: 3499, rating: 4.7, reviews: 58, blurb: 'Butterflies and blue florals on a textured ivory base, finished with a garden print border.' }),
  set({ n: 4, name: 'Gold Tiger Hem Silk Kurta Set', fabric: 'Raw Silk', color: 'Gold', hex: '#cdb27e', occasions: ['wedding', 'sangeet'], price: 6499, compareAt: 7999, rating: 4.8, reviews: 77, badge: 'Bestseller', bestseller: true, blurb: 'Antique gold raw silk with an embroidered tiger and lotus panel at the hem. Paired with a deep red pajama.' }),
  set({ n: 5, name: 'Mint Forest Watercolour Kurta Set', fabric: 'Cotton', color: 'Mint', hex: '#cfe1d3', occasions: ['haldi', 'everyday'], price: 3199, rating: 4.5, reviews: 39, isNew: true, blurb: 'A soft mint kurta that fades into a watercolour forest at the hem. Light, breathable and easy for day functions.' }),
  kurta({ n: 6, name: 'Pink Patchwork Mirror Kurta', fabric: 'Cotton Silk', color: 'Pink', hex: '#e48aa0', occasions: ['sangeet', 'haldi'], price: 3899, rating: 4.7, reviews: 66, isNew: true, badge: 'New', blurb: 'Patchwork panels in pink, teal and saffron, lifted with small mirror and sequin work.' }),
  set({ n: 7, name: 'Ivory Folk Landscape Kurta Set', fabric: 'Cotton Silk', color: 'Ivory', hex: '#e6dfd0', occasions: ['festive'], price: 4299, rating: 4.6, reviews: 42, blurb: 'An ivory kurta with a folk-art landscape running along the hem, worn with a beige pajama.' }),
  kurta({ n: 8, name: 'Rust Lotus Print Kurta', fabric: 'Linen Blend', color: 'Rust', hex: '#c97a43', occasions: ['festive', 'everyday'], price: 2799, compareAt: 3299, rating: 4.4, reviews: 53, blurb: 'Large pink lotus prints across a warm rust linen blend with a fine textured weave.' }),
  kurta({ n: 9, name: 'Ajrakh Patchwork Kurta', fabric: 'Cotton', color: 'Indigo', hex: '#3f4f73', occasions: ['festive', 'everyday'], price: 2999, rating: 4.6, reviews: 71, family: 'patchwork', blurb: 'Block printed ajrakh squares in indigo, madder red and mustard, stitched into one patchwork kurta.' }),
  set({ n: 10, name: 'Wine Patchwork Kurta Set', fabric: 'Cotton', color: 'Wine', hex: '#6e2a3e', occasions: ['festive'], price: 3499, rating: 4.5, reviews: 36, family: 'patchwork', blurb: 'Tonal wine patchwork prints on a straight kurta, paired with an off-white pajama.' }),
  kurta({ n: 11, name: 'Navy Self-Embroidered Short Kurta', fabric: 'Cotton', color: 'Navy', hex: '#1f2a4a', occasions: ['everyday', 'festive'], price: 2499, rating: 4.6, reviews: 94, bestseller: true, blurb: 'A short navy kurta with tonal buti embroidery. Wears like a shirt, looks like an occasion.' }),
  set({ n: 12, name: 'Pista Cotton Kurta Set', fabric: 'Cotton', color: 'Pista', hex: '#dcdcae', occasions: ['everyday', 'haldi'], price: 2699, rating: 4.4, reviews: 48, blurb: 'Soft pista cotton with pintucked detailing on the placket, paired with straight beige trousers.' }),
  kurta({ n: 13, name: 'Ikat Stripe Short Kurta', fabric: 'Cotton', color: 'Grey', hex: '#a7a49d', occasions: ['everyday'], price: 2299, compareAt: 2799, rating: 4.3, reviews: 57, blurb: 'Vertical ikat and zigzag stripes in indigo, red and grey. Roll the sleeves and go.' }),
  kurta({ n: 14, name: 'Indigo Block Print Short Kurta', fabric: 'Cotton', color: 'Indigo', hex: '#263a6e', occasions: ['everyday'], price: 2199, rating: 4.5, reviews: 88, bestseller: true, blurb: 'Hand block printed florals on deep indigo cotton with a mandarin collar.' }),
  bundi({ n: 15, name: 'Teal Embroidered Bundi Set', fabric: 'Linen Blend', color: 'Teal', hex: '#4d6a64', occasions: ['sangeet', 'festive'], price: 6999, rating: 4.7, reviews: 31, isNew: true, blurb: 'A teal bundi worked with pastel thread embroidery, over a sand kurta and pleated trousers.' }),
  bundi({ n: 16, name: 'Black Brocade Bundi Set', fabric: 'Brocade', color: 'Black', hex: '#1b1a19', occasions: ['wedding', 'festive'], price: 7499, compareAt: 8999, rating: 4.8, reviews: 102, bestseller: true, family: 'brocade-bundi', blurb: 'Gold-woven brocade bundi over a black kurta and pajama. The evening classic.' }),
  jacket({ n: 17, name: 'Wine Threadwork Indo-Western Set', fabric: 'Raw Silk', color: 'Wine', hex: '#5e1a2c', occasions: ['wedding', 'sangeet'], price: 14999, compareAt: 17999, rating: 4.9, reviews: 47, badge: 'Bestseller', bestseller: true, blurb: 'An open long jacket covered in tonal threadwork, over an asymmetric wine kurta and slim trousers.' }),
  bundi({ n: 18, name: 'Peach Lattice Bundi Set', fabric: 'Cotton Silk', color: 'Peach', hex: '#e3a98f', occasions: ['wedding', 'haldi'], price: 7999, rating: 4.7, reviews: 28, blurb: 'A peach bundi with a raised lattice embroidery, worn over an ivory kurta set.' }),
  jacket({ n: 19, name: 'Mocha Chikan Jacket Set', fabric: 'Cotton Silk', color: 'Brown', hex: '#6d5146', occasions: ['wedding', 'festive'], price: 11999, rating: 4.6, reviews: 22, blurb: 'Fine ivory chikankari across a mocha long jacket, with a matching kurta and white trousers.' }),
  set({ n: 20, name: 'Saffron Printed Silk Kurta Set', fabric: 'Cotton Silk', color: 'Saffron', hex: '#e1a13b', occasions: ['haldi', 'festive'], price: 4499, rating: 4.7, reviews: 63, family: 'printed-silk', blurb: 'Saffron and gold abstract florals with a soft sheen, paired with a cream pajama.' }),
  set({ n: 21, name: 'Scarlet Printed Silk Kurta Set', fabric: 'Cotton Silk', color: 'Red', hex: '#c9442c', occasions: ['festive', 'sangeet'], price: 4499, rating: 4.6, reviews: 49, family: 'printed-silk', blurb: 'The same printed silk in scarlet and coral, with a cream pajama.' }),
  set({ n: 22, name: 'Mustard Bloom Kurta Set', fabric: 'Cotton Silk', color: 'Mustard', hex: '#d7b04b', occasions: ['haldi'], price: 3799, compareAt: 4499, rating: 4.5, reviews: 34, blurb: 'Oversized mustard blooms on a pale ground, made for a haldi morning.' }),
  set({ n: 23, name: 'Olive Paisley Kurta Set', fabric: 'Cotton Silk', color: 'Olive', hex: '#7b6f38', occasions: ['festive', 'haldi'], price: 3999, rating: 4.6, reviews: 41, blurb: 'A fine paisley print on olive with a notch neck, paired with mustard pants.' }),
  jacket({ n: 24, name: 'Taupe Long Jacket Set', fabric: 'Linen Blend', color: 'Taupe', hex: '#7b6250', occasions: ['wedding', 'festive'], price: 10999, rating: 4.5, reviews: 19, blurb: 'A relaxed taupe long jacket with tonal embroidery, over a matching kurta and wide trousers.' }),
  kurta({ n: 25, name: 'Ivory Placket Embroidered Kurta', fabric: 'Cotton Silk', color: 'Ivory', hex: '#efe8da', occasions: ['festive', 'everyday'], price: 2999, rating: 4.6, reviews: 57, blurb: 'An ivory kurta with a richly embroidered placket and collar. Pairs with black or white.' }),
  set({ n: 26, name: 'Coral Mirror Ombre Kurta Set', fabric: 'Chanderi', color: 'Coral', hex: '#e4566b', occasions: ['sangeet', 'haldi'], price: 5499, compareAt: 6499, rating: 4.8, reviews: 45, isNew: true, badge: 'New', blurb: 'Coral to rani ombre chanderi covered in mirror work, with an ivory dhoti pajama.' }),
  set({ n: 27, name: 'Saffron Ombre Kurta Set', fabric: 'Chanderi', color: 'Orange', hex: '#e2762b', occasions: ['haldi', 'festive'], price: 3999, rating: 4.7, reviews: 52, family: 'ombre', blurb: 'Dip-dyed from ivory to deep saffron, with a matching ivory pajama.' }),
  set({ n: 28, name: 'Wine Ombre Kurta Set', fabric: 'Chanderi', color: 'Wine', hex: '#6b2b45', occasions: ['festive', 'sangeet'], price: 3999, rating: 4.6, reviews: 38, family: 'ombre', blurb: 'The ombre kurta in a wine fade, finished with a fine stripe texture.' }),
  set({ n: 29, name: 'Rose Ombre Kurta Set', fabric: 'Chanderi', color: 'Rose', hex: '#d89aa3', occasions: ['haldi', 'everyday'], price: 3999, rating: 4.6, reviews: 29, family: 'ombre', blurb: 'The ombre kurta in a soft rose fade over ivory, for day functions.' }),
  kurta({ n: 30, name: 'Navy Silk Kurta with Floral Sleeve', fabric: 'Raw Silk', color: 'Navy', hex: '#232c55', occasions: ['sangeet', 'festive'], price: 4999, rating: 4.7, reviews: 36, blurb: 'Navy raw silk with ivory floral embroidery climbing one shoulder and sleeve.' }),
  jacket({ n: 31, name: 'Ivory Blue Bloom Jacket Set', fabric: 'Raw Silk', color: 'Ivory', hex: '#eadfcc', occasions: ['wedding'], price: 12999, compareAt: 14999, rating: 4.9, reviews: 29, isNew: true, blurb: 'An ivory zip-front jacket with blue and rose floral embroidery, matched to a bordered kurta.' }),
  jacket({ n: 32, name: 'Ivory Botanical Long Jacket Set', fabric: 'Cotton Silk', color: 'Ivory', hex: '#e7ddd0', occasions: ['wedding', 'sangeet'], price: 13499, rating: 4.8, reviews: 24, blurb: 'Palms and birds embroidered down an ivory long jacket, over an ivory kurta set.' }),
  bundi({ n: 33, name: 'Ivory Garden Bundi with Red Kurta', fabric: 'Cotton Silk', color: 'Red', hex: '#b6202a', occasions: ['wedding', 'festive'], price: 8499, rating: 4.8, reviews: 39, bestseller: true, blurb: 'An ivory bundi with a floral garden at the hem, over a red kurta and churidar.' }),
  bundi({ n: 34, name: 'Lilac Jaal Bundi Set', fabric: 'Raw Silk', color: 'Lilac', hex: '#b8a0b8', occasions: ['sangeet', 'wedding'], price: 8999, rating: 4.6, reviews: 21, isNew: true, blurb: 'A lilac bundi with an all-over embroidered jaal, over a tonal kurta and trousers.' }),
  bundi({ n: 35, name: 'Wine Brocade Bundi Set', fabric: 'Brocade', color: 'Wine', hex: '#5a2236', occasions: ['wedding', 'festive'], price: 7499, compareAt: 8999, rating: 4.7, reviews: 58, family: 'brocade-bundi', blurb: 'The brocade bundi in wine, over a wine kurta and pajama.' }),
  jacket({ n: 36, name: 'Sage Open Jacket Set', fabric: 'Linen Blend', color: 'Sage', hex: '#9aa585', occasions: ['haldi', 'sangeet'], price: 9999, rating: 4.6, reviews: 18, isNew: true, blurb: 'A sage open jacket with tonal pintucks, layered over a kurta and ivory trousers.' }),
  jacket({ n: 37, name: 'Rust Embroidered Jacket Set', fabric: 'Cotton Silk', color: 'Rust', hex: '#c0663a', occasions: ['sangeet', 'festive'], price: 11499, rating: 4.7, reviews: 26, blurb: 'Rust jacket with all-over tonal embroidery, worn open over a matching kurta.' }),
  bundi({ n: 38, name: 'Olive Palm Bundi Set', fabric: 'Linen Blend', color: 'Olive', hex: '#5d6440', occasions: ['haldi', 'festive'], price: 6499, rating: 4.6, reviews: 33, blurb: 'Gold palm embroidery on an olive bundi, over a sand kurta and pajama.' }),
  set({ n: 39, name: 'Indigo Yoke Embroidered Kurta Set', fabric: 'Cotton', color: 'Indigo', hex: '#234383', occasions: ['festive', 'everyday'], price: 3699, rating: 4.7, reviews: 47, blurb: 'Ivory threadwork across the yoke of an indigo kurta, with a white pajama.' }),
  set({ n: 40, name: 'Brown Jaal Embroidered Kurta Set', fabric: 'Cotton Silk', color: 'Brown', hex: '#5b3b2b', occasions: ['festive'], price: 4299, compareAt: 4999, rating: 4.5, reviews: 27, blurb: 'A rich brown kurta with an all-over floral jaal, paired with wide brown trousers.' }),
  kurta({ n: 42, name: 'Sand Floral Print Kurta', fabric: 'Linen Blend', color: 'Sand', hex: '#c8ae86', occasions: ['everyday', 'haldi'], price: 2799, rating: 4.4, reviews: 31, blurb: 'Faded florals in rose and green on a sand linen blend. Easy and unfussy.' }),
  set({ n: 44, name: 'Ivory Mirror Work Kurta Set', fabric: 'Raw Silk', color: 'Ivory', hex: '#d9cdb5', occasions: ['wedding', 'sangeet'], price: 7999, compareAt: 9499, rating: 4.9, reviews: 68, badge: 'Wedding', bestseller: true, blurb: 'Ivory raw silk with hand-set mirrors from collar to hem. Made to catch every light.' }),
  kurta({ n: 45, name: 'Beige Yoke Embroidered Kurta', fabric: 'Cotton', color: 'Beige', hex: '#d6c4a8', occasions: ['festive', 'everyday'], price: 2699, rating: 4.6, reviews: 43, family: 'yoke', blurb: 'Tonal embroidery around a deep yoke on a soft beige kurta.' }),
  kurta({ n: 46, name: 'Maroon Yoke Embroidered Kurta', fabric: 'Cotton', color: 'Maroon', hex: '#6c1f2e', occasions: ['festive', 'wedding'], price: 2699, rating: 4.7, reviews: 59, family: 'yoke', bestseller: true, blurb: 'The yoke embroidered kurta in maroon with ivory and gold thread, and a border at the hem.' }),
  kurta({ n: 47, name: 'Maroon Palm Print Short Kurta', fabric: 'Cotton', color: 'Maroon', hex: '#7a2230', occasions: ['everyday', 'festive'], price: 2299, rating: 4.4, reviews: 26, blurb: 'A short maroon kurta with ivory palm and sun prints. Holiday-ready.' }),
  set({ n: 48, name: 'Black Paisley Hem Kurta Set', fabric: 'Cotton Silk', color: 'Black', hex: '#1d1c1b', occasions: ['festive', 'sangeet'], price: 3999, rating: 4.6, reviews: 54, blurb: 'A black kurta with a printed paisley and bird border at the hem, with a white pajama.' }),
  set({ n: 49, name: 'Black Folk Hem Kurta Set', fabric: 'Cotton Silk', color: 'Black', hex: '#201e1c', occasions: ['festive'], price: 4299, rating: 4.7, reviews: 38, isNew: true, family: 'folk-hem', blurb: 'Elephants, palms and dancers printed along the hem of a black kurta, with black pants.' }),
  set({ n: 50, name: 'Ivory Folk Hem Kurta Set', fabric: 'Cotton Silk', color: 'Ivory', hex: '#ece5d7', occasions: ['festive', 'haldi'], price: 4299, rating: 4.6, reviews: 35, family: 'folk-hem', blurb: 'The folk hem kurta in ivory, with a matching ivory pajama.' }),
]

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const products = raw.map(({ n, ...p }) => {
  const id = `k${String(n).padStart(2, '0')}`
  return {
    id,
    slug: slugify(p.name),
    images: [`${id}-1`, `${id}-2`],
    ...p,
  }
})

export const getProduct = (id) => products.find((p) => p.id === id)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
