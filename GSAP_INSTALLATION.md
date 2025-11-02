# GSAP Animation Installation Guide

## 🎬 Install GSAP

Run one of these commands to install GSAP:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

The `package.json` has already been updated with GSAP v3.12.5.

## ✨ Animations Implemented

### 1. **Hero Section Animations**
- Label fades in from top with bounce
- Title slides up with smooth easing
- Description fades in with delay
- CTA buttons pop in with elastic effect
- Stats counter with elastic bounce

### 2. **Scroll-Triggered Animations**
- **Product Cards**: Fade in from bottom with scale effect
- **Feature Cards**: 3D rotation reveal on scroll
- **Section Titles**: Slide up fade effect
- **Images**: Parallax scrolling for depth
- **Paragraphs**: Subtle fade-in as they enter viewport

### 3. **Interactive Button Animations**
- **Hover**: Scale up with back-easing
- **Click**: Squeeze and bounce back with elastic
- **Magnetic Effect**: Primary CTAs follow cursor
- All transitions use smooth cubic-bezier

### 4. **Number Counter Animation**
- Stats animate from 0 to their value
- Respects suffixes (dB, %, +)
- Smooth counting with power easing
- Triggers on scroll into view

### 5. **Image Parallax**
- Product images move slower than scroll
- Creates depth perception
- Smooth scrubbing with ScrollTrigger

## 🎯 GSAP Features Used

- **gsap.from()** - Initial state animations
- **gsap.to()** - Target state animations
- **ScrollTrigger** - Scroll-based animations
- **TextPlugin** - Number counting
- **Stagger** - Sequential animations
- **Context** - Cleanup and organization
- **Timeline** - Coordinated sequences

## 🎨 Easing Functions Used

- `power3.out` - Smooth deceleration
- `back.out(1.7)` - Overshoot effect
- `elastic.out(1, 0.5)` - Bouncy effect
- `power2.inOut` - Smooth acceleration/deceleration

## 🚀 Performance Optimizations

1. **will-change** properties added for GPU acceleration
2. **backface-visibility: hidden** prevents flickering
3. **transform-style: preserve-3d** for 3D transforms
4. **Context API** for proper cleanup
5. **Lazy loading** with scroll triggers

## 🎬 Animation Timeline

| Time | Animation |
|------|-----------|
| 0.2s | Hero label appears |
| 0.4s | Hero title slides up |
| 0.7s | Description fades in |
| 1.0s | CTA buttons pop in |
| 1.2s | Stats animate |
| On Scroll | Product cards, features, images |

## 🔧 Troubleshooting

If animations don't work:

1. **Check GSAP Installation**:
   ```bash
   ls node_modules/gsap
   ```

2. **Clear Cache**:
   ```bash
   rm -rf node_modules .pnpm-store
   pnpm install
   ```

3. **Restart Dev Server**:
   ```bash
   pnpm run dev
   ```

## 📝 Customization

All animations are in `Tier3Demo.tsx` in separate useEffect hooks:

- **Hero animations**: Lines 81-129
- **Scroll animations**: Lines 132-215  
- **Button interactions**: Lines 218-263
- **Number counters**: Lines 266-293
- **Magnetic CTAs**: Lines 296-330

## 🎨 CSS Enhancements

Added to `tier3.css`:

- GPU acceleration properties
- 3D transform optimization
- Smooth transition utilities
- Performance hints

---

**Total Animation Count**: 50+ individual animations
**Performance Impact**: Minimal (GPU-accelerated)
**Browser Support**: All modern browsers

