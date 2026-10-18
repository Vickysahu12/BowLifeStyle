---
name: BowLifestyle
description: Men's occasion wear storefront, styled as a lookbook that sells.
colors:
  warm-paper: "#fcfbf9"
  stone-band: "#f1efeb"
  stone-deep: "#e6e2db"
  true-ink: "#151413"
  ink-hover: "#3a3531"
  ink-soft: "#5f5a54"
  burnished-bronze: "#9b6428"
  bronze-bright: "#c08a4a"
  bronze-soft: "#efe3d2"
  success: "#2f6b4a"
  danger: "#b42318"
typography:
  display:
    fontFamily: "Bodoni Moda"
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  caps:
    fontFamily: "Tenor Sans"
    fontWeight: 400
    letterSpacing: "0.16em"
  body:
    fontFamily: "Albert Sans"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  round: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  section: "112px"
  container: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.true-ink}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.true-ink}"
    rounded: "{rounded.none}"
  product-tag:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.true-ink}"
    rounded: "{rounded.none}"
---

# Design System: BowLifestyle

## Overview

**Creative North Star: "The Lookbook That Sells"**

Every page reads like a designer-label lookbook first and a shop second. Photography in tall 2:3 frames carries all of the colour and most of the emotion; the interface is a thin black and bronze frame around it. Type does the structuring: wide-tracked capitals name things, a high-contrast Bodoni speaks the few lines that should be remembered, and a plain sans carries everything you read.

Density is moderate: product grids are four across on desktop and two on phones, with generous air between rows and sections. Motion is one idea used consistently: frames uncover from the bottom edge up, like a blind lifting.

The system deliberately refuses the marketplace look: no rounded cards, no colour-coded badges, no pills, no busy banners.

**Key Characteristics:**
- Warm-white ground, true off-black ink, one burnished bronze from the logo.
- Square corners everywhere; only genuinely round things (count dots, radios, swatches, spinners) are round.
- Tenor Sans capitals for titles, nav, buttons and tags; Bodoni Moda for large display lines only.
- 2:3 portrait photography, captions centred under the frame.
- The logo's sunburst is the single ornament, used once per surface.

## Colors

A restrained palette: neutrals tinted warm, one ink, one metal.

### Primary
- **True Ink** (#151413): text, primary buttons, active tabs and chips, the announcement bar, the footer.

### Secondary
- **Burnished Bronze** (#9b6428): sale prices, discount tags, rating stars, icons in trust rows, focus rings, wishlist fill. Sampled from the logo's sunburst.
- **Bronze Bright** (#c08a4a): bronze on dark grounds (footer headings, toast check).

### Neutral
- **Warm Paper** (#fcfbf9): page background.
- **Stone Band** (#f1efeb): service rows, offer band, image placeholders, coupon strip.
- **Stone Deep** (#e6e2db): progress tracks, scrollbar thumb.
- **Ink Soft** (#5f5a54): secondary text, captions, helper copy.
- **Line** (ink at 10% / 24%): hairlines and input borders.

### Named Rules
**The One Metal Rule.** Bronze marks value and state (sale, rating, focus, saved), never decoration. Large fields of colour come only from photography and the ink footer.

## Typography

**Display Font:** Bodoni Moda (fallback Didot, Georgia)
**Label Font:** Tenor Sans (fallback Gill Sans)
**Body Font:** Albert Sans (fallback system sans)

**Character:** Bodoni echoes the logo's hairline serifs; Tenor's wide capitals give the calm of a fashion index; Albert Sans stays out of the way.

### Hierarchy
- **Display** (450, 40 to 64px, 1.05): hero titles, film band, story, squad, 404, thank-you.
- **Section title** (Tenor caps, 20 to 26px, 0.12em): every section and page title. No eyebrow above it.
- **Product name** (Tenor caps, 11px, 0.12em, 1.5 line-height): card captions, cart lines.
- **Body** (Albert Sans 400, 15 to 16px, 1.6, max 50ch in prose).
- **Label** (Tenor caps, 10 to 12px, 0.16em): buttons, nav, tags, tabs.

### Named Rules
**The No Fake Bold Rule.** Tenor Sans has one weight. Never set it bold; emphasis comes from size and colour.

## Layout

Container max 1440px with 16 / 24 / 40px gutters. Sections are separated by 80px on phones and 112px on desktop. Home sections each use a different layout family: triptych hero, 4-up category frames, tabbed 4-column grid, 2-up banners, full-bleed film, occasion accordion, overlapping story pair, sticky-copy squad picker, stepped styling row, 3-column offer band, single-quote testimonial.

## Elevation & Depth

Flat by default. Depth comes from photography and the ink footer. Shadows appear only on floating layers.

### Shadow Vocabulary
- **Float** (`0 12px 32px -16px rgb(21 20 19 / 0.28)`): small floating controls.
- **Lift** (`0 28px 64px -28px rgb(21 20 19 / 0.4)`): drawers, mega menu panel, search, modals, toasts.

## Shapes

Zero radius on every container, button, input, tag, chip and image. Hairline (1px) borders, never thicker. Image frames reveal with an inset clip-path from the bottom edge.

## Components

### Buttons
- **Shape:** square (0px), heights 40 / 48 / 56px.
- **Primary:** ink fill, paper text, Tenor caps 11 to 12px.
- **Outline:** 1px ink border, fills ink on hover.
- **Press:** scale 0.97 on active, 160ms ease-out.

### Product card
- 2:3 photo on stone placeholder; close crop fades in on hover (pointer devices only).
- Square paper tag top-left (badge, % off or New), heart top-right.
- Quick-add size row slides up from the bottom edge on hover.
- Centred caption: caps name, fabric, MRP struck through then price in bronze when on sale.

### Inputs / Fields
- White fill, 1px line-strong border, square. Focus: ink border plus inset 1px ink. Error: danger border with shake.

### Navigation
- Centred logo row with search left and icons right; Tenor caps nav row beneath with a sliding 1px underline.
- Mega menu: full-width panel flush under the nav with 2:3 photo tiles and one feature image.
- Phones: square category chips under the header, full-screen menu that lifts in from the bottom.

### Hero triptych (signature)
Three looks side by side, the centre one taller. Each slide change wipes the three frames up from the bottom edge, staggered left, centre, right; the outgoing photo stays underneath. Headline sits under the left frame, line and button under the right.

## Do's and Don'ts

### Do:
- Let photography carry colour; keep UI ink, paper and bronze.
- Use Tenor capitals for every title and label.
- Keep every corner square.
- Mark sample data as sample data.

### Don't:
- Don't add eyebrows above section titles.
- Don't use rounded cards, pills or coloured status badges.
- Don't set Tenor Sans bold.
- Don't use bronze as a large background.
