// Brand-level settings. Change the name, offers, fees or contact details here, not in components.
export const site = {
  name: 'BowLifestyle',
  tagline: 'Dress Beyond Routine',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 2499,
  shippingFee: 99,
  codFee: 49,
  pajamaFee: 799,
  orderPrefix: 'BL',
  instagram: '@bowlifestyle',
  phone: '+91 98765 43210',
  email: 'care@bowlifestyle.in',

  announcements: [
    'Free shipping on orders above ₹2,499',
    'Extra 10% off sitewide with code BOW10',
    'Free size exchange within 7 days',
  ],

  // Coupon codes accepted at bag / checkout (demo).
  coupons: {
    BOW10: { type: 'percent', value: 10, label: '10% off sitewide' },
    WELCOME15: { type: 'percent', value: 15, label: '15% off your first order', min: 2999 },
    FLAT500: { type: 'flat', value: 500, label: '₹500 off above ₹4,999', min: 4999 },
  },

  footer: {
    blurb: 'Kurtas, bundis and jacket sets for weddings, festivals and every day in between.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Kurtas', to: '/shop/kurtas' },
          { label: 'Kurta Sets', to: '/shop/kurta-sets' },
          { label: 'Bundi Sets', to: '/shop/bundi-sets' },
          { label: 'Indo-Western', to: '/shop/indo-western' },
          { label: 'Sale', to: '/shop?sale=1' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Track Order', to: '/account' },
          { label: 'Size Guide', to: '/help#sizing' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns & Exchange', to: '/help#returns' },
          { label: 'Contact Us', to: '/help#contact' },
        ],
      },
      {
        title: 'BowLifestyle',
        links: [
          { label: 'Our Story', to: '/about' },
          { label: 'How We Make It', to: '/about#craft' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy Policy', to: '/help#privacy' },
        ],
      },
    ],
  },
}
