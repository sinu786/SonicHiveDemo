# SonicHive Interactive SOW Presentation

## 🎯 Overview
This is an **exclusive interactive presentation** designed to showcase SonicHive's 3D configurator offerings to clients. The website contains ONLY:
1. **Presentation** - Full-screen pitch deck
2. **Tier 1 Demo** - Live example of Basic Plan
3. **Tier 2 Demo** - Live example of Medium Plan
4. **Tier 3 Demo** - Live example of Ultra Plan

---

## 📁 Structure

```
/src/ui/
├── App.tsx                  # Main router (4 pages only)
├── PresentationPage.tsx     # Full-screen presentation
├── Tier1Demo.tsx            # Basic tier live demo
├── Tier2Demo.tsx            # Medium tier live demo
├── Tier3Demo.tsx            # Ultra tier live demo
├── app.css                  # Base styles + imports
├── presentation.css         # Presentation-specific styles
└── demos.css                # Tier demo pages styles
```

---

## 🎬 1. Presentation (Slide Deck)

### Features:
- **5 slides** with full-screen navigation
- **Slide 0:** Cover page with tier preview cards
- **Slide 1:** Tier 1 breakdown with mockups
- **Slide 2:** Tier 2 breakdown with configurator preview
- **Slide 3:** Tier 3 breakdown with advanced features
- **Slide 4:** Contact & payment milestones

### Navigation:
- **Arrow keys:** ← → to navigate
- **Dots (bottom):** Click to jump to any slide
- **Side arrows:** Click to go back/forward
- **Exit button (top-left):** Close presentation
- **Tier cards:** Click to jump directly to live demos

### Interactions:
- Smooth slide transitions
- Clickable tier preview cards on cover
- Direct links to tier demos
- Contact buttons on final slide

---

## 🥉 2. Tier 1 Demo (Basic Plan)

### What It Shows:
A **single-page website** with basic 3D viewer and AR integration.

### Features:
- Product selector (3 pod models)
- 3D viewer with loading state
- "View in AR" button
- "Product Info" button
- Product info card with specs
- Get Quote CTA button

### Technical Implementation:
- Single page layout
- Basic 3D viewer initialization
- Product switching
- Static product information
- Simple CTA

### Demonstrates:
✓ Landing page with 3D viewer  
✓ Product selector  
✓ AR Quick Look integration  
✓ Basic UI with product info  
✓ Responsive design  

---

## 🥈 3. Tier 2 Demo (Medium Plan)

### What It Shows:
A **multi-page website** with interactive configurator.

### Pages:
1. **Home Page:** Feature cards with "Start Configuring" CTA
2. **Configurator Page:** Full 3D configurator with controls

### Features:
- Multi-page navigation
- Feature showcase cards
- **Interactive configurator:**
  - Color selection (4 colors)
  - Material options (3 materials)
  - Lighting modes (3 presets)
  - Add-ons with checkboxes
- Info overlay showing selected options
- Get Quote & View in AR buttons

### Technical Implementation:
- Page state management
- 3D viewer with enhanced settings (bloom enabled)
- Control panels with active states
- Real-time selection display
- Add-on checkboxes

### Demonstrates:
✓ Multi-page architecture  
✓ 3D configurator for color/material  
✓ Product-specific pages with animations  
✓ Interactive lighting presets  
✓ Enhanced AR viewing  

---

## 🥇 4. Tier 3 Demo (Ultra Plan)

### What It Shows:
An **immersive advanced configurator** with multiple view modes.

### View Modes:
1. **Design Mode:** 3D viewer with animated info overlays
2. **Blueprint Mode:** Technical specifications overlay
3. **AR Preview Mode:** QR code and mobile instructions

### Features:
- **Top bar navigation** with 3 view mode tabs
- **Design Mode:**
  - 3D viewer with high-quality settings
  - Animated information overlays (acoustic, dimensions, capacity)
  - Camera controls (reset, top view, side view, animations)
- **Blueprint Mode:**
  - Blueprint grid overlay
  - Technical measurements
  - Specification legend
- **AR Mode:**
  - QR code placeholder
  - Mobile instructions
  - "Open on Mobile" CTA
- **Advanced Controls Panel:**
  - Color selection with live preview
  - Material library with visual swatches
  - Lighting intensity slider
  - Premium add-ons with icons
  - Real-time price calculator
  - Multiple CTAs (Quote, Download PDF, Save Config)

### Technical Implementation:
- View mode state management
- Advanced 3D viewer settings (4K shadows, tone mapping)
- Animated overlays with staggered delays
- Blueprint grid and measurements
- Material library visualization
- Price calculator logic
- Multi-button actions

