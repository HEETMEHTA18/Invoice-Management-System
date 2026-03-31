# InvoiceFlow Landing Page - Implementation Guide

## Quick Start

### 1. Page Structure

The landing page is fully built and ready to use at `/landing` route. All components are pre-built and integrated.

**Access the landing page:**
```
http://localhost:3000/landing
```

### 2. Component Architecture

#### Main Components

```
components/
├── landing/
│   ├── Header.tsx           # Fixed header with navigation
│   ├── Hero.tsx             # Hero section with CTA
│   ├── Features.tsx         # 6 feature cards with icons
│   ├── HowItWorks.tsx       # 3-step process
│   ├── Statistics.tsx       # Key metrics with counters
│   ├── Testimonials.tsx     # Carousel with testimonials
│   ├── FAQ.tsx              # Accordion FAQ section
│   ├── FinalCTA.tsx         # Final call-to-action
│   ├── Footer.tsx           # Footer with links
│   ├── Accordion.tsx        # Reusable accordion
│   └── Carousel.tsx         # Reusable carousel
└── ui/
    └── button.tsx           # Existing button component
```

#### Page Entry Point

```
app/landing/page.tsx       # Main landing page component
```

---

## Component Usage & Customization

### 1. Hero Section

**File:** `components/landing/Hero.tsx`

#### Props:
```typescript
interface HeroProps {
  onGetStarted?: () => void;  // Callback when CTA button clicked
  onDemo?: () => void;         // Callback when demo button clicked
}
```

#### Customization:
```typescript
// Change headline
<h1>Your Custom Headline Here</h1>

// Modify features list
const features = [
  'Feature 1',
  'Feature 2',
  'Feature 3',
];

// Update colors
className='bg-[#YOUR_COLOR]'
```

#### Example:
```tsx
<Hero 
  onGetStarted={() => router.push('/register')}
  onDemo={() => openModal('demo')}
/>
```

---

### 2. Features Section

**File:** `components/landing/Features.tsx`

#### Customization:
```typescript
// Add/remove features
const features: Feature[] = [
  {
    id: 'new-feature',
    icon: <YourIcon className='w-8 h-8' />,
    title: 'Feature Title',
    description: 'Feature description',
    color: '#NEW_COLOR', // Hex color for icon background
  },
  // ... more features
];
```

#### Features Array Properties:
- `id` - Unique identifier
- `icon` - React component (lucide-react icons recommended)
- `title` - Feature title (max 3-5 words)
- `description` - Short description (1-2 sentences)
- `color` - Icon background color (hex)

---

### 3. How It Works Section

**File:** `components/landing/HowItWorks.tsx`

#### Customization:
```typescript
const steps: Step[] = [
  {
    number: 1,
    title: 'Step Title',
    description: 'Step description',
  },
  // Maximum 3 steps for optimal layout
];
```

#### Feature Controls:
- Desktop: Shows 3 columns with connector lines
- Tablet: Shows 2 columns, no lines
- Mobile: Shows 1 column

---

### 4. Statistics Section

**File:** `components/landing/Statistics.tsx`

#### Customization:
```typescript
const stats: Stat[] = [
  { number: 10, unit: 'K+', label: 'Active Users' },
  { number: 500, unit: 'K+', label: 'Invoices Created' },
  // ...
];
```

#### Features:
- Auto-animated counters on scroll
- Up to 4 statistics in grid
- Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop

---

### 5. Testimonials Section

**File:** `components/landing/Testimonials.tsx`

#### Customization:
```typescript
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'CEO',
    company: 'Company Name',
    content: 'Testimonial content...',
    rating: 5,
    avatar: 'JD', // 2-3 character initials
  },
  // ...
];
```

#### Component: Carousel
- Auto-rotates every 5 seconds
- Pauses on hover
- Navigation via arrows and dots
- Responsive design

---

### 6. FAQ Section

**File:** `components/landing/FAQ.tsx`

#### Customization:
```typescript
const faqItems = [
  {
    id: 'unique-id',
    title: 'Question?',
    content: 'Answer content or HTML element',
  },
  // ...
];
```

#### Component: Accordion
- Single or multiple open items
- Smooth expand/collapse animation
- Full responsive width
- Keyboard accessible

---

### 7. Final CTA Section

**File:** `components/landing/FinalCTA.tsx`

