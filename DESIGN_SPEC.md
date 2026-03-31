# InvoiceFlow Landing Page - Design Specification

## 1. Design System Overview

### 1.1 Color Palette

#### Primary Colors
- **Slate Blue** `#596778` - Primary brand color, CTAs, navigation active states
- **Slate Gray** `#8691A6` - Secondary text, secondary actions, borders
- **Pure White** `#FFFFFF` - Backgrounds, card surfaces
- **Dark Slate** `#2C3E50` - Primary text, headlines

#### Accent Colors
- **Brand Green** `#10B981` - Success states, positive indicators
- **Brand Blue** `#3B82F6` - Links, highlights
- **Brand Purple** `#8B5CF6` - Tertiary actions, premium features
- **Warm Orange** `#F97316` - Alerts, attention-grabbing elements
- **Light Gray** `#F3F4F6` - Backgrounds, subtle dividers
- **Border Gray** `#E5E7EB` - Input borders, component boundaries

#### Semantic Colors
- **Error Red** `#EF4444` - Error states, deletions
- **Warning Orange** `#FBBF24` - Warnings
- **Success Green** `#10B981` - Success messages
- **Info Blue** `#3B82F6` - Information

#### Backgrounds
- **Page Background** `#FAFAFA` - Off-white, reduces eye strain
- **Section Background** `#FFFFFF` - Solid white for content
- **Dark Section** `#1F2937` - Dark sections (footer)

### 1.2 Typography Hierarchy

#### Font Family
- **Primary**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Monospace**: "Fira Code", "Monaco", monospace (for code snippets)

#### Typography Scale
| Element | Font Size | Line Height | Font Weight | Letter Spacing | Use Case |
|---------|-----------|-------------|------------|-----------------|----------|
| H1 | 48px | 1.2 | 700 (Bold) | -0.02em | Page hero headline |
| H2 | 36px | 1.3 | 700 (Bold) | -0.01em | Section headline |
| H3 | 28px | 1.4 | 600 (Semibold) | 0em | Subsection headline |
| H4 | 24px | 1.5 | 600 (Semibold) | 0em | Card title |
| Body Large | 18px | 1.6 | 400 (Regular) | 0em | Lead paragraph, body text |
| Body Regular | 16px | 1.6 | 400 (Regular) | 0em | Primary body text |
| Body Small | 14px | 1.5 | 400 (Regular) | 0em | Secondary text, captions |
| Label | 12px | 1.4 | 500 (Medium) | 0.04em | Form labels, badges |
| Button | 14px | 1.5 | 600 (Semibold) | 0.02em | Button text |

### 1.3 Spacing System

Using 8px base unit (Tailwind default):

| Scale | Value | Tailwind | Use Case |
|-------|-------|----------|----------|
| xs | 4px | space-1 | Small gaps, icon spacing |
| sm | 8px | space-2 | Small padding, margins |
| md | 16px | space-4 | Standard padding, component spacing |
| lg | 24px | space-6 | Section spacing, large padding |
| xl | 32px | space-8 | Container spacing |
| 2xl | 48px | space-12 | Large section spacing |
| 3xl | 64px | space-16 | Hero spacing, major sections |
| 4xl | 80px | space-20 | Page-level spacing |

### 1.4 Sizing Guidelines

#### Container Widths
| Breakpoint | Width | Tailwind |
|-----------|-------|----------|
| Mobile | 320px - 100% | Full width with padding |
| Tablet | 640px - 768px | md: |
| Desktop | 1024px - 1280px | lg: |
| Large Desktop | 1280px+ | xl: |

#### Component Sizes
| Component | Dimension | Notes |
|-----------|-----------|-------|
| Icon (Small) | 16px × 16px | Inline icons |
| Icon (Regular) | 24px × 24px | Button icons |
| Icon (Large) | 40px × 40px | Feature icons |
| Avatar | 32px - 48px | Testimonial avatars |
| Button | min-height: 40px, 44px (mobile) | Touch target: 44px+ |
| Input | height: 40px | Form fields |
| Card | 300px - 400px width | Feature cards |