### Demonstrates:
✓ Fully dynamic animations  
✓ Advanced configurator (color + blueprints)  
✓ Animated information overlays  
✓ Interactive storytelling flow  
✓ Advanced AR with blueprint overlay  
✓ Material library  
✓ Real-time pricing  
✓ Export/save configurations  

---

## 🎨 Design System

### Color Palette:
- **Primary:** `#ffffff` (White background)
- **Accent:** `#ff6b35` (SonicHive Orange)
- **Text Primary:** `#1d1d1f` (Dark charcoal)
- **Text Secondary:** `#6e6e73` (Medium grey)
- **Text Tertiary:** `#86868b` (Light grey)

### Gradients:
- **Primary Gradient:** `linear-gradient(135deg, #ff6b35, #ff8555)`
- **Glass:** `rgba(255, 255, 255, 0.7)` with backdrop blur

### Typography:
- **Titles:** 40-64px, Bold (700)
- **Subtitles:** 18-24px, Regular (400)
- **Body:** 14-17px, Medium (500)

### Spacing:
- **Section padding:** 40-80px
- **Card padding:** 32-40px
- **Control groups:** 28-32px

---

## 🔧 Technical Stack

### Frontend:
- **React** - Component framework
- **TypeScript** - Type safety
- **Three.js** - 3D rendering
- **Vite** - Build tool

### 3D Pipeline:
- **Viewer Module** (`src/viewer.ts`)
- **GLB Models** - Compressed 3D assets
- **USDZ** - AR format for iOS
- **Draco Compression** - Optimized loading

### Styling:
- **Pure CSS** - No frameworks
- **CSS Variables** - Theme system
- **CSS Grid & Flexbox** - Layouts
- **Backdrop Filters** - Glass effects
- **CSS Animations** - Transitions

---

## 📱 Responsive Design

### Breakpoints:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

### Adaptations:
- Single column layouts on mobile
- Stacked configurator panels
- Reduced padding/spacing
- Touch-friendly button sizes
- Simplified animations

---

## 🚀 Navigation Flow

```
Presentation (Cover)
  ↓
  ├─→ View Slide 1 (Tier 1 Info)
  ├─→ View Slide 2 (Tier 2 Info)
  ├─→ View Slide 3 (Tier 3 Info)
  ├─→ View Slide 4 (Contact)
  │
  └─→ Click Tier Preview Cards:
        ├─→ Tier 1 Demo (Live Example)
        ├─→ Tier 2 Demo (Live Example)
        └─→ Tier 3 Demo (Live Example)
              │
              └─→ Back to Presentation Button
```

---

## 💡 Key Differentiators

### Tier 1 vs Tier 2 vs Tier 3:

| Feature | Tier 1 | Tier 2 | Tier 3 |
|---------|--------|--------|--------|
| **Pages** | Single | Multi | Multi + Advanced |
| **3D Viewer** | Basic | Enhanced | Ultra (4K) |
| **Configurator** | None | Color/Material | Full + Blueprints |
| **View Modes** | 1 (Design) | 1 (Design) | 3 (Design/Blueprint/AR) |
| **Info Overlays** | ❌ | Static | Animated |
| **Add-ons** | ❌ | Basic | Premium Cards |
| **Pricing** | ❌ | ❌ | Real-time Calculator |
| **Animations** | Basic | Medium | Advanced |
| **AR** | Basic | Enhanced | Advanced with QR |

---

## 📊 Pricing

### Tier 1 - Basic Plan
**AED 50,000 - 70,000**  
Timeline: 6-8 Weeks

### Tier 2 - Medium Plan
**AED 90,000 - 120,000**  
Timeline: 8 Weeks

### Tier 3 - Ultra Plan
**AED 150,000 - 220,000**  
Timeline: 8-10 Weeks

---

## 💰 Payment Structure

1. **Kickoff:** 30% advance
2. **Mid Review:** 40% on prototype
3. **Final Delivery:** 30% on launch

---

## 🎓 Usage Instructions

### For Presentations:
1. Open `http://localhost:5173`
2. Navigate through slides using arrows or keyboard
3. Click tier preview cards to show live demos
4. Use as an interactive pitch during client meetings

### For Development:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### For Clients:
- Share the live URL
- Walk through presentation slides
- Click tier cards to show working examples
- Demonstrate the difference between tiers

---

## ✨ Future Enhancements (Not Included)

- E-commerce functionality
- Native mobile apps
- CMS integration
- User accounts
- Analytics dashboard
- Email automation
- Payment gateway
- Custom 3D model creation

---

## 📞 Contact

**Company:** VULF Interactive / Wesualize Studios  
**Founder:** Sinan Mohammed  
**Email:** hello@vulf.com

---

## 📄 License

© 2025 SonicHive. All rights reserved.

---

**Last Updated:** October 30, 2025


