const fs = require('fs');
const GIFEncoder = require('gif-encoder-2');
const PImage = require('pureimage');

const width = 600;
const height = 300;

const encoder = new GIFEncoder(width, height);
encoder.createReadStream().pipe(fs.createWriteStream('../apps/web/public/hero-animation.gif'));

encoder.start();
encoder.setRepeat(0);   
encoder.setDelay(40);   

const canvas = PImage.make(width, height);
const ctx = canvas.getContext('2d');

const frames = 60; // 2.4 seconds loop

for (let i = 0; i < frames; i++) {
    const progress = i / frames;
    const pulse = Math.sin(progress * Math.PI * 2);

    // Background (Navy)
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (Slate)
    ctx.fillStyle = 'rgba(30, 41, 59, 1)';
    for(let x = 0; x < width; x+=40) {
        ctx.fillRect(x, 0, 1, height);
    }
    for(let y = 0; y < height; y+=40) {
        ctx.fillRect(0, y, width, 1);
    }

    const cx = width / 2;
    const cy = height / 2;
    const size = 60;
    
    ctx.save();
    ctx.translate(cx, cy);
    // Floating effect
    ctx.translate(0, Math.sin(progress * Math.PI * 2) * 8); 
    
    // Rotation
    ctx.rotate(progress * Math.PI * 2);

    // Connectors (Purple)
    // PureImage stroke is sometimes weird, so we draw lines with fillRect logic or just use thick strokes
    ctx.strokeStyle = `rgba(139, 92, 246, 1)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -size); ctx.lineTo(size, 0);
    ctx.lineTo(0, size); ctx.lineTo(-size, 0);
    ctx.closePath();
    ctx.stroke();

    // Cross lines
    ctx.beginPath();
    ctx.moveTo(-size*1.5, 0); ctx.lineTo(size*1.5, 0);
    ctx.moveTo(0, -size*1.5); ctx.lineTo(0, size*1.5);
    ctx.stroke();

    // Glowing Nodes (Cyan)
    const nodeSize = 6 + (pulse * 2);
    ctx.fillStyle = '#38BDF8';
    const nodes = [
        [0, -size], [size, 0], [0, size], [-size, 0],
        [0, 0], [0, -size*1.5], [size*1.5, 0], [0, size*1.5], [-size*1.5, 0]
    ];
    for (const [nx, ny] of nodes) {
        ctx.beginPath();
        ctx.arc(nx, ny, nodeSize, 0, Math.PI*2, false);
        ctx.fill();
    }
    
    ctx.restore();

    // Sweeping scanline
    const scanY = (progress * height * 1.5) - (height * 0.25);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.fillRect(0, scanY, width, 6);

    encoder.addFrame(ctx);
}

encoder.finish();
console.log('GIF generated successfully!');
