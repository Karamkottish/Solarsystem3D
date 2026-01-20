export class PlanetDataService {
    constructor() {
        this.baseUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';
        this.cache = new Map();
    }

    async getPlanetData(planetId) {
        // planetId should be lowercase from API
        const id = planetId.toLowerCase();

        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        try {
            console.log(`📡 Fetching data for ${planetId} from API...`);
            // Note: As of April 2025, this API may require a free bearer token.
            // We implementation basic fetch here which may fail with 401 if token is missing.
            const response = await fetch(`${this.baseUrl}${id}`);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('API requires authentication (Bearer Token). Falling back to local data.');
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(id, data);
            return data;
        } catch (error) {
            console.warn(`⚠️ PlanetDataService Error: ${error.message}`);
            return null; // Signals to use fallback
        }
    }

    /**
     * Translates API data structure to our internal format
     */
    static translateData(apiData, localData) {
        if (!apiData) return localData;

        return {
            ...localData,
            mass: apiData.mass ? `${apiData.mass.massValue} × 10^${apiData.mass.massExponent} kg` : localData.mass,
            gravity: apiData.gravity ? `${apiData.gravity} m/s²` : localData.gravity,
            radius: apiData.meanRadius || localData.radius,
            // Keep our local description as it's more curated for the experience
        };
    }
}

export const planetDataService = new PlanetDataService();
