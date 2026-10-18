// Navigation content: mega-menu panels (desktop), menu tabs (phone) and quick chips.
// Each link carries a photo, so the menu itself shows the collection.

export const megaMenus = [
  {
    id: 'shop',
    label: 'Shop',
    to: '/shop',
    columns: [
      {
        title: 'Categories',
        items: [
          { label: 'Kurtas', desc: 'Printed, embroidered, short', image: 'k01-1', to: '/shop/kurtas' },
          { label: 'Kurta Sets', desc: 'Kurta with pajama', image: 'k04-1', to: '/shop/kurta-sets' },
          { label: 'Bundi Sets', desc: 'Nehru jacket over a set', image: 'k18-1', to: '/shop/bundi-sets' },
          { label: 'Indo-Western', desc: 'Long and open jackets', image: 'k32-1', to: '/shop/indo-western' },
        ],
      },
    ],
    feature: { image: 'k17-2', title: 'Wine threadwork, for the wedding day', to: '/product/wine-threadwork-indo-western-set' },
  },
  {
    id: 'occasions',
    label: 'Occasions',
    to: '/shop',
    columns: [
      {
        title: 'Celebrations',
        items: [
          { label: 'Wedding', desc: 'Jackets, bundis and silk', image: 'k35-1', to: '/shop?occasion=wedding' },
          { label: 'Haldi & Mehendi', desc: 'Sunny prints and ombre', image: 'k27-1', to: '/shop?occasion=haldi' },
          { label: 'Sangeet', desc: 'Made to move in', image: 'k30-1', to: '/shop?occasion=sangeet' },
        ],
      },
      {
        title: 'Every Day',
        items: [
          { label: 'Festive', desc: 'Diwali, pujas, family days', image: 'k40-1', to: '/shop?occasion=festive' },
          { label: 'Everyday', desc: 'Short kurtas and cottons', image: 'k14-1', to: '/shop?occasion=everyday' },
        ],
      },
    ],
    feature: { image: 'k44-2', title: 'Mirror work, from collar to hem', to: '/product/ivory-mirror-work-kurta-set' },
  },
]

// Plain links after the mega-menu triggers.
export const navLinks = [
  { label: 'New In', to: '/shop?sort=new' },
  { label: 'Bundi Sets', to: '/shop/bundi-sets' },
  { label: 'Our Story', to: '/about' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

// Swipeable chips under the header on phones.
export const quickChips = [
  { label: 'Kurtas', to: '/shop/kurtas' },
  { label: 'Kurta Sets', to: '/shop/kurta-sets' },
  { label: 'Bundi Sets', to: '/shop/bundi-sets' },
  { label: 'Indo-Western', to: '/shop/indo-western' },
  { label: 'Wedding', to: '/shop?occasion=wedding' },
  { label: 'Haldi', to: '/shop?occasion=haldi' },
  { label: 'New In', to: '/shop?sort=new' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]
