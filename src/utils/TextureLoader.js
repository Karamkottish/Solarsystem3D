import * as THREE from 'three';

export class TextureLoader {
    constructor() {
        this.loader = new THREE.TextureLoader();
        this.cache = new Map();
    }

    load(path) {
        if (this.cache.has(path)) return this.cache.get(path);

        const promise = new Promise((resolve, reject) => {
            this.loader.load(
                path,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.anisotropy = 16;
                    this.cache.set(path, texture);
                    resolve(texture);
                },
                undefined,
                (err) => reject(err)
            );
        });

        return promise;
    }
}

export const textureLoader = new TextureLoader();