#### Props:
```typescript
interface FinalCTAProps {
  onGetStarted?: () => void;
}
```

#### Features:
- Gradient background
- Multiple benefit bullets
- Primary + Secondary CTA
- Social proof section

---

### 8. Footer

**File:** `components/landing/Footer.tsx`

#### Customization:
```typescript
// Add columns
const footerColumns: FooterColumn[] = [
  {
    title: 'Column Title',
    links: [
      { label: 'Link', href: '#' },
      // ...
    ],
  },
];

// Add social links
const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  // ...
];
```

#### Features:
- Newsletter signup form
- 4 link columns
- Social media links
- Copyright & accessibility notice
- Responsive grid layout

---

### 9. Header/Navigation

**File:** `components/landing/Header.tsx`

#### Features:
- Fixed position on scroll
- Mobile hamburger menu
- Smooth transitions
- Active scroll state
- Responsive nav links

#### Customization:
```typescript
// Add navigation links
const navLinks = [
  { label: 'Features', href: '#features' },
  // ...
];
```

---

### 10. Reusable Components

#### Accordion Component

**File:** `components/landing/Accordion.tsx`

```typescript
interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: string | React.ReactNode;
  }>;
  allowMultiple?: boolean;
}

<Accordion items={faqItems} allowMultiple={false} />
```

#### Carousel Component

**File:** `components/landing/Carousel.tsx`

```typescript
interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  onSlideChange?: (index: number) => void;
}

<Carousel autoPlay={true} autoPlayInterval={5000}>
  {items.map(item => <div key={item.id}>{item}</div>)}
</Carousel>
```

---

## Animation Utilities

### Animation Hooks

**File:** `lib/animations.ts`

#### useInView Hook
Triggers animations when element enters viewport:

```typescript
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref);

<div 
  ref={ref}
  className={isInView ? 'opacity-100' : 'opacity-0'}
>
  Content
</div>
```

#### usePrefersReducedMotion Hook
Respects user's motion preferences:

```typescript
const prefersReduced = usePrefersReducedMotion();

<div className={prefersReduced ? 'transition-none' : 'transition-all'}>
  Content
</div>
```

---

## Color Customization

### Update Design System Colors

Edit `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    primary: '#596778',      // Slate Blue
    secondary: '#8691A6',    // Slate Gray
    accent: '#10B981',       // Brand Green
  },
}
```

### Update in Components

Replace color values throughout:

```typescript
// Old
className='bg-[#596778]'

// New
className='bg-primary'
```

---

## Typography Customization

### Font Configuration

In `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
```

### Update Font Sizes

In component:

```typescript
// Tailwind responsive sizes
<h1 className='text-3xl md:text-4xl lg:text-5xl'>Headline</h1>
<p className='text-base md:text-lg'>Body text</p>
```

---

## Responsive Design

### Breakpoints Used

- **Mobile:** 0-639px (default)
- **Tablet:** 640px-1023px (md:)
- **Desktop:** 1024px-1279px (lg:)
- **Large:** 1280px+ (xl:)

### Mobile-First Approach

All components are built mobile-first:

```typescript
// Mobile (default)
<div className='text-lg pt-4 px-4'>

// Tablet and up
<div className='md:text-xl md:pt-6 md:px-6'>

// Desktop and up
<div className='lg:text-2xl lg:pt-8 lg:px-8'>
```

---

## Performance Optimization

### Code Splitting

All components are dynamically imported in production:

```typescript
'use client' // Client component boundary
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/invoice-mockup.png"
  alt="Invoice preview"
  width={500}
  height={400}
  loading="lazy"
/>
```

### CSS Optimization

Tailwind CSS automatically removes unused styles in production.

---

## Accessibility Features

### ARIA Labels
All interactive elements have proper ARIA attributes:

```typescript
<button aria-label="Open menu">...</button>
<div aria-expanded={isOpen}>...</div>
```

### Keyboard Navigation

- Tab through all focusable elements
- Enter/Space to activate buttons
- Arrow keys in carousels and accordions

### Color Contrast

All colors meet WCAG 2.1 AA standards (4.5:1 minimum).

### Motion Preferences

Respects `prefers-reduced-motion` media query:

```typescript
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## Customization Examples

### Example 1: Change Primary Color

```typescript
// In tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',
      },
    },
  },
}

