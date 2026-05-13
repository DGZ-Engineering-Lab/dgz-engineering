/**
 * DGZ_SOVEREIGN_RIDGE v5.0
 * High-Density Geospatial Relief
 * Ultra-Sharp Vector-Grade Rendering
 */

class DGZSovereignRidge {
    constructor() {
        this.canvas = document.getElementById('topo-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        
        this.layers = 5;
        this.points = [];
        this.time = 0;
        
        // Increase density for smoothness
        this.density = 100; 
        
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.colors = [
            '#F1F5F9', // Ultra Light Slate
            '#E2E8F0', // Light Slate
            '#CBD5E1', // Mid Slate
            '#94A3B8', // Steel Gray
            '#2563EB'  // Electric Blue (Accent Layer)
        ];

        this.init();
        this.animate();
        this.setupListeners();
    }

    init() {
        this.resize();
        this.generatePoints();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        
        this.ctx.resetTransform();
        this.ctx.scale(dpr, dpr);
        
        // Enable smoothing for vector-like paths
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }

    generatePoints() {
        this.points = [];
        const segment = this.width / (this.density - 1);
        
        for (let i = 0; i < this.layers; i++) {
            const layerPoints = [];
            for (let j = 0; j < this.density; j++) {
                layerPoints.push({
                    x: j * segment,
                    baseY: this.height * (0.45 + (i * 0.12)),
                    offset: j * 0.1 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2
                });
            }
            this.points.push(layerPoints);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.time += 0.003;

        // Smooth Mouse
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Render Layers
        for (let i = this.layers - 1; i >= 0; i--) {
            this.drawLayer(i);
        }

        requestAnimationFrame(() => this.animate());
    }

    drawLayer(index) {
        const layer = this.points[index];
        const color = this.colors[index];
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);

        const parallaxX = (this.mouse.x - this.width / 2) * (index + 1) * 0.015;
        const parallaxY = (this.mouse.y - this.height / 2) * (index + 1) * 0.008;

        for (let i = 0; i < layer.length; i++) {
            const p = layer[i];
            
            const x = p.x + parallaxX;
            const y_base = p.baseY + parallaxY;

            // Mouse Interaction Logic
            const dx = x - this.mouse.x;
            const dy = y_base - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 300;
            let mouseInfluence = 0;

            if (dist < maxDist) {
                // Subtle push effect
                mouseInfluence = (1 - dist / maxDist) * 40 * (index + 1) * 0.2;
            }
            
            // High-frequency math for "natural" ridges
            const wave1 = Math.sin(this.time + p.phase) * (20 - index * 3);
            const wave2 = Math.cos(this.time * 0.5 + p.offset) * 10;
            
            const finalY = y_base + wave1 + wave2 - mouseInfluence;

            if (i === 0) {
                this.ctx.lineTo(x, finalY);
            } else {
                this.ctx.lineTo(x, finalY);
            }
        }

        this.ctx.lineTo(this.width + 50, this.height);
        this.ctx.lineTo(-50, this.height);
        this.ctx.closePath();
        
        this.ctx.fillStyle = index === 4 ? 'rgba(37, 99, 235, 0.05)' : color;
        this.ctx.fill();

        // High-precision rim lighting (only on top edges)
        this.ctx.strokeStyle = index === 4 ? 'rgba(37, 99, 235, 0.2)' : `rgba(30, 41, 59, ${0.1 - index * 0.01})`;
        this.ctx.lineWidth = index === 4 ? 1 : 0.5;
        this.ctx.stroke();
    }

    setupListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.generatePoints();
        });
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = e.clientX;
            this.mouse.targetY = e.clientY;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DGZSovereignRidge();
});
