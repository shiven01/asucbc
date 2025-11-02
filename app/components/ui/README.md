# UI Component Library

A comprehensive suite of standardized, animated UI components built with React, TypeScript, and Framer Motion. All components are designed to match the site's color scheme with support for both light and dark modes.

## Features

- **Consistent Design**: All components follow the same design language and color scheme
- **Subtle Animations**: Built-in animations using Framer Motion for enhanced user experience
- **Fully Responsive**: Mobile-first design with adaptive padding, font sizes, and spacing
- **Touch-Friendly**: Minimum 44px touch targets on mobile, optimized for all screen sizes
- **Accessible**: Semantic HTML with ARIA labels where appropriate
- **Type-Safe**: Full TypeScript support with exported prop types
- **Dark Mode**: Automatic support for light/dark themes via CSS variables

## Installation

All components are already installed. Simply import what you need:

```tsx
import { Button, Heading, Card, Input } from "@/app/components/ui";
```

## Components

### Button

Versatile button component with multiple variants and sizes.

**Variants**: `primary`, `secondary`, `ghost`, `outline`
**Sizes**: `sm`, `md`, `lg`

```tsx
<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="secondary" fullWidth>
  Full Width Button
</Button>

<Button variant="ghost" disabled>
  Disabled Button
</Button>
```

### Typography

**Heading** - Responsive heading component with 6 levels

```tsx
<Heading level="h1" gradient>
  Welcome to Our Site
</Heading>

<Heading level="h2" animate={false}>
  No Animation Heading
</Heading>
```

**Text** - Paragraph text with size and variant options

```tsx
<Text size="lg" variant="primary">
  This is primary text
</Text>

<Text size="sm" variant="secondary" animate>
  Animated secondary text
</Text>
```

**Label** - Form labels with required indicator

```tsx
<Label htmlFor="email" required>
  Email Address
</Label>
```

### Input & Textarea

Form input components with focus animations and error states.

```tsx
<Input
  type="email"
  placeholder="Enter your email"
  fullWidth
  error="Invalid email address"
/>

<Textarea
  placeholder="Your message"
  fullWidth
  rows={5}
/>
```

### Card

Container component with optional gradient and hover effects.

```tsx
<Card hoverable gradient animated>
  <Heading level="h3">Card Title</Heading>
  <Text>Card content goes here</Text>
</Card>
```

### Container

Responsive container with max-width constraints.

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

```tsx
<Container size="lg" center animate>
  <Heading level="h2">Page Content</Heading>
</Container>
```

### Badge

Small status indicators with multiple variants.

**Variants**: `primary`, `secondary`, `accent`, `success`, `warning`, `error`
**Sizes**: `sm`, `md`, `lg`

```tsx
<Badge variant="success" size="sm">
  Active
</Badge>

<Badge variant="accent">
  New
</Badge>
```

### Tag

Removable tag component for filters and selections.

**Variants**: `primary`, `secondary`, `outline`

```tsx
<Tag variant="primary" removable onRemove={() => console.log('removed')}>
  React
</Tag>

<Tag variant="outline">
  TypeScript
</Tag>
```

### Link

Enhanced Next.js Link with animations and external link support.

**Variants**: `default`, `accent`, `underline`

```tsx
<Link href="/about" variant="accent">
  About Us
</Link>

<Link href="https://example.com" external>
  External Link
</Link>
```

### Divider

Horizontal or vertical divider with optional label.

**Orientations**: `horizontal`, `vertical`
**Variants**: `solid`, `dashed`, `gradient`

```tsx
<Divider variant="gradient" />

<Divider label="OR" variant="solid" />

<Divider orientation="vertical" />
```

### Skeleton

Loading skeleton for content placeholders.

**Variants**: `text`, `circular`, `rectangular`

```tsx
<Skeleton variant="text" width="80%" />

<Skeleton variant="circular" width={40} height={40} />

<Skeleton variant="rectangular" height={200} />
```

## Animation Details

All components use subtle, spring-based animations:

- **Hover Effects**: Scale (1.02-1.05) and lift (y: -2 to -4px)
- **Tap Effects**: Scale down (0.95-0.98)
- **Enter Animations**: Fade in with slight upward movement
- **Spring Config**: Stiffness 100-400, Damping 12-20

## Color System

Components automatically use CSS variables defined in `globals.css`:

- `--theme-text-primary`: Primary text color
- `--theme-text-accent`: Accent color (coral/terracotta)
- `--theme-button-bg`: Primary button background
- `--theme-card-bg`: Card backgrounds
- `--theme-card-border`: Borders and dividers

All colors automatically adapt to light/dark mode via `[data-theme="dark"]` attribute.

## Customization

All components accept a `className` prop for additional styling:

```tsx
<Button className="my-4 shadow-xl">
  Custom Styled Button
</Button>
```

## Responsive Design

All components are fully responsive with adaptive spacing:

**Breakpoints:**
- **Mobile** (`< 640px`): Reduced padding, smaller fonts, compact spacing
- **Tablet** (`640px - 1024px`): Medium padding and spacing
- **Desktop** (`> 1024px`): Full padding and spacing

**Responsive Features:**
- Card padding: `16px → 20px → 24px`
- Input padding: `8px 12px → 12px 16px`
- Container padding: `12px → 16px → 24px → 32px`
- Typography: Fluid font scaling across all breakpoints
- Buttons: Maintain touch-friendly sizes on all screens

## Accessibility

- Minimum touch target size: 44-48px
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators

## Examples

See [ComponentShowcase.tsx](./examples/ComponentShowcase.tsx) for a complete example page showcasing all components.
