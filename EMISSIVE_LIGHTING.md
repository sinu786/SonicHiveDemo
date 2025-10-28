# ✨ Emissive Material Lighting System

## Overview
A dynamic lighting system that automatically detects emissive materials in your 3D models and creates real point lights that cast shadows and illuminate the scene.

## How It Works

### Automatic Detection
The system scans all meshes in your loaded GLB/GLTF model and detects materials with:
- **Emissive color** (RGB values > 0.01)
- **Emissive maps** (texture-based emission)
- **Emissive intensity** > 0.1

### Dynamic Light Creation
For each emissive material found:

1. **Color Matching**: Point light color matches the material's emissive color
2. **Smart Intensity**: Calculated based on:
   - Material's `emissiveIntensity` value
   - Surface area of the mesh
   - Formula: `intensity = emissiveIntensity × min(surfaceArea × 0.5, 3) × 2`

3. **Shadow Casting**: Lights with intensity > 1.5 cast soft shadows:
   - Shadow map resolution: 512×512
   - Shadow radius: 2 (soft blur)
   - Shadow distance: 10 units
   - Optimized for performance

4. **Position Tracking**: Lights automatically follow their mesh during:
   - Animations
   - Exploded view transformations
   - Model rotations

## Technical Specifications

### Point Light Parameters
```typescript
{
  color: emissiveColor.getHex(),
  intensity: calculated (0.1 to ~6.0),
  distance: 10,        // falloff range
  decay: 2,            // physically accurate falloff
  castShadow: true     // if intensity > 1.5
}
```

### Shadow Configuration (Strong Emissive Lights)
```typescript
{
  mapSize: [512, 512],
  near: 0.1,
  far: 10,
  bias: -0.001,
  radius: 2            // soft shadow blur
}
```

## Performance Optimization

### Smart Intensity Capping
- Surface area capped at 3× multiplier
- Prevents over-bright lights from large emissive surfaces
- Maintains performance with multiple lights

### Selective Shadow Casting
- Only lights with intensity > 1.5 cast shadows
- Lower intensity lights skip shadows for performance
- 512×512 shadow maps (smaller than main key light's 2048×2048)

### Dynamic Updates
- Light positions update only when needed (during animations)
- Efficient bounding box calculations
- No redundant shadow map updates

## Usage Examples

### LED Strip Lights
```glsl
// In your 3D software (Blender, etc.)
Material "LED_Strip":
  Emissive Color: (1.0, 0.9, 0.8) // Warm white
  Emissive Intensity: 2.0
  
Result:
  → Creates warm white point light
  → Intensity: ~2.5 (calculated)
  → Casts soft shadows
  → Illuminates nearby surfaces
```

### Screen Displays
```glsl
Material "Screen":
  Emissive Color: (0.3, 0.5, 1.0) // Blue glow
  Emissive Intensity: 1.5
  Emissive Map: screen_texture.png
  
Result:
  → Creates blue-tinted light
  → Intensity: ~1.8
  → Casts shadows (>1.5 threshold)
  → Follows screen if animated
```

### Indicator Lights
```glsl
Material "Status_LED":
  Emissive Color: (0.0, 1.0, 0.0) // Green
  Emissive Intensity: 0.8
  
Result:
  → Creates green accent light
  → Intensity: ~0.5 (small surface)
  → No shadows (below threshold)
  → Subtle ambient illumination
```

## Console Logging

The system provides helpful debug information:
```
✨ Added emissive light: LED_Panel, intensity: 2.35
✨ Added emissive light: Screen_Display, intensity: 1.82
✨ Added emissive light: Power_Button, intensity: 0.45
💡 Total emissive lights created: 3
```

## Integration with Sonichive Booth

Perfect for:
- 🖥️ **Control Panel Displays**: Screen glows with realistic light
- 💡 **LED Indicators**: Status lights cast colored illumination
- 🎨 **Accent Lighting**: Under-desk or ceiling LED strips
- 🔘 **Interactive Elements**: Buttons and switches with glow
- 📱 **Digital Interfaces**: Touchscreens and monitors

## Enhanced Normal Maps

The system also improves normal map quality:

### Texture Optimization
- **Anisotropic filtering**: 16× for crisp detail
- **Mip-mapping**: LinearMipmapLinear for smooth LOD
- **Color space**: Proper sRGB/Linear handling

### Normal Intensity Boost
- All normal scales increased by 20%
- More pronounced surface detail
- Better depth perception
- Enhanced material realism

### Applies To All Textures
- Base color maps
- Normal maps
- Roughness maps
- Metalness maps
- AO maps
- Emissive maps

## Memory Management

### Cleanup on Model Unload
```typescript
// Automatic cleanup when loading new model or disposing viewer
emissiveLights.forEach(light => {
  light.parent.remove(light)
  light.dispose()
})
emissiveLights.length = 0
emissiveLightTargets.clear()
```

### No Memory Leaks
- Proper disposal of all light objects
- Shadow map cleanup
- Target reference clearing

## Configuration

Currently auto-configured, but easy to customize:

```typescript
// In addEmissiveLights() function:
const lightIntensity = emissiveIntensity * Math.min(surfaceArea * 0.5, 3) * 2

// Tweak these multipliers:
// - surfaceArea * 0.5  → controls area influence
// - 3                   → caps maximum area multiplier
// - 2                   → overall intensity boost

// Shadow threshold:
if (useShadows && lightIntensity > 1.5) {  // ← adjust threshold
  pointLight.castShadow = true
}
```

## Compatibility

✅ Works with all material types:
- MeshStandardMaterial
- MeshPhysicalMaterial
- Materials with or without emissive maps

✅ Supports:
- Static meshes
- Animated meshes (lights follow)
- Exploded views
- Multiple emissive materials per object
- WebGL 1 & WebGL 2

## Visual Impact

### Before (Without Emissive Lights)
- Emissive materials glow but don't illuminate
- Scenes look flat around glowing elements
- No color cast from screens/LEDs
- Less realistic

### After (With Emissive Lights)
- ✨ Realistic light propagation from glowing surfaces
- 🎨 Color bleeding onto nearby surfaces
- 💫 Dynamic shadows from emissive sources
- 🌟 Professional product visualization quality

---

**Result:** Your Sonichive booth now has realistic lighting from every glowing element - screens, LEDs, indicators, and displays all cast proper light and shadows! 🎨✨


