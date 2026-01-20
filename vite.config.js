import { defineConfig } from 'vite';

export default defineConfig({
    // Base path for GitHub Pages deployment
    // Using './' makes the paths relative to the index.html file
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
    },
    server: {
        port: 5173,
        open: true,
    }
});
