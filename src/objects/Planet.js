import * as THREE from 'three';
import { SCALE_CONFIG } from '../physics/SolarSystemData.js';
import { textureLoader } from '../utils/TextureLoader.js';

export class Planet {
    constructor(data, scene) {
        this.data = data;
        this.scene = scene;
        this.name = data.name;

        this.init();
    }

    async init() {
        // Geometry based on scientific radius
        const radius = this.data.radius * SCALE_CONFIG.planetScale;
        const geometry = new THREE.SphereGeometry(radius, 128, 128); // Higher segment count for perfect spheres

        // Load textures (Multi-layer support)
        const textureKey = this.name.toLowerCase();
        const diffuseMap = await textureLoader.load(`/assets/textures/${textureKey}_diffuse.png`);

        // Attempt to load optional maps
        const normalMap = await textureLoader.load(`/assets/textures/${textureKey}_normal.png`).catch(() => null);
        const specularMap = await textureLoader.load(`/assets/textures/${textureKey}_specular.png`).catch(() => null);

        // Material (High-quality PBR material)
        this.material = new THREE.MeshStandardMaterial({
            map: diffuseMap,
            normalMap: normalMap,
            roughnessMap: specularMap, // Repurpose specular as roughness inverse
            metalness: 0.05,
            roughness: 0.7,
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // Set initial axial tilt
        this.mesh.rotation.x = THREE.MathUtils.degToRad(this.data.axialTilt);

        this.scene.add(this.mesh);

        // Add Atmospheric Glow
        this.addAtmosphere();

        // Add Saturn Rings if applicable
        if (this.name === "Saturn") {
            this.addSaturnRings(radius);
        }

        // Add orbital path ring (visual only)
        this.addOrbitalPath();
    }

    addAtmosphere() {
        const radius = this.data.radius * SCALE_CONFIG.planetScale;
        const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.05, 64, 64);

        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                uniform vec3 uColor;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                    gl_FragColor = vec4(uColor, 1.0) * intensity;
                }
            `,
            uniforms: {
                uColor: { value: new THREE.Color(this.data.color) }
            },
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.mesh.add(atmosphere);
    }

    async addSaturnRings(planetRadius) {
        const innerRadius = planetRadius * 1.4;
        const outerRadius = planetRadius * 2.4;
        const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);

        const texture = await textureLoader.load('/assets/textures/saturn_rings.png');

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });

        const rings = new THREE.Mesh(geometry, material);
        rings.rotation.x = Math.PI / 2;
        this.mesh.add(rings);
    }

    addOrbitalPath() {
        const a = this.data.distance * SCALE_CONFIG.distanceScale;
        const e = this.data.eccentricity || 0;
        const b = a * Math.sqrt(1 - e * e); // Semi-minor axis

        const curve = new THREE.EllipseCurve(
            -a * e, 0,       // center x, y (offset by focus)
            a, b,            // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,           // aClockwise
            0                // aRotation
        );

        const points = curve.getPoints(256); // More segments for smooth elliptical paths
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15
        });

        const orbit = new THREE.Line(geometry, material);
        orbit.rotation.x = Math.PI / 2; // Flat on the scene

        // Apply inclination to the orbit line as well
        const inclination = (this.data.inclination || 0) * (Math.PI / 180);
        orbit.rotation.z = inclination; // Simplified rotation for inclination

        this.scene.add(orbit);
        this.orbitalPath = orbit;
    }

    onHoverEnter() {
        if (this.mesh.children[0]) {
            this.mesh.children[0].material.uniforms.uColor.value.set(0xffffff);
        }
    }

    onHoverExit() {
        if (this.mesh.children[0]) {
            this.mesh.children[0].material.uniforms.uColor.value.set(this.data.color);
        }
    }

    update(elapsedDays) {
        // Rotation on its axis is handled in OrbitalSystem.js for now,
        // but can be moved here for better encapsulation if needed.
    }
}
