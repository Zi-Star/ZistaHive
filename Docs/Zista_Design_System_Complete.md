# ZISTA DESIGN SYSTEM - Complete Guide
**Version:** 1.0  
**Date:** October 2025  
**Purpose:** Comprehensive design system for consistent UI/UX  
**For:** Designers, developers, and AI assistants

---

## 🎯 Design Philosophy

**Zista's design principles:**
1. **Approachable** - Friendly, not intimidating
2. **Efficient** - Fast interactions, clear hierarchy
3. **Youthful** - Modern, energetic, vibrant
4. **Trustworthy** - Professional, reliable, secure
5. **Kenyan** - Locally relevant, culturally aware

**Design Goal:** Make productivity feel rewarding, not boring.

**Visual Theme:** Dark theme using Deep Indigo background with Golden Honey accents, creating a modern, focused environment similar to daily.dev but with Zista's unique identity.

---

## 🎨 COLOR SYSTEM

### **Primary Colors**

```css
/* Golden Honey - Primary brand color */
--golden-honey: #F9C74F;
--golden-honey-light: #FFDAA3;
--golden-honey-dark: #E5B03B;

/* Deep Indigo - Secondary, trust, depth */
--deep-indigo: #312E81;
--deep-indigo-light: #4C4799;
--deep-indigo-dark: #1E1B4D;

/* Soft White - Background, balance */
--soft-white: #F5F5F7;
--soft-white-dark: #E8E8EA;

/* Accent Cyan - Freshness, innovation */
--accent-cyan: #3ABFF8;
--accent-cyan-light: #7DD3FC;
--accent-cyan-dark: #0EA5E9;
```