### 1.5 Button Styles

#### Primary Button
- Background: `#596778` (Slate Blue)
- Text: White
- Padding: 12px 24px (md); 16px 32px (lg)
- Border Radius: 8px
- Font Weight: 600
- Hover: `#4a5568` (10% darker)
- Active: `#3d4657` (20% darker)
- Focus: Outline 2px #8B5CF6 with 4px offset
- Transition: 150ms ease

#### Secondary Button
- Background: Transparent / `#F3F4F6`
- Border: 1px solid `#8691A6`
- Text: `#596778`
- Padding: 12px 24px (md); 16px 32px (lg)
- Hover: Background `#E5E7EB`
- Transition: 150ms ease

#### Tertiary Button
- Background: Transparent
- Text: `#596778`
- Underline: Animated underline on hover
- Font Weight: 500

### 1.6 Card Design

#### Base Card
- Background: White
- Border Radius: 12px
- Box Shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
- Padding: 24px
- Transition: All 200ms ease

#### Elevated Card (Hover State)
- Box Shadow: 0 10px 25px rgba(0,0,0,0.1)
- Transform: translateY(-4px)

#### Feature Card
- Border: 1px solid `#E5E7EB`
- Icon Container: 48px × 48px circle or square
- Icon Color: `#596778` or brand color
- Title: H4 size, font-weight 600
- Description: Body Small, `#8691A6`

### 1.7 Input Fields

#### Text Input
- Height: 40px (mobile 44px)
- Padding: 10px 12px
- Border: 1px solid `#E5E7EB`
- Border Radius: 8px
- Font Size: 14px
- Focus: Border `#596778`, outline 2px `#8B5CF6` with 4px offset
- Disabled: Background `#F3F4F6`, Cursor not-allowed

#### Form Labels
- Font Size: 12px
- Font Weight: 500
- Color: `#2C3E50`
- Margin Bottom: 6px
- Required Indicator: `*` in red

### 1.8 Animation & Transitions

#### Timing Functions
- **Fast**: 150ms ease (UI interactions)
- **Standard**: 200ms ease (component transitions)
- **Slow**: 300-500ms ease (entrance animations)

#### Common Animations
- **Fade In**: opacity 0 → 1 (300ms)
- **Slide Up**: transform translateY(20px) → 0 (300ms)
- **Scale**: transform scale(0.95) → 1 (200ms)
- **Hover Lift**: transform translateY(-4px) (200ms)
- **Shimmer Loading**: Animated gradient background

#### Scroll Animations
- Images: Fade-in on scroll into viewport
- Text: Slide up + fade on scroll
- Cards: Stagger animation on entrance

### 1.9 Responsive Breakpoints

| Breakpoint | Width | Tailwind | Use Case |
|-----------|-------|----------|----------|
| Mobile | 0 - 639px | sm: | Phones (default) |
| Tablet | 640px - 1023px | md: | Tablets, large phones |
| Desktop | 1024px - 1279px | lg: | Desktops |
| Large | 1280px+ | xl: | Large monitors |

#### Responsive Font Sizes
- **Mobile First**: Default sizes optimized for mobile
- **Tablet**: H1: 40px, H2: 28px
- **Desktop**: Full scale as specified in H1-H6

### 1.10 Z-Index Scale

| Layer | Z-Index | Components |
|-------|---------|-----------|
| Base | 0-10 | Cards, buttons |
| Dropdown | 20 | Dropdowns, tooltips |
| Sticky Header | 30 | Navigation |
| Modal | 40 | Dialogs, modals |
| Notification | 50 | Toast messages |

---

## 2. Layout Structure

### 2.1 Page Structure

