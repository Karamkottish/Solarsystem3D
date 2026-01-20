import * as THREE from 'three';
import { SOLAR_SYSTEM_DATA, SCALE_CONFIG } from './SolarSystemData.js';
import { Planet } from '../objects/Planet.js';
import { Moon } from '../objects/Moon.js';

export class OrbitalSystem {
    constructor(scene) {
        this.scene = scene;
        this.bodies = [];
        this.timeAcceleration = 1;
        this.elapsedDays = 0;
        this.distanceMultiplier = 1;
        this.planetScaleMultiplier = 1;

        this.init();
    }

    init() {
        SOLAR_SYSTEM_DATA.planets.forEach(planetData => {
            const planet = new Planet(planetData, this.scene);
            this.bodies.push(planet);

            // Add Earth's Moon specifically for realism boost
            if (planetData.name === "Earth") {
                this.moons = this.moons || [];
                const moon = new Moon(planet, {
                    name: "Luna",
                    radius: 1737,
                    distance: 0.384, // 10^6 km
                    orbitalPeriod: 27.3
                }, this.scene);
                this.moons.push(moon);
            }
        });
    }

    update(deltaTime) {
        // deltaTime is in seconds
        const daysPassed = (deltaTime / 1000) * SCALE_CONFIG.timeScale * this.timeAcceleration;
        this.elapsedDays += daysPassed;

        this.bodies.forEach(body => {
            this.updateBodyPosition(body);
        });

        if (this.moons) {
            this.moons.forEach(moon => moon.update(this.elapsedDays));
        }
    }

    updateBodyPosition(body) {
        if (body.name === "Sun") return;

        const data = body.data;
        // Use semiMajorAxis if we are in realistic mode, otherwise stick to the original 'distance' field for cinematic
        const baseDistance = this.distanceMultiplier > 10 ? data.semiMajorAxis * 149.6 : data.distance;
        const a = baseDistance * SCALE_CONFIG.distanceScale * this.distanceMultiplier;
        const e = data.eccentricity || 0;
        const inclination = (data.inclination || 0) * (Math.PI / 180);

        // Mean Anomaly (M)
        const M = (this.elapsedDays / data.orbitalPeriod) * Math.PI * 2;

        // Solve Kepler's Equation: M = E - e * sin(E)
        // Using Newton-Raphson method for Eccentric Anomaly (E)
        let E = M;
        for (let i = 0; i < 5; i++) {
            E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        }

        // True Anomaly (v)
        const v = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));

        // Distance from focus (r)
        const r = a * (1 - e * Math.cos(E));

        // Position in orbital plane
        let x = r * Math.cos(v);
        let z = r * Math.sin(v);
        let y = 0;

        // Apply Inclination (rotation around x-axis for simplicity)
        const cosI = Math.cos(inclination);
        const sinI = Math.sin(inclination);
        const rotatedZ = z * cosI;
        const rotatedY = z * sinI;

        body.mesh.position.set(x, rotatedY, rotatedZ);

        // Rotation on its axis
        const rotationAngle = (this.elapsedDays / Math.abs(data.rotationPeriod)) * Math.PI * 2;
        body.mesh.rotation.y = data.rotationPeriod > 0 ? rotationAngle : -rotationAngle;
    }

    setTimeAcceleration(value) {
        this.timeAcceleration = value;
    }

    setScaleMode(isRealistic) {
        // In realistic mode, we want AU to be properly represented.
        // 1 AU = 149.6 M km.
        // Our current 'distance' for Earth is 149.6.
        // If we want it to be 100 units per AU, then distanceScale * multiplier should be such that 149.6 * 0.1 * mult = 100.
        // mult = 100 / 14.96 \approx 6.68.
        this.distanceMultiplier = isRealistic ? 5 : 1;
        this.planetScaleMultiplier = isRealistic ? 0.2 : 1;

        // Update body scales and orbital paths
        this.bodies.forEach(body => {
            const scale = body.data.radius * SCALE_CONFIG.planetScale * this.planetScaleMultiplier;
            body.mesh.scale.set(scale, scale, scale);

            if (body.orbitalPath) {
                body.orbitalPath.scale.set(this.distanceMultiplier, this.distanceMultiplier, this.distanceMultiplier);
            }
        });
    }
}
