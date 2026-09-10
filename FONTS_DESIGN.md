# VC ORGANIC FARMS — Typography & Fonts Design System

Welcome to the official Typography and Fonts Specification for **VC ORGANIC FARMS**. This design guide documents the brand's logo typography, website font hierarchy, typographic scale, color tokens, and implementation guidelines.

---

## 1. Brand Identity & Overview

| Attribute | Specification |
| :--- | :--- |
| **Brand Name** | **VC ORGANIC FARMS** |
| **Industry** | Organic Produce, Natural Dairy & Wellness |
| **Aesthetic Direction** | Premium organic, refined luxury serif identity paired with clean, accessible modern sans-serif UI typography |
| **Primary Theme** | Natural, sustainable, healthy & trusted |

---

## 2. Logo Typography (Brand Logo Font)

The logo mark uses a classic, high-contrast all-caps serif typeface that conveys heritage, trust, and premium organic quality.

```
┌─────────────────────────────────────────┐
│                                         │
│               [ LOGO ICON ]             │
│                                         │
│               VC ORGANIC                │
│                 FARMS                   │
│                                         │
└─────────────────────────────────────────┘
```

### Font Specification

- **Primary Logo Font**: **Cinzel** (Google Fonts)
- **Secondary / Fallback Serif**: **Playfair Display**, Georgia, serif
- **Font Stack**: `'Cinzel', 'Playfair Display', Georgia, serif`
- **Character Set**: Uppercase All-Caps (`text-transform: uppercase`)

### Logo Hierarchy & Styling Breakdown

#### Line 1: `VC ORGANIC`
- **Font Family**: `Cinzel`
- **Font Weight**: `700` (Bold)
- **Font Size**: `17px` (Desktop Header/Footer)
- **Letter Spacing**: `0.08em` (`1.36px`)
- **Color**: `#0C2B1C` (Deep Organic Green)
- **Line Height**: `1.1`

#### Line 2: `FARMS`
- **Font Family**: `Cinzel`
- **Font Weight**: `600` (Semi-Bold)
- **Font Size**: `12px` (Desktop Header/Footer)
- **Letter Spacing**: `0.32em` (`3.84px` — Extended tracking for optical alignment with "VC ORGANIC")
- **Color**: `#1B4E37` (Forest Organic Green)
- **Line Height**: `1.1`
- **Text Alignment**: Center (`text-align: center`)

---

## 3. Website Fonts (UI & Content Typography)

The digital web experience utilizes clean, high-readability sans-serif fonts to complement the serif logo and ensure optimal legibility across mobile and desktop devices.

### A. Primary Heading Font: **DM Sans**
- **Typeface**: **DM Sans** (Google Fonts)
- **Weights Used**: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold)
- **Font Stack**: `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Application**:
  - Main Page Headings (`<h1>` - `<h6>`)
  - Section Headlines
  - Product Card Titles
  - Modal & Navigation Dropdown Titles

### B. Primary Body & Paragraph Font: **Inter**
- **Typeface**: **Inter** (Google Fonts)
- **Weights Used**: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold)
- **Font Stack**: `'Inter', 'Lato', -apple-system, sans-serif`
- **Application**:
  - Body Text & Paragraphs (`<p>`)
  - Feature & Benefit Descriptions
  - Form Fields, Placeholders & Input Labels
  - Button Text & Action Triggers
  - Product Badges & Metadata

### C. Supporting Accent Font: **Lato**
- **Typeface**: **Lato** (Google Fonts)
- **Application**: Footer copyright text, secondary labels, meta tags.

---

## 4. Typography Hierarchy & Scale Matrix

| Element | Font Family | Size (px) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Logo Title** | `Cinzel` | `17px` | `700` | `1.1` | `0.08em` |
| **Logo Subtitle** | `Cinzel` | `12px` | `600` | `1.1` | `0.32em` |
| **Display / Hero H1** | `DM Sans` | `56px - 64px` | `700` | `1.1` | `-0.02em` |
| **Section Title H2** | `DM Sans` | `38px - 44px` | `700` | `1.2` | `-0.01em` |
| **Subheading H3** | `DM Sans` | `28px - 32px` | `600` | `1.25` | `normal` |
| **Card Title H4/H5** | `DM Sans` | `18px - 22px` | `600` | `1.3` | `normal` |
| **Body Large** | `Inter` | `18px` | `400` | `1.5` | `normal` |
| **Body Regular** | `Inter` | `15px - 16px` | `400` | `1.6` | `normal` |
| **Small / Caption** | `Inter` | `13px - 14px` | `400` | `1.5` | `0.01em` |
| **Buttons / CTA** | `Inter` | `14px - 15px` | `600` | `1.0` | `0.02em` |

---

## 5. Color Tokens

```css
:root {
  /* Brand Logo & Accent Colors */
  --color-logo-primary: #0c2b1c;
  --color-logo-secondary: #1b4e37;
  --color-brand-accent: #0d8f5a;

  /* Typography Colors */
  --color-text-heading: #0d0d0d;
  --color-text-body: #333333;
  --color-text-muted: #666666;
  --color-text-white: #ffffff;

  /* Font Families */
  --font-family-logo: 'Cinzel', 'Playfair Display', Georgia, serif;
  --font-family-heading: 'DM Sans', sans-serif;
  --font-family-body: 'Inter', 'Lato', sans-serif;
}
```

---

## 6. Implementation Code Snippets

### A. Google Fonts `@import` (CSS)

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
```

### B. Logo Component HTML (Header & Footer)

```html
<!-- Header & Footer Brand Logo Component -->
<a href="./index.html" class="header-brand w-inline-block">
  <img src="./img/logo icon.png" loading="eager" alt="VC Organic Farms Logo" class="header-brand-logo" />
  <div class="brand-text-block">
    <span class="brand-text-title">VC ORGANIC</span>
    <span class="brand-text-subtitle">FARMS</span>
  </div>
</a>
```

### C. CSS Styling Rules

```css
/* Logo Brand Container */
.header-brand, .footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none !important;
}

/* Logo Image Icon */
.header-brand-logo, .footer-brand-logo {
  max-height: 48px;
  width: auto;
  object-fit: contain;
  display: block;
}

/* Logo Text Stack */
.brand-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.1;
  user-select: none;
}

.brand-text-title {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.08em;
  color: #0c2b1c;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand-text-subtitle {
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.32em;
  color: #1b4e37;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  margin-top: 1px;
}
```