```
Landing Page
├── Header (Fixed/Sticky)
├── Hero Section
├── Features Grid (6-8 cards)
├── How It Works (3-step process)
├── Statistics Showcase
├── Testimonials Carousel
├── FAQ Section
├── Final CTA Section
├── Footer
└── Mobile Menu (Mobile Only)
```

### 2.2 Header / Navigation

**Desktop Layout:**
- Logo on left (40px height)
- Navigation links centered: Home, Features, How It Works, Pricing, FAQ
- Right side: Sign In button + Get Started CTA button
- Background: White with subtle shadow on scroll
- Spacing: 16px vertical padding

**Mobile Layout:**
- Logo on left
- Hamburger menu on right
- Sticky navigation below header when scrolled
- Full-screen menu overlay on mobile

### 2.3 Hero Section

**Layout:**
- Container: max-width 1200px, centered
- Grid: 2 columns on desktop, 1 column on mobile
- Left: Headline + Subheadline + CTA buttons
- Right: Hero image/graphic OR Animated illustration

**Content:**
- Headline (H1): "Invoicing Made Simple and Fast"
- Subheadline (Body Large): Supporting text
- CTA Buttons: Primary "Get Started Free" + Secondary "See Demo"
- Trust badge: "Trusted by 10,000+ businesses"

**Spacing:**
- Top padding: 80px (desktop), 60px (tablet), 40px (mobile)
- Bottom padding: 80px (desktop)
- Content gap: 60px

### 2.4 Features Section

**Layout:**
- Headline + Description centered
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- 6-8 feature cards
- Each card: Icon, Title, Description
- Cards: Hover effect with lift + shadow

**Cards Per Row:**
- Desktop: 3 cards
- Tablet: 2 cards
- Mobile: 1 card (with horizontal scroll alternative)

### 2.5 How It Works Section

**Layout:**
- Section headline
- 3 steps in a row (desktop) or stacked (mobile)
- Each step: Number + Title + Description + Icon
- Connector lines between steps (desktop only)
- Background: Light gray alternating sections or gradient

### 2.6 Statistics Section

**Layout:**
- 4 key metrics displayed
- Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Each stat: Large number + Label
- Background: Dark/branded section
- Counter animation on scroll

### 2.7 Testimonials Section

**Layout:**
- Carousel/slider (desktop)
- Testimonial card: Avatar, name, title, quote, stars
- Navigation: Dot indicators, prev/next buttons
- Auto-rotate: 5 seconds, pause on hover
- Cards on mobile: Horizontal scroll

### 2.8 FAQ Section

**Layout:**
- Accordion component
- Question + Answer expandable
- Active state: Chevron rotates, answer slides down
- Group related FAQs
- Search functionality (optional, advanced)

### 2.9 Final CTA Section

**Layout:**
- Large, eye-catching section
- Headline: "Ready to simplify your invoicing?"
- Subheadline: Supporting text
- Primary CTA button, Secondary: "View Pricing"
- Background: Gradient (brand colors) or solid color
- Optional: Floating elements, animated background

### 2.10 Footer

**Layout:**
- 4-5 columns of links + newsletter signup
- Column 1: Logo + Description
- Column 2-4: Link groups (Product, Resources, Legal)
- Column 5: Newsletter signup
- Bottom: Copyright, social links

**Mobile:**
- Single column layout
- Accordion for link groups
- Full-width newsletter signup

---

## 3. Component Specifications

### 3.1 Button Component

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}
```

**States:**
- Default
- Hover
- Active
- Disabled
- Loading (with spinner)

### 3.2 Card Component

**Props:**
```typescript
interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  badge?: string;
  hover?: boolean;
}
```

### 3.3 Accordion Component

**Props:**
```typescript
interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  allowMultiple?: boolean;
}
```

### 3.4 Carousel Component

**Props:**
```typescript
interface CarouselProps {
  items: Array<ReactNode>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}
