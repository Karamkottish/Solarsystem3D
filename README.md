<div align="center">

# 🪐 COSMIC JOURNEY
### THE NEXT GENERATION OF ASTRONOMICAL EXPLORATION
**[ Demo ](https://karamkottish.github.io/Solarsystem3D/)** • **[ Documentation ](#features)** • **[ Support ](https://github.com/Karamkottish/Solar-System/issues)**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Graphics-Three.js-000000?logo=three.dot.js&logoColor=white)](https://threejs.org/)
[![Status](https://img.shields.io/badge/Status-Ultra--Modern_v1.0-ff00c8)](https://img.shields.io/badge/Status-Ultra--Modern-ff00c8)

---

> *"The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself." — Carl Sagan*

</div>

## 🌌 THE EXPERIENCE

**Cosmic Journey** is not just a simulation; it's a high-fidelity, scroll-driven masterpiece designed to push the boundaries of WebGL in 2027. Experience the sheer scale of our solar system with cinematic precision and scientific accuracy.

````carousel
```js
// KEPLERIAN ORBITAL ENGINE
const calculatePosition = (semiMajorAxis, eccentricity, inclination, time) => {
  // Real-time orbital mechanics solve Kepler's Equation
  const meanAnomaly = (2 * Math.PI * time) / orbitalPeriod;
  const eccentricAnomaly = solveKepler(meanAnomaly, eccentricity);
  // ... result: x, y, z in 3D space
};
```
<!-- slide -->
```glsl
// VOLUMETRIC SUN SHADER
void main() {
  vec2 animatedUv = vUv + vec2(uTime * 0.005, uTime * 0.002);
  vec4 texColor = texture2D(uTexture, animatedUv);
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(texColor.rgb * uBrightness + (glowColor * fresnel), 1.0);
}
```
````

---

## 🛰️ SYSTEM CAPABILITIES

### 🔭 Scientific Intelligence
- **Keplerian Orbital Engine**: Implements true elliptical orbits with relative eccentricity and inclination.
- **NASA Intelligence Core**: Real-time integration with NASA's **APOD API** for daily astronomical imagery.
- **Celestial telemetry**: Live data fetching for planetary mass, gravity, and composition.

### 🎮 Dynamic Interaction
- **Dual Scale Modes**: Switch instantly between **Cinematic** (visual storytelling) and **Realistic** (astronomical truth).
- **Time Dilation**: Accelerate simulation speed up to 1000x to observe complex orbital dances.
- **Glassmorphic HUD**: A futuristic 2027 interface powered by CSS variables and hardware-accelerated animations.

### 🎨 Visual Fidelity
- **Volumetric Atmosphere**: Multi-layered Rayleigh scattering shaders for Earth, Venus, and Mars.
- **PBR Rendering**: Physically Based Rendering for realistic surface reflections and shadows.
- **Instanced Geometry**: High-performance asteroid belts rendering 2000+ unique bodies at 60fps.

---

## 🛠️ ARCHITECTURE

Modern web standards. Zero legacy bloat.

- **Engine**: Three.js (WebGL2)
- **Physics**: Vanillia JS Keplerian Logic
- **UI**: Futuristic Glassmorphism (Vanilla CSS with 2027 Aesthetics)
- **Pipeline**: Vite 7.x + GitHub Actions Auto-Deploy

---

## 🚀 EXPANSION PROTOCOL

### Requirements
- **Node.js** v20+
- **NASA API Key** (Optional but recommended for Mission Control)

### Installation
```bash
git clone https://github.com/Karamkottish/Solar-System.git
cd Solar-System
npm install
```


### Ignition
```bash
npm run dev
```

---

## 🧭 USER COMPASS

| ACTION | CONTROL | RESULT |
| :--- | :--- | :--- |
| **Travel** | `Scroll Wheel` | Cinematic transition between planets |
| **Inspect** | `Left Click` | Opens planetary Intelligence Panel |
| **Live Feed** | `Mission Control` | Toggles NASA live data stream |
| **Explore** | `Free Flight` | Unlocks manual camera telemetry |
| **Scaling** | `Scale Toggle` | Switches between Artistic and Scientific scales |

---

<p align="center">
  <img src="https://api.iconify.design/vscode-icons:folder-type-binary.svg" width="50" />
  <br>
  Built by <b>Karam Kottish</b> for the next decade of web exploration.
</p>
