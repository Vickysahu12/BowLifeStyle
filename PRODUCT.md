# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indian men (roughly 22 to 40) buying ethnic wear for a specific occasion: their own or a friend's wedding, haldi, sangeet, Diwali and pujas. They mostly shop on a phone, compare a few pieces, check the fit and price, and want delivery before the date. Family members often share links.

## Product Purpose

BowLifestyle is a men's ethnic wear label: kurtas, kurta sets, bundi (Nehru jacket) sets and Indo-Western jacket sets. This storefront is a client demo: a complete, working frontend (browse, filter, product, bag, coupons, checkout, orders) with no backend yet. Success is the client wanting the full project.

## Positioning

Occasion menswear with a print and embroidery point of view (botanical hems, patchwork, ombre, mirror work, brocade bundis), presented with the restraint of a designer label rather than a marketplace.

## Operating Context

Demo data lives in `src/data`; cart, wishlist, saved address and orders are stored in the browser. Prices, ratings, reviews and order tracking are sample data.

## Capabilities and Constraints

- Feature parity with the Ekatra reference store at minimum (see `D:\ekatra-ecom\FEATURE-CHECKLIST.md`).
- Categories: Kurtas, Kurta Sets, Bundi Sets, Indo-Western. Occasions: Wedding, Haldi & Mehendi, Sangeet, Festive, Everyday.
- Sizes S to 3XL. Kurtas can add a matching pajama for a fee.
- Stack: Vite, React 19, Tailwind v4, React Router 7, motion, Phosphor icons.

## Brand Commitments

- Name: BowLifestyle. Tagline: "Dress Beyond Routine".
- Logo (`src/assets/logo.png`): bronze sunburst over a wave, black high-contrast serif wordmark.
- Visual references given by the user and made binding: a clean white editorial menswear store (4-column product grid, small "up to X% off" tags, uppercase spaced titles, large editorial banners) and a three-photo hero.

## Evidence on Hand

- 49 product photos (`src/assets/image/Img*.jpg`, one shot per product) and one campaign film (`Img43.mp4`).
- No real reviews, customer names, press or store addresses exist. Everything of that kind is sample content and must stay labelled as demo where a visitor could mistake it.

## Product Principles

1. The clothes lead. Photography gets the space; interface stays quiet around it.
2. Every path ends in a working action: add, save, apply, pay, track.
3. Phone first. Thumb-reachable controls, nothing hover-only.
4. Honest demo: no invented claims beyond clearly sample data.
