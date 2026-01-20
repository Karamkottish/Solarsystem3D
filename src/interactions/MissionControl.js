import { nasaApiService } from '../services/NasaApiService.js';

export class MissionControl {
    constructor() {
        this.panel = document.getElementById('mission-control');
        this.apodMedia = document.getElementById('apod-media');
        this.apodTitle = document.getElementById('apod-title');
        this.apodDesc = document.getElementById('apod-desc');
        this.missionFeed = document.getElementById('mission-feed');
        this.toggleBtn = document.getElementById('mission-control-toggle');
        this.closeBtn = document.getElementById('close-mission');

        this.isVisible = false;
        this.hasLoaded = false;

        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.hide());
    }

    toggle() {
        if (this.isVisible) this.hide();
        else this.show();
    }

    async show() {
        this.isVisible = true;
        this.panel.classList.remove('hidden');
        this.panel.classList.add('visible');

        if (!this.hasLoaded) {
            await this.loadData();
            this.hasLoaded = true;
        }
    }

    hide() {
        this.isVisible = false;
        this.panel.classList.remove('visible');
        this.panel.classList.add('hidden');
    }

    async loadData() {
        // Load APOD
        const apodData = await nasaApiService.getAstronomyPictureOfTheDay();
        if (apodData) {
            this.apodTitle.innerText = apodData.title.toUpperCase();
            this.apodDesc.innerText = apodData.explanation;

            this.apodMedia.innerHTML = '';
            if (apodData.media_type === 'image') {
                const img = document.createElement('img');
                img.src = apodData.url;
                img.alt = apodData.title;
                img.style.width = '100%';
                img.style.borderRadius = '8px';
                img.style.marginTop = '10px';
                this.apodMedia.appendChild(img);
            } else if (apodData.media_type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = apodData.url;
                iframe.style.width = '100%';
                iframe.style.height = '200px';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '8px';
                this.apodMedia.appendChild(iframe);
            }
        } else {
            this.apodDesc.innerText = "Error linking to NASA satellite feed. Check connection.";
        }

        // Load Mission Updates
        const updates = await nasaApiService.getMissionUpdates();
        this.missionFeed.innerHTML = '';
        updates.forEach(u => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="feed-tag">${u.mission}</span> ${u.update}`;
            this.missionFeed.appendChild(li);
        });
    }
}
