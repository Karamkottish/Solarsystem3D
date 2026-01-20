import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCALE_CONFIG } from '../physics/SolarSystemData.js';

gsap.registerPlugin(ScrollTrigger);

export class CameraController {
    constructor(camera, sceneManager) {
        this.camera = camera;
        this.sceneManager = sceneManager;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const sections = document.querySelectorAll('.scroll-section');
        const targetNameElement = document.getElementById('target-name');

        // Initial camera position (Sun)
        this.camera.position.set(0, 50, 200);
        this.camera.lookAt(0, 0, 0);

        // Create a timeline for the camera journey
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    this.updateHUDRelativeToProgress(progress);
                }
            }
        });

        const planets = this.sceneManager.orbitalSystem.bodies;

        // Sun Start
        tl.to(this.camera.position, { x: 0, y: 15, z: 45, duration: 2 }, 0);

        // Map scroll progress to planets
        // We have 9 sections (Sun + 8 planets)
        // Progress 0.0 to 1.0
        const step = 1 / 8;

        planets.forEach((planet, index) => {
            const startTime = step * index;

            // We animate the camera to "follow" or "look at" the planet
            // Since planets are moving, we'll need to update the lerp target in the update loop
            // For the scroll trigger, we define the "base orbit" transition
        });

        // For now, let's create fixed points in space that follow the orbital average
        // Refining this to dynamically target meshes in the update() loop below
    }

    updateHUDRelativeToProgress(progress) {
        const targetNameElement = document.getElementById('target-name');
        const names = ["SUN", "MERCURY", "VENUS", "EARTH", "MARS", "JUPITER", "SATURN", "URANUS", "NEPTUNE"];
        const index = Math.round(progress * 8);
        if (targetNameElement) targetNameElement.innerText = names[index];
    }

    update() {
        if (this.sceneManager.isFreeFly) return;

        // Dynamic camera targeting
        const scrollProgress = ScrollTrigger.getAll()[0]?.progress || 0;
        const targetIndex = Math.round(scrollProgress * 8);

        if (targetIndex === 0) {
            this.camera.lookAt(0, 0, 0);
        } else {
            const planet = this.sceneManager.orbitalSystem.bodies[targetIndex - 1];
            if (planet && planet.mesh) {
                // Smoothly look at the planet
                const targetPos = new THREE.Vector3();
                planet.mesh.getWorldPosition(targetPos);

                // "Appear in Front" Logic: 
                // Position the camera directly between the Sun and the planet
                // with a slight offset for composition.
                const planetRadius = planet.data.radius * SCALE_CONFIG.planetScale;
                const viewDistance = planetRadius * 5; // Close-up "In Front" distance

                // Direction from origin (Sun) to planet
                const dir = targetPos.clone().normalize();

                // Target camera position: slightly outside the planet's orbit, facing it
                const camPos = targetPos.clone().add(dir.multiplyScalar(viewDistance));
                camPos.y += planetRadius * 0.5; // Slight vertical tilt for better view

                // Very high damping for the "cinematic transition" feel
                this.camera.position.lerp(camPos, 0.08);
                this.camera.lookAt(targetPos);
            }
        }
    }
}
