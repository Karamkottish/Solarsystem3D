import * as THREE from 'three';
import { SceneManager } from './scene/SceneManager.js';
import './styles/main.css';

class App {
  constructor() {
    this.init();
  }

  async init() {
    console.log('🚀 Initializing Cosmic Journey...');

    // Initialize Scene Manager
    this.sceneManager = new SceneManager();

    // Mock loading progress for now
    this.simulateLoading();

    // Start Animation Loop
    this.animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
      this.sceneManager.onWindowResize();
    });
  }

  simulateLoading() {
    const progressBar = document.getElementById('progress-bar');
    const loadingScreen = document.getElementById('loading-screen');
    const statusText = document.getElementById('loading-status');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        statusText.innerText = 'System Ready. Entering Cosmos...';

        setTimeout(() => {
          loadingScreen.classList.add('inactive');
        }, 1000);
      }

      progressBar.style.width = `${progress}%`;

      if (progress < 30) statusText.innerText = 'Calculating Orbital Trajectories...';
      else if (progress < 60) statusText.innerText = 'Generating Atmospheric Shaders...';
      else if (progress < 90) statusText.innerText = 'Rendering Celestial Bodies...';
    }, 100);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.sceneManager.update();
  }
}

// Start the Application
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
