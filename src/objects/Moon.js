import * as THREE from 'three';
import { SCALE_CONFIG } from '../physics/SolarSystemData.js';
import { textureLoader } from '../utils/TextureLoader.js';

export class Moon {
    constructor(parentPlanet, data, scene) {
        this.parentPlanet = parentPlanet;
        this.data = data;
        this.scene = scene;
        this.init();
    }

    async init() {
        // Moon radius is significantly smaller
        const radius = this.data.radius * SCALE_CONFIG.planetScale;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);

        const texture = await textureLoader.load('/assets/textures/moon_diffuse.png');

        this.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.9,
            metalness: 0
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.scene.add(this.mesh);
    }

    update(elapsedDays) {
        if (!this.mesh) return;

        // moon orbital distance is relative to parent planet
        const dist = this.data.distance * SCALE_CONFIG.planetScale * 20; // Visual exaggeration for visibility
        const angle = (elapsedDays / this.data.orbitalPeriod) * Math.PI * 2;

        const parentPos = this.parentPlanet.mesh.position;
        const x = parentPos.x + Math.cos(angle) * dist;
        const z = parentPos.z + Math.sin(angle) * dist;

        this.mesh.position.set(x, 0, z);

        // Simple rotation
        this.mesh.rotation.y += 0.01;
    }
}
