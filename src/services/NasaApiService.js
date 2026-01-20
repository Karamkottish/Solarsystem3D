export class NasaApiService {
    constructor() {
        this.apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
        this.baseUrl = 'https://api.nasa.gov/';
        this.cache = new Map();
    }

    async getAstronomyPictureOfTheDay() {
        if (this.cache.has('apod')) {
            return this.cache.get('apod');
        }

        try {
            console.log('📡 Fetching NASA Astronomy Picture of the Day...');
            const response = await fetch(`${this.baseUrl}planetary/apod?api_key=${this.apiKey}`);

            if (!response.ok) {
                throw new Error(`NASA API Error: ${response.status}`);
            }

            const data = await response.json();
            this.cache.set('apod', data);
            return data;
        } catch (error) {
            console.warn(`⚠️ NasaApiService Error: ${error.message}`);
            return null;
        }
    }

    /**
     * Recent mission updates (Mocked for now as NASA doesn't have a single flat feed API for mission text updates)
     * In a production 2027 app, this would pull from a real-time WebSocket or specific mission APIs.
     */
    async getMissionUpdates() {
        return [
            { id: 1, mission: "ARTEMIS II", update: "Roll-out to Launch Pad 39B complete. Wet dress rehearsal targeted for Feb 2nd." },
            { id: 2, mission: "MARS 2020", update: "Perseverance rover successfully cached its 28th rock core sample in Jezero Crater." },
            { id: 3, mission: "JWST", update: "Unprecedented infrared mosaics of the Orion Nebula released to investigators." },
            { id: 4, mission: "ISS", update: "Crew-12 astronauts preparing for scheduled docking maneuver." }
        ];
    }
}

export const nasaApiService = new NasaApiService();