```

---

## 4. Accessibility Guidelines (WCAG 2.1 AA)

### 4.1 Color Contrast
- Text on background: Minimum 4.5:1 for normal text
- Large text: Minimum 3:1
- All CTAs: Pass contrast requirements

### 4.2 Interactive Elements
- Minimum touch target: 44px × 44px (mobile)
- Keyboard navigation: Tab order logical
- Focus states: Visible, high contrast outline

### 4.3 Semantic HTML
- Use semantic elements: `<button>`, `<nav>`, `<article>`, `<section>`
- Proper heading hierarchy: H1 → H2 → H3 (no skipping)
- Form labels associated with inputs: `<label htmlFor="id">`

### 4.4 ARIA Attributes
- `aria-label` for icon-only buttons
- `aria-expanded` for accordion/expandable items
- `aria-current="page"` for active navigation
- `role="button"` only when necessary

### 4.5 Alternative Text
- All images: Descriptive alt text
- Icons: Either aria-label or alt text
- Decorative images: `alt=""`

### 4.6 Motion & Animation
- Respect `prefers-reduced-motion` media query
- Provide static fallbacks for animated content
- Auto-playing videos/carousels: provide controls

---

## 5. Mobile-First Responsive Strategy

### 5.1 Mobile Optimizations
- Touch-friendly buttons: 48px minimum height
- Readable font sizes: 16px minimum for body
- Full-width design with padding
- Single-column layouts
- Simplified navigation with hamburger menu

### 5.2 Tablet Optimizations
- Increased spacing for comfort
- 2-column layouts where appropriate
- Larger imagery

### 5.3 Desktop Optimizations
- Multi-column layouts
- More vertical spacing
- Hover effects enabled
- Full-featured navigation

---

## 6. Performance Optimization

### 6.1 Image Optimization
- WebP format with fallbacks
- Responsive images: srcset for different sizes
- Lazy loading: `loading="lazy"` for below-fold images
- Image dimensions: Specify width/height to prevent CLS

### 6.2 Code Splitting
- Route-based code splitting
- Lazy load non-critical sections
- Optimize bundle size

### 6.3 CSS Optimization
- Tailwind CSS: Remove unused styles in prod
- Critical CSS: Inline above-fold styles
- Minimize CSS animations

---

## 7. Color Usage Guidelines

| Component | Primary Use | Alternative |
|-----------|------------|-------------|
| **Primary CTA** | `#596778` (Slate Blue) | N/A |
| **Secondary CTA** | `#E5E7EB` with `#596778` border | `#8691A6` text |
| **Active Navigation** | `#596778` | Underline `#10B981` |
| **Text (Heading)** | `#2C3E50` | N/A |
| **Text (Body)** | `#4B5563` | `#8691A6` (secondary) |
| **Borders** | `#E5E7EB` | `#8691A6` (emphasized) |
| **Backgrounds** | `#FAFAFA` | `#FFFFFF` (cards) |
| **Accents** | `#10B981` (success) / `#8B5CF6` (premium) | N/A |
| **Success** | `#10B981` | N/A |
| **Error** | `#EF4444` | N/A |

---

## 8. Implementation Notes

### 8.1 Tailwind CSS Configuration
- Extend default theme with custom colors
- Define custom spacing scale
- Custom animations for entrance effects
- Custom font sizes following typography scale

### 8.2 Component Architecture
- Atomic design principles: Atoms → Molecules → Organisms
- Reusable, composable components
- Props-driven design
- Proper TypeScript interfaces

### 8.3 State Management
- Use React hooks for local state
- Consider Context API for theme/global state
- No heavy state management needed for landing page

### 8.4 Performance Metrics to Track
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3.8s

---

## File Structure

```
src/
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Statistics.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Accordion.tsx
│   │   ├── Carousel.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   └── Header.tsx
├── page.tsx (Landing Page)
├── lib/
│   ├── animations.ts
│   └── constants.ts
└── tailwind.config.ts
```

This specification provides a complete design system for implementing the InvoiceFlow landing page with consistency, accessibility, and performance in mind.
