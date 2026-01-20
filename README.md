# 🪐 Cosmic Journey | Ultra-Realistic 3D Solar System

![Cosmic Journey Cover](https://raw.githubusercontent.com/Karamkottish/Solar-System/main/thumbnail.png) 
> *An immersive, scroll-driven astronomical experience built for the 2027 web.*

---

## ✨ Features

### 🌌 Extreme Realism
- **Keplerian Orbits**: Real elliptical planetary paths with accurate **eccentricity** and **inclination**.
- **Volumetric Sun**: Dynamic shader-based solar surface with corona and glow effects.
- **Atmospheric Scattering**: Realistic light scattering for Earth, Venus, and Mars.
- **PBR Texturing**: High-resolution physically-based rendering materials for every celestial body.

### 🛰️ Mission Control
- **Live NASA Data**: Integrated with the **NASA APOD API** to bring daily space photography to your HUD.
- **Real-Time Mission Feed**: Track updates for active missions like **Artemis II**, **Perseverance**, and **JWST**.
- **Dynamic Timing**: A realistic simulation clock that starts from your local time and scales with orbital speed.

### 🎬 Cinematic Experience
- **Smooth Scroll Journey**: A directed, GSAP-powered camera path through the entire system.
- **Scale Toggles**: Switch instantly between **Cinematic** (visual clarity) and **Realistic** (astronomical accuracy).
- **Glassmorphic UI**: High-end 2027 design aesthetic with micro-animations and blurred surfaces.

---

## 🛠️ Tech Stack

- **Graphics**: [Three.js](https://threejs.org/) (WebGL2)
- **Animation**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger
- **Build System**: [Vite](https://vitejs.dev/)
- **Data**: [NASA Open APIs](https://api.nasa.gov/), [Solar System OpenData API](https://api.le-systeme-solaire.net/)
- **Styling**: Vanilla CSS with futuristic variables

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Karamkottish/Solar-System.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root and add your NASA API key:
   ```env
   VITE_NASA_API_KEY=your_key_here
   ```

4. **Launch the simulation**:
   ```bash
   npm run dev
   ```

---

## 🎮 Controls

- **Scroll**: Travel through the system on a cinematic path.
- **Click Planet**: Open the **Info Panel** for scientific data and facts.
- **Mission Control**: Open the left-side panel for live NASA updates.
- **Scale Toggle**: Switch between visual scales in the top-right.
- **Free Flight**: Toggle free camera movement to explore at your own pace.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ for space enthusiasts and the future of educational web apps.
</p>
