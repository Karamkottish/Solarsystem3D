import * as THREE from 'three';
import { textureLoader } from '../utils/TextureLoader.js';

export class Sun {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.init();
    }

    async init() {
        const geometry = new THREE.SphereGeometry(10, 64, 64);

        // Load surface texture
        const texture = await textureLoader.load('/assets/textures/sun_diffuse.png');

        // Custom Shader Material for realistic sun surface
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: texture },
                uBrightness: { value: 1.2 }
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform sampler2D uTexture;
        uniform float uBrightness;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          // Animate UVs for surface motion
          vec2 animatedUv = vUv + vec2(uTime * 0.005, uTime * 0.002);
          vec4 texColor = texture2D(uTexture, animatedUv);
          
          // Fresnel effect for edge glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          vec3 baseColor = texColor.rgb * uBrightness;
          vec3 glowColor = vec3(1.0, 0.5, 0.0) * fresnel * 0.5;
          
          gl_FragColor = vec4(baseColor + glowColor, 1.0);
        }
      `
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);

        // Add cinematic glow sprites or large transparent spheres
        this.addGlow();
    }

    addGlow() {
        const glowGeometry = new THREE.SphereGeometry(15, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(glow);

        // Outer faint glow
        const outerGlow = new THREE.Mesh(
            new THREE.SphereGeometry(25, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xff8800,
                transparent: true,
                opacity: 0.05,
                side: THREE.BackSide
            })
        );
        this.scene.add(outerGlow);
    }

    update(time) {
        if (this.material) {
            this.material.uniforms.uTime.value = time;
        }
    }
}
