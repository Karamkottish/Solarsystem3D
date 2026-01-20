export const SOLAR_SYSTEM_DATA = {
    sun: {
        name: "Sun",
        radius: 695700, // km
        color: 0xffcc00,
        description: "The heart of our solar system..."
    },
    planets: [
        {
            name: "Mercury",
            radius: 2440,
            mass: "3.285 × 10^23 kg",
            gravity: "3.7 m/s²",
            distance: 57.9, // 10^6 km
            semiMajorAxis: 0.387, // AU
            eccentricity: 0.2056,
            inclination: 7.00, // degrees
            orbitalPeriod: 88, // days
            rotationPeriod: 58.6, // days
            axialTilt: 0.03, // degrees
            color: 0x8c8c8c,
            description: "The smallest and innermost planet in the Solar System. It's only slightly larger than Earth's Moon."
        },
        {
            name: "Venus",
            radius: 6052,
            mass: "4.867 × 10^24 kg",
            gravity: "8.87 m/s²",
            distance: 108.2,
            semiMajorAxis: 0.723,
            eccentricity: 0.0067,
            inclination: 3.39,
            orbitalPeriod: 224.7,
            rotationPeriod: -243, // Retrograde
            axialTilt: 177.4,
            color: 0xe3bb76,
            description: "Earth's twin in size, but with a runaway greenhouse effect that makes it the hottest planet."
        },
        {
            name: "Earth",
            radius: 6371,
            mass: "5.972 × 10^24 kg",
            gravity: "9.81 m/s²",
            distance: 149.6,
            semiMajorAxis: 1.000,
            eccentricity: 0.0167,
            inclination: 0.00,
            orbitalPeriod: 365.2,
            rotationPeriod: 0.99,
            axialTilt: 23.4,
            color: 0x2271b3,
            description: "Our home, the only planet known to harbor life. Its atmosphere is rich in nitrogen and oxygen."
        },
        {
            name: "Mars",
            radius: 3390,
            mass: "6.39 × 10^23 kg",
            gravity: "3.72 m/s²",
            distance: 227.9,
            semiMajorAxis: 1.524,
            eccentricity: 0.0934,
            inclination: 1.85,
            orbitalPeriod: 687,
            rotationPeriod: 1.03,
            axialTilt: 25.2,
            color: 0xe27b58,
            description: "The Red Planet, home to the largest volcano in the solar system, Olympus Mons."
        },
        {
            name: "Jupiter",
            radius: 69911,
            mass: "1.898 × 10^27 kg",
            gravity: "24.79 m/s²",
            distance: 778.6,
            semiMajorAxis: 5.203,
            eccentricity: 0.0484,
            inclination: 1.30,
            orbitalPeriod: 4331,
            rotationPeriod: 0.41,
            axialTilt: 3.1,
            color: 0xd39c7e,
            description: "The king of planets, a gas giant larger than all others combined with a massive Great Red Spot."
        },
        {
            name: "Saturn",
            radius: 58232,
            mass: "5.683 × 10^26 kg",
            gravity: "10.44 m/s²",
            distance: 1433.5,
            semiMajorAxis: 9.537,
            eccentricity: 0.0541,
            inclination: 2.49,
            orbitalPeriod: 10747,
            rotationPeriod: 0.44,
            axialTilt: 26.7,
            color: 0xc5ab6e,
            description: "Famous for its stunning rings, Saturn is a gas giant primarily of hydrogen and helium."
        },
        {
            name: "Uranus",
            radius: 25362,
            mass: "8.681 × 10^25 kg",
            gravity: "8.69 m/s²",
            distance: 2872.5,
            semiMajorAxis: 19.191,
            eccentricity: 0.0472,
            inclination: 0.77,
            orbitalPeriod: 30589,
            rotationPeriod: -0.72,
            axialTilt: 97.8,
            color: 0xb5e1e2,
            description: "An ice giant that rotates on its side, tilted almost 98 degrees relative to its orbit."
        },
        {
            name: "Neptune",
            radius: 24622,
            mass: "1.024 × 10^26 kg",
            gravity: "11.15 m/s²",
            distance: 4495.1,
            semiMajorAxis: 30.069,
            eccentricity: 0.0086,
            inclination: 1.77,
            orbitalPeriod: 59800,
            rotationPeriod: 0.67,
            axialTilt: 28.3,
            color: 0x6081ff,
            description: "The most distant planet, cold, dark, and ice-giant whipped by supersonic winds."
        }
    ]
};

// Scaling constants for visualization
export const SCALE_CONFIG = {
    planetScale: 0.0002, // Adjust to make planets visible
    distanceScale: 0.1,  // Adjust to fit in scene
    timeScale: 0.01      // Days per second
};
