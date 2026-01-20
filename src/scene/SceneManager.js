import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sun } from '../objects/Sun.js';
import { OrbitalSystem } from '../physics/OrbitalSystem.js';
import { CameraController } from './CameraController.js';
import { PlanetSelector } from '../interactions/PlanetSelector.js';
import { InfoPanel } from '../interactions/InfoPanel.js';
import { MissionControl } from '../interactions/MissionControl.js';
import { textureLoader } from '../utils/TextureLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export class SceneManager {
    constructor() {
        this.canvas = document.getElementById('experience-canvas');
        this.scene = new THREE.Scene();

        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.setupControls();
        this.setupOrbitalSystem();
        this.setupCameraController();
        this.setupInteraction();
        this.setupBackground();
        this.setupPostProcessing();
        this.addAsteroidBelt();
        this.addSun();
    }

    setupPostProcessing() {
        this.renderPass = new RenderPass(this.scene, this.camera);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, // Strength
            0.4, // Radius
            0.85 // Threshold
        );

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(new OutputPass());
    }

    addAsteroidBelt() {
        const asteroidCount = 2000;
        const geometry = new THREE.IcosahedronGeometry(0.05, 0); // Low poly for performance
        const material = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });

        const instancedMesh = new THREE.InstancedMesh(geometry, material, asteroidCount);
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();

        const innerRadius = 250 * 0.1; // Between Mars (227) and Jupiter (778)
        const outerRadius = 400 * 0.1;

        for (let i = 0; i < asteroidCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 2;

            const scale = 0.5 + Math.random() * 1.5;
            matrix.makeScale(scale, scale, scale);
            matrix.setPosition(x, y, z);
            instancedMesh.setMatrixAt(i, matrix);
        }

        this.scene.add(instancedMesh);
        this.asteroidBelt = instancedMesh;
    }

    async setupBackground() {
        const texture = await textureLoader.load('/assets/textures/starfield.png');
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
    }

    addSun() {
        this.sun = new Sun(this.scene);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.camera.position.set(0, 20, 100);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Shadow Mapping
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(ambientLight);

        this.sunLight = new THREE.PointLight(0xffffff, 2, 0, 0);
        this.sunLight.position.set(0, 0, 0);
        this.sunLight.castShadow = true;

        // Shadow Bias and Map Size for realism
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 10000;
        this.sunLight.shadow.bias = -0.0001;

        this.scene.add(this.sunLight);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 5000;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (this.composer) {
            this.composer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    setupOrbitalSystem() {
        this.orbitalSystem = new OrbitalSystem(this.scene);
    }

    setupCameraController() {
        this.cameraController = new CameraController(this.camera, this);
    }

    setupInteraction() {
        this.infoPanel = new InfoPanel();
        this.missionControl = new MissionControl();
        this.planetSelector = new PlanetSelector(
            this.scene,
            this.camera,
            this.canvas,
            this.orbitalSystem.bodies,
            (planet) => this.infoPanel.show(planet)
        );

        const speedButtons = document.querySelectorAll('.speed-btn');
        speedButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const speed = parseFloat(btn.dataset.speed);
                this.orbitalSystem.setTimeAcceleration(speed);

                speedButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        const freeFlyToggle = document.getElementById('free-fly-toggle');
        this.isFreeFly = false;

        // Disable OrbitControls initially
        this.controls.enabled = false;

        freeFlyToggle.addEventListener('click', () => {
            this.isFreeFly = !this.isFreeFly;
            this.controls.enabled = this.isFreeFly;
            freeFlyToggle.querySelector('.label').innerText = `FREE FLIGHT: ${this.isFreeFly ? 'ON' : 'OFF'}`;

            // Toggle scroll container visibility or pointer events
            const scrollContainer = document.getElementById('scroll-container');
            scrollContainer.style.opacity = this.isFreeFly ? '0' : '1';
            scrollContainer.style.pointerEvents = this.isFreeFly ? 'none' : 'auto';
        });

        this.simDateElement = document.getElementById('sim-date');

        const scaleToggle = document.getElementById('scale-mode-toggle');
        this.isRealisticScale = false;
        scaleToggle.addEventListener('click', () => {
            this.isRealisticScale = !this.isRealisticScale;
            this.orbitalSystem.setScaleMode(this.isRealisticScale);
            scaleToggle.querySelector('.label').innerText = `SCALE: ${this.isRealisticScale ? 'REALISTIC' : 'CINEMATIC'}`;
        });
    }

    update() {
        const deltaTime = this.clock ? this.clock.getDelta() * 1000 : 16;
        if (!this.clock) this.clock = new THREE.Clock();

        if (this.controls && this.isFreeFly) this.controls.update();

        if (this.cameraController && !this.isFreeFly) this.cameraController.update();

        if (this.orbitalSystem) {
            this.orbitalSystem.update(deltaTime);

            // Update Sun shaders
            if (this.sun) this.sun.update(this.clock.getElapsedTime());
            // Update date display
            const date = new Date();
            date.setSeconds(date.getSeconds() + (this.orbitalSystem.elapsedDays * 86400));
            const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            this.simDateElement.innerText = date.toLocaleString('en-US', options).toUpperCase();
        }

        if (this.stars) {
            this.stars.rotation.y += 0.0001;
        }

        if (this.asteroidBelt) {
            this.asteroidBelt.rotation.y += 0.0005;
        }

        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
