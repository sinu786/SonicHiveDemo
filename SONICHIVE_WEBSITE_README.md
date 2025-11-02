# SonicHive Website - Complete Redesign with 3D Configurators

## 🎉 Overview

This is a complete redesign of the SonicHive website featuring interactive 3D configurators for all soundproof pod models. The website now includes:

- **Modern Homepage** with hero section, product grid, features, and CTA
- **Product Configurator** with 3D viewer for each pod model
- **About Page** with company story, values, and achievements
- **Contact Page** with inquiry form and location information
- **Responsive Navigation** with mobile menu support
- **Professional Footer** with links and contact info

## 🏗️ Website Structure

### Pages

1. **Home Page** (`HomePage.tsx`)
   - Hero section with main CTA
   - Product grid showcasing all 5 pod models
   - Features section highlighting SonicHive advantages
   - Final CTA section

2. **Product Configurator** (`ProductConfigurator.tsx`)
   - Full 3D viewer with Three.js integration
   - Product specifications and pricing
   - Customization options (colors, finishes, add-ons)
   - AR view capability
   - Request quote button

3. **About Page** (`AboutPage.tsx`)
   - Company story and mission
   - Core values with icons
   - Achievement statistics
   - Call to action

4. **Contact Page** (`ContactPage.tsx`)
   - Contact form with validation
   - Company information and locations
   - Social media links
   - Benefits list

### Components

- **Navigation** (`Navigation.tsx`) - Sticky header with mobile menu
- **App** (`App.tsx`) - Main routing logic and footer

## 🎨 Design System

### Brand Colors
- **Primary**: `#2d3d4d` - Deep blue-grey
- **Secondary**: `#4a5a6a` - Medium blue-grey
- **Accent**: `#6a7a8a` - Light blue-grey
- **Gold**: `#ffd2aa` - Warm gold accent
- **Background**: `#0b0f17` - Dark slate

### Typography
- System font stack for best performance
- Responsive font sizes using `clamp()`
- Clear hierarchy with headings and body text

### Spacing
- Consistent spacing scale (8px, 16px, 24px, 32px, 48px, 64px)
- Responsive padding and margins

## 🚀 Features

### 3D Product Configurator
- Interactive 3D model viewer powered by Three.js
- Orbit controls (drag to rotate, pinch to zoom)
- AR viewing capability
- Real-time customization options:
  - Exterior color selection
  - Interior finish choices
  - Add-on packages
- Placeholder model (bed.glb) used for all products currently

### Product Models
1. **Solo Silence Booth** - 1 person capacity
2. **Duo Silence Booth** - 2 person capacity
3. **Quartet Silence Booth** - 4 person capacity
4. **Hexa Silence Booth** - 6 person capacity
5. **Home Pod** - Remote work solution

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px, 900px, 1000px, 1200px
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly controls

### Performance Optimizations
- Code splitting ready
- Optimized CSS with variables
- Lazy loading capabilities
- Smooth animations with GPU acceleration

## 📱 Navigation System

State-based routing system (no external router dependency):
- Simple page state management
- Smooth scroll-to-top on navigation
- Product ID passing for configurator
- Back button functionality

## 🎯 Key Interactions

### Homepage
- "Explore Products" → Products section (scrolls)
- "Get A Quote" → Contact page
- Product cards "Configure & View in 3D" → Product configurator

### Product Configurator
- Back button → Home page
- Color selection → Visual feedback with active state
- "Request Quote" → Contact page
- "View in AR" → AR viewer (if supported)

### Contact Form
- Form validation
- All fields required
- Location dropdown
- Submit success alert

## 🔧 Technical Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **Vite** - Build tool
- **CSS3** - Styling with custom properties

## 📦 Project Structure

```
src/
├── ui/
│   ├── App.tsx              # Main app with routing & footer
│   ├── HomePage.tsx          # Homepage with hero & products
│   ├── ProductConfigurator.tsx  # 3D configurator page
│   ├── AboutPage.tsx         # About company page
│   ├── ContactPage.tsx       # Contact form page
│   ├── Navigation.tsx        # Header navigation
│   └── app.css              # All website styles
├── viewer.ts                # Three.js 3D viewer engine
└── main.tsx                 # App entry point
```

## 🎨 Customization Options

### Color Schemes
Currently configured colors in CSS variables (`:root`):
- Change `--brand-primary`, `--brand-secondary`, `--brand-accent`
- Modify `--brand-gold` for CTA buttons
- Adjust text colors with `--text-primary`, `--text-secondary`

### Adding New Products
1. Update `products` array in `HomePage.tsx`
2. Add product data to `productData` in `ProductConfigurator.tsx`
3. Update footer product links in `App.tsx`

### Replacing Placeholder Models
Replace `/public/assets/bed.glb` with actual pod models:
- Name them: `solo.glb`, `duo.glb`, `quartet.glb`, `hexa.glb`, `home.glb`
- Update `modelUrl` prop in `ProductConfigurator.tsx`

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- Color contrast WCAG AA compliant

## 📱 Mobile Experience

- Touch-friendly 44px minimum tap targets
- Mobile menu with full-screen overlay
- Simplified layouts for small screens
- Optimized 3D viewer for mobile performance
- Pinch-to-zoom in configurator

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Visit: http://localhost:5173

### Build
```bash
npm run build
```
Output: `dist/` folder

### Preview Build
```bash
npm run preview
```

## 🔄 Next Steps

### Immediate Improvements
1. Replace placeholder 3D models with actual pod models
2. Add real product images
3. Implement actual form submission endpoint
4. Add pricing information
5. Set up analytics

### Future Enhancements
1. CMS integration for content management
2. Multi-language support (Arabic, English)
3. Real-time customization preview
4. 360° product photography
5. Customer testimonials section
6. Blog integration
7. Live chat support
8. Product comparison tool
9. Financing calculator
10. Installation gallery

## 📞 SonicHive Contact Information

- **Phone**: +971 58 555 0099
- **Email**: Info@thesonichive.com
- **Locations**: UAE • Qatar • Saudi Arabia • New Zealand

## 📝 Notes

- All 3D models currently use `bed.glb` as placeholder
- Contact form doesn't submit to backend (shows alert)
- Social media links are placeholder `#` links
- AR functionality requires WebXR support
- Build warnings about chunk size are expected (Three.js is large)

## 🎉 What's New

✅ Complete website redesign with modern UI  
✅ 5 product pages with 3D configurators  
✅ Responsive navigation with mobile menu  
✅ Professional homepage with hero section  
✅ Product grid with feature highlights  
✅ About page with company story  
✅ Contact form with validation  
✅ Footer with comprehensive links  
✅ State-based routing system  
✅ Mobile-optimized experience  
✅ AR viewing capability  
✅ Customization options (colors, finishes, add-ons)  

---

Built with ❤️ for SonicHive - Premium Soundproof Solutions


