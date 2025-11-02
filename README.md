# VULF Interactive

Premium 3D Product Configurators & WebXR Experiences

## 🚀 About

VULF Interactive delivers ultra-tier interactive web experiences featuring:

- **Advanced 3D Product Visualization** - Three.js powered WebGL rendering
- **WebXR & AR Integration** - USDZ (iOS) and WebXR (Android) support
- **Premium UI/UX Design** - Glassmorphism, parallax, and GSAP animations
- **Performance Optimized** - Mobile-first, responsive, production-ready

## 📦 Tech Stack

- **React 18** + TypeScript
- **Three.js** - 3D rendering and WebGL
- **GSAP** - Advanced animations
- **Vite** - Lightning-fast build tool
- **pnpm** - Fast, disk space efficient package manager

## 🎯 Demo Project: SonicHive

This repository showcases an Ultra-tier implementation for SonicHive's soundproof pods, featuring:

- ✅ Immersive 3D viewer with orbit controls
- ✅ Multiple product variants (Solo, Duo, Quartet, Hexa, Home Pod)
- ✅ Blueprint view with dimensions
- ✅ AR-ready (WebXR + USDZ)
- ✅ Glassmorphism UI with smooth animations
- ✅ Parallax scrolling effects
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Production-ready build

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📱 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure build settings:
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`

### Environment Variables

No environment variables required for basic deployment.

## 📂 Project Structure

```
vulf-interactive/
├── src/
│   ├── ui/
│   │   ├── App.tsx              # Main app component
│   │   ├── LandingPage.tsx      # Landing/SOW page
│   │   ├── Tier3Demo.tsx        # Ultra demo showcase
│   │   ├── landing.css          # Landing styles
│   │   ├── tier3.css            # Demo styles
│   │   └── sonicHiveData.ts     # Product data
│   ├── viewer.ts                # Three.js 3D viewer
│   ├── main.tsx                 # App entry point
│   └── types/                   # TypeScript definitions
├── public/
│   ├── assets/
│   │   ├── main/                # Branding (logo, video)
│   │   ├── images/              # Product images
│   │   └── *.glb                # 3D models
│   └── draco/                   # DRACO compression
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Features Implemented

### Ultra Tier Capabilities:
- **Advanced 3D Rendering** - Optimized Three.js setup with custom lighting
- **Color Grading** - Material-level post-processing for vibrant textures
- **GSAP Animations** - Scroll-triggered, parallax, and interactive effects
- **Glassmorphism UI** - Modern, premium design aesthetic
- **Product Switching** - Multi-variant 3D model loading
- **Blueprint Mode** - Technical dimension overlay
- **AR Integration** - WebXR ready with reticle positioning
- **Responsive Design** - Optimized for all devices

## 📄 License

© 2025 VULF Interactive. All rights reserved.

## 📧 Contact

**VULF Interactive**  
Premium 3D & WebXR Development  
[Website](https://vulfinteractive.com) | [Demo](/)

---

*Built with ❤️ by VULF Interactive*
