/**
 * DGZ Vision — Main Entry Point
 */
import { initMap, changeBasemap, toggleIGAC, toggleCadastre, togglePowerLayer } from './map-engine.js';
import { togglePanel, initMouseDrag, onFeatureHover } from './ui-controller.js';
import { initVision, initVisionElements, getCurrentGestureState } from './gestures.js';

// 1. Mapbox Configuration - Fetching from backend for security
async function getMapboxToken() {
    try {
        // En Vercel, el backend suele estar en /api o la ruta configurada
        const response = await fetch('/api/config/mapbox-token'); 
        if(!response.ok) throw new Error('Backend config error');
        const data = await response.json();
        return data.token;
    } catch (e) {
        console.warn("Security policy: no local fallback allowed.");
        return '';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const MAPBOX_TOKEN = await getMapboxToken();
    
    // 2. Initialize Map
    const map = initMap(MAPBOX_TOKEN);

    // 3. Initialize Vision Elements
    const elements = {
        video: document.querySelector('.input_video'),
        canvas: document.querySelector('.output_canvas'),
        ctx: document.querySelector('.output_canvas').getContext('2d'),
        cursor: document.getElementById('cyber-cursor'),
        statusText: document.getElementById('vision-status'),
        gestureFeedback: document.getElementById('gesture-status')
    };
    initVisionElements(elements);

    // 4. Global Map Events
    map.on('mousemove', (e) => {
        const state = getCurrentGestureState();
        if (state === "NONE" || state === "POINTER") {
            onFeatureHover(e.point.x, e.point.y);
        }
    });

    // 5. Canvas Resize
    const canvas = elements.canvas;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 6. Expose functions to window (for legacy onclick attributes)
    window.togglePanel = togglePanel;
    window.initMouseDrag = initMouseDrag;
    window.changeBasemap = changeBasemap;
    window.toggleIGAC = toggleIGAC;
    window.toggleCadastre = toggleCadastre;
    window.togglePowerLayer = togglePowerLayer;
    window.initVision = initVision;
});
