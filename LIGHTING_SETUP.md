# 🎬 Sonichive Professional Lighting Setup

## Overview
A complete 6-light studio rig designed specifically for the Sonichive acoustic booth with soft shadows and premium visual quality.

## Lighting Breakdown

### 1. **Ambient Light** (Base Fill)
- **Color:** Cool white (`0xf5f7fa`)
- **Intensity:** 0.4
- **Purpose:** Provides base illumination, prevents pure black shadows
- **Effect:** Soft, even environmental light

### 2. **Hemisphere Light** (Sky/Ground)
- **Sky Color:** White (`0xffffff`)
- **Ground Color:** Cool gray (`0xb8c5d6`)
- **Intensity:** 0.5
- **Purpose:** Natural gradient from top to bottom
- **Effect:** Realistic outdoor studio look

### 3. **Key Light** (Main Directional) ⭐
- **Color:** Warm white (`#fff9f0` → RGB 1.0, 0.98, 0.94)
- **Intensity:** 2.2
- **Position:** (3.5, 4, 4)
- **Casts Shadows:** Yes
- **Shadow Quality:** 
  - Resolution: 2048×2048
  - Type: VSM (WebGL2) or PCFSoft (fallback)
  - Radius: 3.5 (soft blur)
  - Bias: -0.00015
  - Normal Bias: 0.025
- **Purpose:** Primary light source, defines form and depth
- **Effect:** Soft, professional shadows with warm tone

### 4. **Fill Light** (Shadow Softener)
- **Color:** Cool blue (`#e3f0ff` → RGB 0.89, 0.94, 1.0)
- **Intensity:** 0.8
- **Position:** (-3, 2.5, 3)
- **Casts Shadows:** No
- **Purpose:** Lifts shadows, adds cool contrast to warm key
- **Effect:** Prevents harsh shadow falloff

### 5. **Rim/Back Light** (Edge Definition)
- **Color:** Neutral cool (`#ffffff` → RGB 0.95, 0.97, 1.0)
- **Intensity:** 1.4
- **Position:** (-2, 3, -4)
- **Casts Shadows:** No
- **Purpose:** Separates subject from background
- **Effect:** Edge highlights and depth perception

### 6. **Accent Light** (Top Highlight)
- **Color:** Warm cream (`#fff5e6`)
- **Intensity:** 0.9
- **Position:** (0, 6, 1)
- **Casts Shadows:** No
- **Purpose:** Premium top-down highlight
- **Effect:** Luxury product feel

## Shadow System

### Shadow Catcher (Ground Plane)
- **Type:** ShadowMaterial
- **Opacity:** 0.25
- **Color:** Dark blue-gray (`0x1a1a2e`)
- **Size:** 1.2× model radius
- **Purpose:** Receives soft shadows from the key light

### Ambient Occlusion Disc
- **Type:** Basic Material (dark)
- **Opacity:** 0.08
- **Size:** 0.6× model radius
- **Purpose:** Subtle contact shadow under model
- **Effect:** Grounds the model to the scene

## Color Grading & Tone Mapping

### ACES Filmic Settings
- **Exposure:** 1.15 (bright and punchy)
- **Lift:** [-0.02, -0.02, -0.02] (deeper blacks)
- **Gamma:** [0.98, 1.00, 1.02] (cool midtones)
- **Gain:** [1.05, 1.03, 1.08] (bright cool highlights)
- **Warmth:** 0.15 (slightly warm)
- **Saturation:** 1.08 (vibrant colors)
- **Vibrance:** 0.12 (protect saturated areas)
- **Contrast:** 1.08 (punchy definition)

## Background

### Gradient Sky Dome
- **Type:** Custom ShaderMaterial
- **Top Color:** Light cool gray (`0xf5f7fa`)
- **Bottom Color:** Medium gray (`0xe0e5eb`)
- **Transition:** Smooth gradient from y=-10 to y=15
- **Purpose:** Professional studio backdrop
- **Effect:** Clean, modern presentation

## Technical Details

### Shadow Map Configuration
- **Enabled:** True
- **Type:** VSM (Variance Shadow Maps) on WebGL2
- **Fallback:** PCFSoftShadowMap on WebGL1
- **Resolution:** 2048×2048 pixels
- **Camera Frustum:** 20×20 units
- **Near/Far:** 0.5 / 50 units

### Material Support
All custom materials (fabric, wood, metal, glass, foam) are optimized to work with this lighting:
- Proper metalness/roughness values
- Environment map reflections
- Shadow receiving/casting enabled
- PBR workflow compatible

## Visual Goals Achieved

✅ **Punchy & Visible:** High contrast with deep blacks and bright highlights  
✅ **Soft Shadows:** VSM shadows with 3.5 radius blur  
✅ **Professional Look:** 6-point studio lighting rig  
✅ **Material Definition:** Lights show off custom shader details  
✅ **Depth & Dimension:** Rim lighting and ambient occlusion  
✅ **Color Balance:** Warm key + cool fill for cinematic look  
✅ **Clean Presentation:** Gradient backdrop, no distractions  

## Performance Notes

- All lights are directional (no expensive point light attenuation)
- Single shadow-casting light (key only)
- Optimized shadow frustum bounds
- Efficient VSM blur instead of multiple PCF samples
- No real-time reflections (uses environment map)

---

**Result:** A stunning, production-ready lighting setup that makes the Sonichive acoustic booth look premium, visible, and professional! 🎨✨


