import { planetDataService, PlanetDataService } from '../services/PlanetDataService.js';

export class InfoPanel {
    constructor() {
        this.panel = document.getElementById('info-panel');
        this.title = document.getElementById('panel-title');
        this.mass = document.getElementById('stat-mass');
        this.radius = document.getElementById('stat-radius');
        this.gravity = document.getElementById('stat-gravity');
        this.distance = document.getElementById('stat-distance');
        this.eccentricity = document.getElementById('stat-eccentricity');
        this.composition = document.getElementById('composition-text');
        this.closeBtn = document.getElementById('close-panel');

        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.hide());
    }

    async show(planet) {
        let data = planet.data;
        this.title.innerText = data.name.toUpperCase();

        // Populate with local data first for instant feedback
        this.updateStats(data);

        this.panel.classList.remove('hidden');
        this.panel.classList.add('visible');

        // Try to fetch fresher data from API
        const apiData = await planetDataService.getPlanetData(data.name);
        if (apiData) {
            const mergedData = PlanetDataService.translateData(apiData, data);
            this.updateStats(mergedData);
        }
    }

    updateStats(data) {
        this.mass.innerText = data.mass || 'N/A';
        this.radius.innerText = `${data.radius.toLocaleString()} km`;
        this.gravity.innerText = data.gravity || 'N/A';
        this.distance.innerText = `${data.semiMajorAxis} AU`;
        this.eccentricity.innerText = data.eccentricity || '0';
        this.composition.innerText = data.description;
    }

    hide() {
        this.panel.classList.remove('visible');
        this.panel.classList.add('hidden');
    }
}
