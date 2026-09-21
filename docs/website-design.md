# CureSpare Health Point — Website Design Documentation

## 1. Design Direction & Brand Aesthetic

The visual language for **CureSpare Health Point** is designed to convey **clinical excellence, warmth, trustworthiness, and human resilience**. 

Rather than adopting a generic medical blue SaaS layout or loud, distracting animations, the design utilizes an **editorial healthcare visual system**:
- Deep, calm greens evoking health and stability (`#0B4336`, `#07382D`).
- Soft sage accent tones providing gentle focus (`#A8C99D`, `#DCE9D9`).
- Warm off-white backgrounds ensuring high readability (`#F7F8F4`).
- Sophisticated typographic pairings combining clean modern sans-serifs for interface legibility with selective serif italics for emotional impact.

---

## 2. Color System & Design Tokens

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Primary Dark Green** | `#0B4336` | Hero background, primary action buttons, brand accents, footer links. |
| **Deep Green** | `#07382D` | Footer canvas, high-contrast dark sections, hero container backgrounds. |
| **Accent Sage** | `#A8C99D` | Eyebrows, highlighted typography, hover state indicators, trust badge icons. |
| **Soft Sage** | `#DCE9D9` | Badges, card backgrounds, light accent overlays, success states. |
| **Warm White** | `#F7F8F4` | Primary page canvas background for low eye strain. |
| **Pure White** | `#FFFFFF` | Form containers, card backgrounds, interactive modals. |
| **Primary Text** | `#111714` | High-contrast headings and body copy. |
| **Secondary Text** | `#5D6661` | Supporting paragraphs, labels, metadata, captions. |
| **Border** | `#DDE3DE` | Subtle container dividers and input outline borders. |

---

## 3. Typography System

### Primary Sans-Serif (`Inter` / `Plus Jakarta Sans`)
Used for all UI elements, navigation items, body text, form fields, buttons, and subheadings to guarantee crisp legibility across screens.

### Editorial Serif Accent (`Playfair Display`)
Used selectively for emotional emphasis and highlighted editorial words in headings (e.g., *"Move Better. Live **Stronger**"* or *"Your Recovery **Journey**"*).

```
Headline 1: 3.5rem (56px) / 1.15 line-height / Bold
Headline 2: 2.5rem (40px) / 1.2 line-height / Bold
Body Text: 1rem (16px) / 1.6 line-height / Regular
Label / Eyebrow: 0.75rem (12px) / 1.0 line-height / Bold Uppercase Tracking 0.1em
```

---

## 4. Grid & Responsive Layouts

- **Container Width**: Max content width centered at `1320px` with responsive gutters (`16px` mobile, `32px` desktop).
- **Desktop Grid**: 12-column CSS Grid / Flexbox layouts allowing asymmetric compositions.
- **Tablet Grid**: Multi-column 2-card grids with fluid wrapping.
- **Mobile Grid**: Single column stack with enlarged touch targets (`min-height 44px`).

Tested Viewport Breakpoints:
- `1440px` (Ultrawide desktop)
- `1280px` (Standard desktop)
- `1024px` (Laptop / iPad Landscape)
- `768px` (Tablet Portrait)
- `430px`, `390px`, `360px` (Mobile viewports)

---

## 5. UI Component Hierarchy

1. **Navbar**: Fixed header with backdrop blur, brand mark, section links, and quick phone CTA.
2. **Hero**: Editorial split hero with eyebrow badge, dual CTA, trust badge, and senior director badge.
3. **Stats**: High-density metric bar highlighting patient success numbers.
4. **About**: Asymmetric feature card introducing Dr. Ananya Sharma and clinical philosophy.
5. **Services**: 6 image-focused editorial service cards with benefit checklist pills.
6. **Recovery Journey**: 4-step numbered protocol timeline.
7. **Appointment Form**: Fully responsive form with real-time validation, loading state, reference ID generation, and success messaging.
8. **Conditions**: 8-item grid featuring patient-friendly descriptions.
9. **Why Choose Us**: 5 minimalist trust pillars.
10. **Testimonials**: Patient story cards with star ratings and treatment tags.
11. **FAQ**: Accessible accordion with keyboard navigation and ARIA state attributes.
12. **Contact**: Clickable phone, mailto email, map placeholder, and clinic opening hours.
13. **Final CTA**: High-impact section encouraging appointment bookings.
14. **Footer**: Brand links, contact details, social media, and interactive legal modal overlays.

---

## 6. Animation & Accessibility Strategy

- **Transitions**: Subtle 200ms-300ms cubic-bezier transitions on hover states, accordion expands, and modal overlays.
- **Reduced Motion**: Full support for `@media (prefers-reduced-motion: reduce)` disabling non-essential transitions.
- **Form Accessibility**: Explicit label-input `id` associations, focus outline rings (`focus:ring-[#0B4336]`), and keyboard accessible drawer menu.
