# Halloween Theme Documentation

## Overview

This Halloween theme implementation provides a complete visual overhaul of the website with:
- Black background with orange accents
- Animated Halloween decorations (bats, pumpkins, ghosts, spider webs)
- Hackathon promotional banner with gold shimmer animation
- Environment-based theme switching for easy enable/disable

## Quick Start

### Enabling the Halloween Theme

1. Create or update your `.env.local` file in the project root:
```bash
NEXT_PUBLIC_HALLOWEEN_THEME=true
NEXT_PUBLIC_SHOW_HACKATHON=true
```

2. Restart your development server:
```bash
npm run dev
# or
pnpm dev
```

3. The Halloween theme will now be active!

### Disabling the Halloween Theme

Simply set the environment variable to `false` in `.env.local`:
```bash
NEXT_PUBLIC_HALLOWEEN_THEME=false
NEXT_PUBLIC_SHOW_HACKATHON=false
```

Then restart your development server.

## Features

### 1. Halloween Color Scheme
- **Background**: `#0a0a0a` (near black) with orange mesh pattern
- **Primary Text**: `#ffffff` (white)
- **Accent Text**: `#ff8c42` (bright orange)
- **Cards**: `#1a1a1a` (dark gray) with orange borders
- **Buttons**: Orange background with white hover effects

### 2. Halloween Decorations

Scattered throughout the site:
- **Bats** (6): Animated, float up 10px on hover
- **Pumpkins** (3): Rotate slightly on hover
- **Ghosts** (2): Slow floating animation
- **Spider Webs** (2): Static, in top corners

**Note**: Decorations are hidden on mobile devices for better performance.

### 3. Hackathon Promo Component

Features:
- Prominent gold gradient border with shimmer animation
- Pulsing scale effect (1.0 → 1.02 → 1.0)
- Glow shadow effects
- Positioned prominently above the Join Card
- Fully responsive design

### 4. Calendar Theme

The calendar automatically switches to Halloween theme with:
- Dark background
- Orange event indicators
- Orange navigation buttons
- Orange hover effects
- Glowing today indicator

## File Structure

```
app/
  ├── theme-config.ts              # Theme configuration exports
  ├── globals.css                  # CSS variables for both themes
  ├── layout.tsx                   # Applies halloween-theme class
  ├── components/
  │   ├── HackathonPromo.tsx       # Hackathon promotional component
  │   ├── HalloweenDecorations.tsx # Halloween decorations component
  │   ├── Header.tsx               # Updated with theme variables
  │   ├── Footer.tsx               # Updated with theme variables
  │   ├── JoinCard.tsx             # Updated with theme variables
  │   └── calendar/
  │       ├── calendar.module.css  # Halloween calendar styles
  │       └── EventModal.tsx       # Updated with theme variables
  └── (pages)/                     # All pages updated with decorations

public/
  └── halloween/
      ├── bat.svg                  # Bat silhouette
      ├── pumpkin.svg              # Jack-o-lantern
      ├── ghost.svg                # Ghost shape
      └── spider-web.svg           # Web pattern
```

## CSS Variables

The theme uses CSS variables for easy switching:

### Default Theme
```css
--theme-bg: #cc785c
--theme-text-primary: #ffffff
--theme-text-accent: #f4f3ee
--theme-card-bg: #faf7f2
--theme-button-bg: #ffffff
--theme-button-text: #cc785c
```

### Halloween Theme
```css
--theme-bg: #0a0a0a
--theme-text-primary: #ffffff
--theme-text-accent: #ff8c42
--theme-card-bg: #1a1a1a
--theme-button-bg: #ff8c42
--theme-button-text: #000000
```

## Components

### HalloweenDecorations
Renders all Halloween decorative elements with animations.
- Returns `null` if Halloween theme is disabled
- Fixed positioning, doesn't interfere with content
- Uses SVG images from `/public/halloween/`

### HackathonPromo
Promotional banner for hackathon events.
- Conditionally rendered based on `NEXT_PUBLIC_SHOW_HACKATHON`
- Gold shimmer animation on border
- Pulse scaling animation
- Fully responsive (stacks on mobile)

## Animations

### Shimmer Effect
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

### Pulse Scale
```css
@keyframes pulse-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

### Floating Ghost
```css
@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

## Best Practices

### Switching Themes
1. Always restart the dev server after changing environment variables
2. For production, set environment variables in your hosting platform (Vercel, etc.)
3. Test both themes before deploying

### Performance
- Halloween decorations are disabled on mobile (< 768px)
- SVGs are optimized and monochrome
- Animations use CSS transforms for better performance
- No additional JavaScript dependencies required

### Maintenance
- To update colors, modify CSS variables in `globals.css`
- To add/remove decorations, edit `HalloweenDecorations.tsx`
- SVG assets in `/public/halloween/` can be replaced with your own

## Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_HALLOWEEN_THEME` = `true`
   - `NEXT_PUBLIC_SHOW_HACKATHON` = `true`
3. Redeploy your application

### Other Platforms
Set the environment variables in your platform's configuration:
- Netlify: Site Settings → Environment Variables
- AWS Amplify: App Settings → Environment Variables
- Railway: Variables tab in your project

## Troubleshooting

**Theme not changing?**
- Ensure you've restarted the development server
- Check that `.env.local` exists in project root
- Verify environment variable syntax (no spaces around `=`)

**Decorations not showing?**
- Check browser console for errors
- Verify SVG files exist in `/public/halloween/`
- Ensure `NEXT_PUBLIC_HALLOWEEN_THEME=true`

**Hackathon promo not visible?**
- Verify `NEXT_PUBLIC_SHOW_HACKATHON=true`
- Check that the component is imported in `page.tsx`

## Reverting to Default Theme

Simply set both environment variables to `false`:
```bash
NEXT_PUBLIC_HALLOWEEN_THEME=false
NEXT_PUBLIC_SHOW_HACKATHON=false
```

No code changes needed! The entire theme system is environment-driven.

## Future Enhancements

Potential additions:
- More decoration types (skulls, ravens, tombstones)
- Sound effects (optional, user-controlled)
- Additional color scheme variants
- Seasonal themes (Christmas, Easter, etc.) using same system
- Time-based automatic enabling (Oct 20-31)

## Support

For issues or questions:
1. Check this documentation
2. Review the code in theme-related files
3. Contact the development team

