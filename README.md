# BowLifestyle storefront (demo)

Frontend for BowLifestyle, a men's ethnic wear label: kurtas, kurta sets, bundi sets and Indo-Western jacket sets.
Vite + React 19 + Tailwind CSS v4 + React Router 7 + motion + Lenis.
Everything works end to end in the browser: browse, filter, product page, bag, coupons, checkout, order confirmation and order history.
There is no backend yet; data lives in `src/data` and cart / wishlist / orders are saved in localStorage.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: triptych hero, categories, season grid, editorial banners, campaign film, occasions, story, "Dress the Squad", styling guide, offers, customer notes |
| `/shop`, `/shop/:category` | Listing (kurtas, kurta-sets, bundi-sets, indo-western) with filters (fabric, occasion, colour, price, sale), sort, search (`?q=`), load more. Filters live in the URL |
| `/product/:slug` | Gallery with zoom, colour siblings, sizes, add-a-pajama option on kurtas, add to bag, buy now, pincode check, details, reviews, related, recently viewed |
| `/cart` | Bag with quantity, move to wishlist, undo remove, coupons, price breakdown |
| `/checkout` | Address (validated, pincode autofill) then payment (UPI, card, net banking, COD) |
| `/order/:id` | Confirmation |
| `/wishlist`, `/account` | Saved pieces (pick size and move to bag), order history with tracking |
| `/about`, `/help` | Brand story, size guide, FAQs and contact |

Demo coupons: `BOW10` (10%), `WELCOME15` (15%, min ₹2,999), `FLAT500` (min ₹4,999).

## Structure

```
src/
  app/            Router, root layout (Lenis smooth scroll), providers
  pages/          One file per route
  sections/home/  Home page sections, in page order
  features/       cart, checkout, product, shop (filters), search, wishlist, toast
  components/     layout (header, mega nav, mobile menu, footer, logo) and ui primitives
  services/       catalog.js, orders.js, newsletter.js. Swap these for API calls when the backend exists
  data/           products.js (48 products), content.js (page copy), media.js + tones.json (image manifest)
  config/         site.js (brand, fees, coupons, footer), navigation.js (menus)
  styles/         Tailwind entry + design tokens
public/media/products/  kNN-1 (full look) and kNN-2 (close crop), 800x1200 + -sm 400x600, all 2:3
public/media/film.mp4   Campaign film
public/brand/           Logo, wordmark, name and sunburst cut from src/assets/logo.png
src/assets/image/       Original client photos (not bundled). kNN matches ImgNN.jpg
```

## Adding a product

1. Export the photo as 2:3 WebP into `public/media/products` (`kNN-1`, a closer crop as `kNN-2`, plus `-sm` versions) and add its average colour to `src/data/tones.json`.
2. Add an entry to `src/data/products.js` with `n: NN`.
3. Products with the same `family` show as colour options of each other.

## Design

See `DESIGN.md`. In short: warm-white page, true ink, one bronze from the logo; Bodoni Moda for display lines, Tenor Sans capitals for titles and labels, Albert Sans for reading; square corners; photo frames reveal from the bottom edge.
