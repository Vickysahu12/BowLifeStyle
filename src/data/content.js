// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.
// Image ids refer to public/media/products (kNN-1 full look, kNN-2 close crop).

// Each slide is a set of three looks shown side by side; the middle one leads.
export const heroSlides = [
  {
    id: 'wedding',
    images: ['k31-1', 'k44-1', 'k17-1'],
    title: 'The Wedding Edit',
    sub: 'Mirror work, threadwork and long jackets for the days that matter most.',
    cta: { label: 'Shop the edit', to: '/shop?occasion=wedding' },
  },
  {
    id: 'haldi',
    images: ['k22-1', 'k26-1', 'k36-1'],
    title: 'Haldi to Sangeet',
    sub: 'Ombre, florals and mirror work in colours that hold their own in daylight.',
    cta: { label: 'Shop the edit', to: '/shop?occasion=haldi' },
  },
  {
    id: 'bundi',
    images: ['k38-1', 'k16-1', 'k33-1'],
    title: 'Bundis for the Season',
    sub: 'Brocade, palms and garden embroidery, each over its own kurta set.',
    cta: { label: 'Shop the edit', to: '/shop/bundi-sets' },
  },
]

export const trustPoints = [
  { icon: 'cash', title: 'Cash on delivery' },
  { icon: 'truck', title: 'Free shipping above ₹2,499' },
  { icon: 'ruler', title: 'Free size exchange' },
  { icon: 'returns', title: '7-day returns' },
]

export const categoryLabels = {
  kurtas: 'Kurtas',
  'kurta-sets': 'Kurta Sets',
  'bundi-sets': 'Bundi Sets',
  'indo-western': 'Indo-Western',
}

// Singular names, used in labels like "Raw Silk Kurta Set".
export const categorySingular = {
  kurtas: 'Kurta',
  'kurta-sets': 'Kurta Set',
  'bundi-sets': 'Bundi Set',
  'indo-western': 'Indo-Western Set',
}

export const categories = [
  { id: 'kurtas', label: 'Kurtas', image: 'k01-1', to: '/shop/kurtas' },
  { id: 'kurta-sets', label: 'Kurta Sets', image: 'k04-1', to: '/shop/kurta-sets' },
  { id: 'bundi-sets', label: 'Bundi Sets', image: 'k18-1', to: '/shop/bundi-sets' },
  { id: 'indo-western', label: 'Indo-Western', image: 'k32-1', to: '/shop/indo-western' },
]

export const occasionLabels = {
  wedding: 'Wedding',
  haldi: 'Haldi & Mehendi',
  sangeet: 'Sangeet',
  festive: 'Festive',
  everyday: 'Everyday',
}

export const occasions = [
  { id: 'wedding', label: 'Wedding', note: 'Jackets, bundis and silk', image: 'k35-1', to: '/shop?occasion=wedding' },
  { id: 'haldi', label: 'Haldi & Mehendi', note: 'Sunny prints and ombre', image: 'k27-1', to: '/shop?occasion=haldi' },
  { id: 'sangeet', label: 'Sangeet', note: 'Made to move in', image: 'k30-1', to: '/shop?occasion=sangeet' },
  { id: 'festive', label: 'Festive', note: 'Diwali, pujas, family days', image: 'k40-1', to: '/shop?occasion=festive' },
  { id: 'everyday', label: 'Everyday', note: 'Short kurtas and cottons', image: 'k14-1', to: '/shop?occasion=everyday' },
]

// Tabs on the home product grid. `query` is passed to queryProducts().
export const collectionTabs = [
  { id: 'best', label: 'Bestsellers', query: { bestseller: true } },
  { id: 'new', label: 'New In', query: { sort: 'new' } },
  { id: 'wedding', label: 'Wedding', query: { occasion: ['wedding'] } },
  { id: 'value', label: 'Under ₹3,000', query: { price: ['u3000'], sort: 'rating' } },
]

// Two large editorial banners.
export const promoTiles = [
  { id: 'value', image: 'k47-1', title: 'Shop under ₹2,999', to: '/shop?price=u3000', focus: '50% 30%' },
  { id: 'printed', image: 'k20-1', title: 'The Printed Edit', to: '/shop?q=print', focus: '50% 30%' },
]

