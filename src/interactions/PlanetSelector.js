import * as THREE from 'three';

export class PlanetSelector {
    constructor(scene, camera, canvas, planets, onSelect) {
        this.scene = scene;
        this.camera = camera;
        this.canvas = canvas;
        this.planets = planets;
        this.onSelect = onSelect;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredPlanet = null;

        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', (e) => this.onClick(e));
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.checkIntersections();
    }

    checkIntersections() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Test against planet meshes
        const meshes = this.planets.map(p => p.mesh);
        const intersects = this.raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            const intersectedMesh = intersects[0].object;
            const planet = this.planets.find(p => p.mesh === intersectedMesh);

            if (this.hoveredPlanet !== planet) {
                if (this.hoveredPlanet) this.hoveredPlanet.onHoverExit();
                this.hoveredPlanet = planet;
                if (this.hoveredPlanet) this.hoveredPlanet.onHoverEnter();
                this.canvas.style.cursor = 'pointer';
            }
        } else {
            if (this.hoveredPlanet) {
                this.hoveredPlanet.onHoverExit();
                this.hoveredPlanet = null;
                this.canvas.style.cursor = 'default';
            }
        }
    }

    onClick(event) {
        if (this.hoveredPlanet) {
            this.onSelect(this.hoveredPlanet);
        }
    }
}