// In components, replace:
className='bg-[#596778]' => className='bg-primary'
className='text-[#596778]' => className='text-primary'
```

### Example 2: Add More Features

```typescript
// In components/landing/Features.tsx
const features: Feature[] = [
  // ... existing features
  {
    id: 'new-feature',
    icon: <YourIcon className='w-8 h-8 md:w-10 md:h-10' />,
    title: 'New Feature',
    description: 'Feature description',
    color: '#YOUR_COLOR',
  },
];
```

### Example 3: Customize CTA Behavior

```typescript
// In app/landing/page.tsx
const handleGetStarted = () => {
  // Open modal
  openSignUpModal();
  
  // Or track event
  trackEvent('cta_clicked', { location: 'hero' });
  
  // Or navigate
  router.push('/register?plan=pro');
};

<Hero onGetStarted={handleGetStarted} />
```

### Example 4: Add Analytics

```typescript
// In components/landing/Hero.tsx
const handleGetStarted = () => {
  // Track with your analytics provider
  analytics.track('signup_clicked', {
    source: 'hero',
    timestamp: new Date(),
  });
  
  onGetStarted?.();
};
```

---

## SEO Optimization

### Meta Tags

Update `app/landing/layout.tsx`:

```typescript
export const metadata = {
  title: 'InvoiceFlow - Modern Invoicing for Businesses',
  description: 'Create, send, and track invoices in seconds. Get paid faster with InvoiceFlow\'s modern invoicing platform.',
  keywords: ['invoicing', 'billing', 'payment tracking', 'SaaS'],
};
```

### Structured Data

Add JSON-LD for rich snippets:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'InvoiceFlow',
      // ... more fields
    }),
  }}
/>
```

---

## Testing

### Component Testing

Test individual components:

```typescript
import { render, screen } from '@testing-library/react';
import Hero from '@/components/landing/Hero';

test('Hero renders with CTA button', () => {
  render(<Hero />);
  expect(screen.getByText('Get Started Free')).toBeInTheDocument();
});
```

### E2E Testing

Test full page flow (already configured with Playwright):

```typescript
import { test, expect } from '@playwright/test';

test('Landing page loads and CTA works', async ({ page }) => {
  await page.goto('/landing');
  await expect(page).toHaveTitle(/InvoiceFlow/);
  
  const cta = page.getByRole('button', { name: 'Get Started' });
  await cta.click();
  await expect(page).toHaveURL(/\/register/);
});
```

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

---

## Common Issues & Solutions

### Issue 1: Animations Not Showing

**Solution:** Make sure `useInView` ref is attached:

```typescript
const ref = useRef<HTMLDivElement>(null);
<div ref={ref}>Content</div>
```

### Issue 2: Colors Not Applying

**Solution:** Tailwind content configuration in `tailwind.config.ts`:

```typescript
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
],
```

### Issue 3: Carousel Not Auto-Playing

**Solution:** Check `autoPlay` and `autoPlayInterval` props:

```typescript
<Carousel autoPlay={true} autoPlayInterval={5000}>
  {children}
</Carousel>
```

---

## Deployment Checklist

- [ ] Update meta tags and SEO
- [ ] Replace placeholder testimonials
- [ ] Update statistics numbers
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Optimize images
- [ ] Add analytics tracking
- [ ] Set up error tracking
- [ ] Configure email notifications
- [ ] Test form submissions

---

## File Structure Summary

```
components/landing/
├── Accordion.tsx        # Reusable accordion
├── Carousel.tsx         # Reusable carousel
├── Header.tsx           # Fixed header
├── Hero.tsx             # Hero section
├── Features.tsx         # Features grid
├── HowItWorks.tsx       # 3-step process
├── Statistics.tsx       # Key metrics
├── Testimonials.tsx     # Testimonials carousel
├── FAQ.tsx              # FAQ accordion
├── FinalCTA.tsx         # Final CTA
└── Footer.tsx           # Footer

app/landing/
└── page.tsx             # Landing page

lib/
└── animations.ts        # Animation utilities
```

---

## Next Steps

1. **Customize Content:** Update all text, colors, and features
2. **Connect Backend:** Integrate with your API
3. **Set Up Analytics:** Add tracking events
4. **Configure Email:** Set up email notifications
5. **Deploy:** Push to production
6. **Monitor:** Track conversion metrics

---

For questions or support, refer to the `DESIGN_SPEC.md` file for detailed design specifications.