**Usage Guidelines:**
- **Golden Honey:** Primary accent - buttons, badges, highlights, Honey currency, active states
- **Deep Indigo:** Main background (dark theme), cards, containers
- **Deep Indigo Dark (#1E1B4D):** Page background, darkest surfaces
- **Soft White:** Text color on dark backgrounds, secondary elements
- **Accent Cyan:** Links, info messages, progress indicators, secondary accents

---

### **Semantic Colors**

```css
/* Success */
--success: #10B981;
--success-light: #34D399;
--success-dark: #059669;

/* Warning */
--warning: #F59E0B;
--warning-light: #FBBF24;
--warning-dark: #D97706;

/* Error */
--error: #EF4444;
--error-light: #F87171;
--error-dark: #DC2626;

/* Info */
--info: #3ABFF8;
--info-light: #7DD3FC;
--info-dark: #0EA5E9;
```

---

### **Neutral Grays**

```css
/* Text & UI elements */
--gray-50: #FAFAFA;
--gray-100: #F5F5F5;
--gray-200: #E5E5E5;
--gray-300: #D4D4D4;
--gray-400: #A3A3A3;
--gray-500: #737373;
--gray-600: #525252;
--gray-700: #404040;
--gray-800: #262626;
--gray-900: #171717;
```

**Text Hierarchy:**
- **Primary text:** --gray-900
- **Secondary text:** --gray-600
- **Tertiary text:** --gray-400
- **Disabled text:** --gray-300

---

### **Tailwind Config**

```javascript
// tailwind.config.js - Updated for Dark Theme
module.exports = {
  theme: {
    extend: {
      colors: {
        'golden-honey': {
          DEFAULT: '#F9C74F',
          light: '#FFDAA3',
          dark: '#E5B03B',
        },
        'deep-indigo': {
          DEFAULT: '#312E81',
          light: '#4C4799',
          dark: '#1E1B4D',
        },
        'soft-white': {
          DEFAULT: '#F5F5F7',
          dark: '#E8E8EA',
        },
        'accent-cyan': {
          DEFAULT: '#3ABFF8',
          light: '#7DD3FC',
          dark: '#0EA5E9',
        },
      },
    },
  },
};
```

---

## 📐 SPACING SYSTEM

### **Scale (Base: 4px)**

```css
/* Tailwind default spacing (use these) */
0    → 0px
1    → 4px
2    → 8px
3    → 12px
4    → 16px
5    → 20px
6    → 24px
8    → 32px
10   → 40px
12   → 48px
16   → 64px
20   → 80px
24   → 96px
32   → 128px
```

**Usage Examples:**
```tsx
<div className="p-4">     {/* 16px padding */}
<div className="gap-6">   {/* 24px gap */}
<div className="mb-8">    {/* 32px margin-bottom */}
```

---

### **Component Spacing Guidelines**

**Dark Theme Considerations:**
- Use larger padding on dark backgrounds for better visual comfort
- Increase spacing between interactive elements for clarity

**Cards:**
- Padding: `p-6` (24px) on desktop, `p-5` (20px) on mobile
- Gap between cards: `gap-6` (24px)
- Background: `bg-deep-indigo` with `border-deep-indigo-light/20`

**Buttons:**
- Padding: `px-4 py-2` (16px horizontal, 8px vertical)
- Gap between buttons: `gap-3` (12px)

**Form Fields:**
- Margin between fields: `space-y-4` (16px)
- Label to input: `gap-1` (4px)

**Sections:**
- Vertical spacing: `space-y-8` (32px) on desktop, `space-y-6` (24px) on mobile

---

## 🔤 TYPOGRAPHY

### **Font Families**

**Primary: Inter**
```css
/* Clean, modern, readable */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Alternative: Poppins**
```css
/* Rounded, friendly (use for headings if preferred) */
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Installation:**
```bash
npm install @fontsource/inter @fontsource/poppins
```

```typescript
// app/layout.tsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

---

### **Type Scale**

```css
/* Display (Hero sections) */
--text-display: 4.5rem;    /* 72px - Rare use */
line-height: 1.1;
font-weight: 700;

/* Heading 1 */
--text-h1: 3rem;           /* 48px */
line-height: 1.2;
font-weight: 700;

/* Heading 2 */
--text-h2: 2.25rem;        /* 36px */
line-height: 1.3;
font-weight: 600;

/* Heading 3 */
--text-h3: 1.875rem;       /* 30px */
line-height: 1.4;
font-weight: 600;

/* Heading 4 */
--text-h4: 1.5rem;         /* 24px */
line-height: 1.4;
font-weight: 600;

/* Heading 5 */
--text-h5: 1.25rem;        /* 20px */
line-height: 1.5;
font-weight: 600;

/* Body Large */
--text-body-lg: 1.125rem;  /* 18px */
line-height: 1.6;
font-weight: 400;

/* Body (Default) */
--text-body: 1rem;         /* 16px */
line-height: 1.6;
font-weight: 400;

/* Body Small */
--text-body-sm: 0.875rem;  /* 14px */
line-height: 1.5;
font-weight: 400;

/* Caption */
--text-caption: 0.75rem;   /* 12px */
line-height: 1.4;
font-weight: 400;
```

---

### **Tailwind Typography Classes**

```tsx
<h1 className="text-5xl font-bold">Display</h1>
<h1 className="text-3xl font-bold">Heading 1</h1>
<h2 className="text-2xl font-semibold">Heading 2</h2>
<h3 className="text-xl font-semibold">Heading 3</h3>
<h4 className="text-lg font-semibold">Heading 4</h4>
<p className="text-base">Body text</p>
<p className="text-sm">Small text</p>
<p className="text-xs">Caption</p>
```

---

### **Font Weights**

```css
font-weight: 400;  /* Regular - Body text */
font-weight: 500;  /* Medium - Emphasis */
font-weight: 600;  /* Semibold - Subheadings */
font-weight: 700;  /* Bold - Headings */
```

**Tailwind classes:**
```tsx
<p className="font-normal">Regular</p>
<p className="font-medium">Medium</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>
```

---

## 📏 LAYOUT SYSTEM

### **Breakpoints**

```javascript
// Tailwind default breakpoints (mobile-first)
sm: '640px',   // Tablet portrait
md: '768px',   // Tablet landscape
lg: '1024px',  // Desktop
xl: '1280px',  // Large desktop
2xl: '1536px', // Extra large
```

**Usage:**
```tsx
<div className="
  grid-cols-1      /* Mobile: 1 column */
  sm:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */
">
```

---

### **Container Widths**

```css
/* Max widths for content */
--container-sm: 640px;   /* Single column content */
--container-md: 768px;   /* Article width */
--container-lg: 1024px;  /* Dashboard width */
--container-xl: 1280px;  /* Full width */
```

**Usage:**
```tsx
<div className="container max-w-4xl mx-auto px-4">
  {/* Content */}
</div>
```

---

### **Grid System**

```tsx
{/* 12-column grid */}
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8">Main</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>

{/* Auto-fit grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ToolCard />
  <ToolCard />
  <ToolCard />
</div>
```

---

## 🎭 SHADOWS & ELEVATION

### **Shadow Scale**

```css
/* None */
box-shadow: none;

/* Small - Cards, buttons */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Medium - Dropdowns, popovers */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

/* Large - Modals, flyouts */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

/* Extra Large - Important overlays */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

**Tailwind classes:**
```tsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
```

---

### **Elevation Guidelines**

**Level 0 (Flat):**
- Background surfaces
- Page containers

**Level 1 (Raised):**
- Cards
- Tool containers
- List items

**Level 2 (Floating):**
- Buttons (hover state)
- Dropdown menus
- Tooltips

**Level 3 (Overlay):**
- Modals
- Dialogs
- Sheets

**Level 4 (Top):**
- Toasts
- Notifications
- Alert bars

---

## 🔘 BORDER RADIUS

### **Radius Scale**

```css
/* None */
border-radius: 0;

/* Small - Buttons, badges */
border-radius: 0.25rem;  /* 4px */

/* Medium - Cards, inputs */
border-radius: 0.5rem;   /* 8px */

/* Large - Modals, images */
border-radius: 0.75rem;  /* 12px */

/* Extra Large - Special elements */
border-radius: 1rem;     /* 16px */

/* Full - Circles, pills */
border-radius: 9999px;
```

**Tailwind classes:**
```tsx
<button className="rounded">Medium (8px)</button>
<div className="rounded-lg">Large (12px)</div>
<img className="rounded-full">Circle</img>
```

---

## 🎨 COMPONENT STYLES

### **Buttons**

**Primary Button (Golden Honey):**
```tsx
<button className="
  px-4 py-2
  bg-golden-honey hover:bg-golden-honey-dark
  text-deep-indigo-dark font-medium
  rounded-lg
  transition-all duration-200
  hover:scale-105
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Primary Action
</button>
```

**Secondary Button (Deep Indigo):**
```tsx
<button className="
  px-4 py-2
  bg-deep-indigo hover:bg-deep-indigo-light
  text-white font-medium
  border border-deep-indigo-light/20
  rounded-lg
  transition-all duration-200
">
  Secondary Action
</button>
```

**Ghost Button:**
```tsx
<button className="
  px-4 py-2
  text-white/70 hover:text-golden-honey
  hover:bg-deep-indigo-light/20
  font-medium rounded-lg
  transition-all duration-200
">
  Ghost Action
</button>
```

---

### **Cards**

**Standard Card (Dark Theme):**
```tsx
<div className="
  bg-deep-indigo
  border border-deep-indigo-light/20
  rounded-lg
  shadow-md hover:shadow-lg
  hover:border-golden-honey/30
  p-6
  transition-all duration-200
">
  {/* Card content */}
</div>
```

**Highlighted Card (Honey Feature):**
```tsx
<div className="
  bg-gradient-to-br from-golden-honey to-golden-honey-dark
  text-deep-indigo-dark
  border-2 border-golden-honey
  rounded-lg
  p-6
  shadow-lg
">
  {/* Featured content */}
</div>
```

**Subtle Card (Semi-transparent):**
```tsx
<div className="
  bg-deep-indigo-light/10
  border border-deep-indigo-light/10
  rounded-lg
  backdrop-blur-sm
  p-5
  hover:bg-deep-indigo-light/20
  transition-all duration-200
">
  {/* Subtle content */}
</div>
```

---

### **Form Inputs**

**Text Input:**
```tsx
<input className="
  w-full
  px-4 py-2
  bg-white
  border border-gray-300
  rounded-lg
  focus:outline-none focus:ring-2 focus:ring-golden-honey
  focus:border-transparent
  placeholder:text-gray-400
  disabled:bg-gray-100 disabled:cursor-not-allowed
" />
```

**Label:**
```tsx
<label className="
  block
  text-sm font-medium text-gray-700
  mb-1
">
  Label Text
</label>
```

**Error State:**
```tsx
<input className="
  border-red-500
  focus:ring-red-500
" />
<p className="mt-1 text-sm text-red-600">
  Error message
</p>
```

---

### **Badges**

**Honey Badge:**
```tsx
<span className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-golden-honey text-deep-indigo
  text-sm font-medium
  rounded-full
">
  🍯 1,250 Honey
</span>
```

**Status Badge:**
```tsx
<span className="
  px-2 py-1
  bg-green-100 text-green-800
  text-xs font-medium
  rounded-full
">
  Active
</span>
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### **Duration Scale**

```css
/* Instant - Immediate feedback */
transition-duration: 100ms;

/* Fast - Hover states, small changes */
transition-duration: 200ms;

/* Normal - Default for most transitions */
transition-duration: 300ms;

/* Slow - Modals, page transitions */
transition-duration: 500ms;
```

**Tailwind classes:**
```tsx
<div className="transition-colors duration-200">
<div className="transition-transform duration-300">
<div className="transition-opacity duration-500">
```

---

### **Easing Functions**

```css
/* Linear - Mechanical, constant speed */
transition-timing-function: linear;

/* Ease - Default, natural feeling */
transition-timing-function: ease;

/* Ease-in-out - Smooth start and end */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce - Playful, attention-grabbing */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

### **Common Transitions**

**Hover Effects:**
```tsx
{/* Scale up */}
<div className="transform hover:scale-105 transition-transform duration-200">

{/* Lift up */}
<div className="transform hover:-translate-y-1 transition-transform duration-200">

{/* Brightness */}
<img className="hover:brightness-110 transition-all duration-200" />
```

**Loading States:**
```tsx
{/* Spin */}
<div className="animate-spin">⟳</div>

{/* Pulse */}
<div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>

{/* Bounce */}
<div className="animate-bounce">↓</div>
```

---

### **Framer Motion Presets**

```tsx
import { motion } from 'framer-motion';

{/* Fade in */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

{/* Slide up */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

{/* Scale in */}
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.2 }}
>

{/* Honey earned animation */}
<motion.div
  initial={{ scale: 0.5, y: 0 }}
  animate={{ scale: 1.2, y: -50, opacity: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  +10 🍯
</motion.div>
```

---

## 📱 RESPONSIVE DESIGN

### **Mobile-First Approach**

```tsx
{/* Default styles = mobile */}
<div className="
  p-4           {/* Mobile: 16px padding */}
  text-sm       {/* Mobile: 14px text */}
  
  md:p-6        {/* Tablet: 24px padding */}
  md:text-base  {/* Tablet: 16px text */}
  
  lg:p-8        {/* Desktop: 32px padding */}
  lg:text-lg    {/* Desktop: 18px text */}
">
```

---

### **Touch Targets**

**Minimum sizes for mobile:**
- Buttons: 44x44px (iOS standard)
- Icons: 40x40px minimum
- Tap areas: 48x48px minimum

```tsx
<button className="
  min-h-[44px] min-w-[44px]
  flex items-center justify-center
">
  ✓
</button>
```

---

### **Responsive Typography**

```tsx
{/* Headings scale down on mobile */}
<h1 className="
  text-3xl     {/* Mobile: 30px */}
  md:text-4xl  {/* Tablet: 36px */}
  lg:text-5xl  {/* Desktop: 48px */}
  font-bold
">

{/* Body text stays readable */}
<p className="
  text-sm      {/* Mobile: 14px */}
  md:text-base {/* Tablet+: 16px */}
  leading-relaxed
">
```

---

## ♿ ACCESSIBILITY

### **Color Contrast**

**WCAG AA Requirements:**
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Zista Compliant Combinations:**
```tsx
{/* ✅ Good contrast */}
<div className="bg-white text-gray-900">        {/* 21:1 */}
<div className="bg-golden-honey text-deep-indigo"> {/* 7.2:1 */}
<div className="bg-deep-indigo text-white">     {/* 12.6:1 */}

{/* ⚠️ Check these carefully */}
<div className="bg-soft-white text-gray-600">   {/* 4.6:1 - OK */}
```

---

### **Focus States**

```tsx
{/* Visible focus ring */}
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-golden-honey
  focus:ring-offset-2
">

{/* Focus within (for containers) */}
<div className="
  focus-within:ring-2
  focus-within:ring-accent-cyan
">
```

---

### **Screen Reader Support**

```tsx
{/* Hidden text for screen readers */}
<span className="sr-only">Close dialog</span>

{/* Aria labels */}
<button aria-label="Close" />

{/* Semantic HTML */}
<nav aria-label="Main navigation">
<main aria-label="Main content">
<aside aria-label="Sidebar">
```

---

## 🎯 DESIGN TOKENS (CSS Variables)

### **Setup**

```css
/* globals.css */
:root {
  /* Colors */
  --color-golden-honey: #F9C74F;
  --color-deep-indigo: #312E81;
  --color-soft-white: #F5F5F7;
  --color-accent-cyan: #3ABFF8;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark mode (Phase 2+) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-soft-white: #1F1F1F;
    /* Adjust other colors for dark mode */
  }
}
```

---

## 📐 ICONOGRAPHY

### **Icon Library: Lucide React**

```bash
npm install lucide-react
```

**Usage:**
```tsx
import { Home, Search, Settings, Honey } from 'lucide-react';

<Home className="h-5 w-5" />
<Search className="h-6 w-6 text-gray-600" />
```

---

### **Icon Sizes**

```css
/* Extra Small - Inline with text */
h-4 w-4  /* 16px */

/* Small - Buttons, badges */
h-5 w-5  /* 20px */

/* Medium - Default */
h-6 w-6  /* 24px */

/* Large - Featured icons */
h-8 w-8  /* 32px */

/* Extra Large - Hero sections */
h-12 w-12  /* 48px */
```

---

## ✅ DESIGN CHECKLIST

Before launching any UI:

**Visual:**
- [ ] Uses Zista color palette
- [ ] Typography follows scale
- [ ] Spacing is consistent (4px base)
- [ ] Border radius matches system
- [ ] Shadows are appropriate

**Responsive:**
- [ ] Mobile-first design
- [ ] Works on 320px width (iPhone SE)
- [ ] Touch targets are 44px+
- [ ] Text is readable on all sizes
- [ ] Images are optimized

**Accessibility:**
- [ ] Color contrast passes WCAG AA
- [ ] Focus states are visible
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Semantic HTML used

**Performance:**
- [ ] Animations are smooth (60fps)
- [ ] No layout shift (CLS < 0.1)
- [ ] Images lazy load
- [ ] Fonts are optimized

**Brand:**
- [ ] Feels youthful and energetic
- [ ] Bee metaphor is subtle
- [ ] Honey is prominently featured
- [ ] Matches Zista personality

---
**Document End - Design System Complete!**