export const story = {
  image: 'k41-1',
  detail: 'k32-2',
  title: 'Made to be noticed up close',
  body: 'BowLifestyle makes occasion wear for men who want more than the usual cream kurta. Prints that start conversations, embroidery you notice up close, and cuts that still feel easy at the end of a long baraat.',
  cta: { label: 'Our Story', to: '/about' },
}

// "Dress the squad": matching pieces for the groom's friends. One button adds the ticked ones.
export const lookbook = {
  title: 'Dress the Squad',
  sub: 'One ombre kurta in four colours. Pick a shade for everyone in the baraat.',
  productIds: ['k26', 'k27', 'k28', 'k29'],
}

export const stylingGuide = [
  { id: 'haldi', title: 'Haldi morning', body: 'Light cotton, bright prints. Skip the silk.', image: 'k05-1', to: '/shop?occasion=haldi' },
  { id: 'sangeet', title: 'Sangeet night', body: 'A jacket you can dance in.', image: 'k37-1', to: '/shop?occasion=sangeet' },
  { id: 'wedding', title: 'The wedding day', body: 'Layer a bundi or long jacket.', image: 'k24-1', to: '/shop?occasion=wedding' },
  { id: 'festive', title: 'Festive at home', body: 'One good printed kurta set.', image: 'k48-1', to: '/shop?occasion=festive' },
]

export const offers = [
  { title: 'Flat ₹500 off', body: 'On orders above ₹4,999', code: 'FLAT500' },
  { title: 'Extra 10% off', body: 'Sitewide, on everything', code: 'BOW10' },
  { title: '15% off your first order', body: 'On orders above ₹2,999', code: 'WELCOME15' },
]

// Sample customer notes (demo content), each linked to the piece they bought.
export const testimonials = [
  { name: 'Arjun Mehta', city: 'Indore', productId: 'k16', text: 'Wore the black brocade bundi to my cousin’s reception. Fit was spot on in L and the brocade looked richer than the photos.' },
  { name: 'Rohan Kapoor', city: 'Delhi', productId: 'k44', text: 'The mirror work kurta set for my own sangeet. Heavy enough to feel special, still comfortable after four hours.' },
  { name: 'Siddharth Nair', city: 'Kochi', productId: 'k27', text: 'Ordered the ombre set in three colours for the groom’s side. Everyone matched without looking like a uniform.' },
  { name: 'Kabir Malhotra', city: 'Mumbai', productId: 'k11', text: 'The navy short kurta is now my default for every family dinner. Washes well and does not lose shape.' },
]

export const serviceRow = [
  { icon: 'ruler', title: 'Free size exchange', body: 'Within 7 days' },
  { icon: 'lock', title: 'Secure payments', body: 'UPI, cards, net banking' },
  { icon: 'card', title: 'No-cost EMI', body: 'On orders above ₹4,999' },
  { icon: 'chat', title: 'Styling help', body: 'WhatsApp us anytime' },
]

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Vikram S.', rating: 5, title: 'Looks better in person', text: 'Colour is exactly as shown and the fabric feels premium. Got a lot of compliments at the function.' },
  { name: 'Aditya R.', rating: 5, title: 'Great fit', text: 'Ordered my usual size and it fit well through the shoulders. Sleeves were the right length.' },
  { name: 'Karan P.', rating: 4, title: 'Good quality', text: 'Stitching is neat and the embroidery is clean. Delivery took five days.' },
  { name: 'Nikhil J.', rating: 5, title: 'Worth it', text: 'Wore it for a full day wedding. Did not crush much and stayed comfortable.' },
  { name: 'Harsh V.', rating: 4, title: 'Nice colour', text: 'Very elegant. Size guide was accurate. Would buy the bundi next.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New In' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u3000', label: 'Under ₹3,000', min: 0, max: 2999 },
  { id: '3000-5000', label: '₹3,000 to ₹5,000', min: 3000, max: 5000 },
  { id: '5000-10000', label: '₹5,000 to ₹10,000', min: 5001, max: 10000 },
  { id: 'o10000', label: 'Above ₹10,000', min: 10001, max: Infinity },
]

export const sizeChart = [
  ['S', '38', '40', '17'],
  ['M', '40', '41', '17.5'],
  ['L', '42', '42', '18'],
  ['XL', '44', '43', '18.5'],
  ['XXL', '46', '44', '19'],
  ['3XL', '48', '44', '19.5'],
]
