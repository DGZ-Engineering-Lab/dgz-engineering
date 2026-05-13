"use client";

import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { animate } from 'animejs';

export default function RealtimeDataStream() {
  const chartContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#64748b',
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.5)' },
        horzLines: { color: 'rgba(30, 41, 59, 0.5)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        visible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: '#06b6d4',
      topColor: 'rgba(6, 182, 212, 0.3)',
      bottomColor: 'rgba(6, 182, 212, 0)',
      lineWidth: 2,
    });

    let counter = 0;
    const interval = setInterval(() => {
      const value = 50 + Math.random() * 20 + Math.sin(counter / 10) * 10;
      areaSeries.update({ time: counter++, value });
    }, 500);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    // Anime.js animation on title
    if (textRef.current) {
        animate(textRef.current, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1500,
            easing: 'outExpo'
        });
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col gap-6 p-8 bg-slate-950/50 border border-slate-800 rounded-[2.5rem] backdrop-blur-xl">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Live_Data_Stream</span>
          </div>
          <h3 ref={textRef} className="text-2xl font-black text-white tracking-tight">
            Procesamiento de <span className="text-cyan-500">Nodos en Tiempo Real</span>
          </h3>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[9px] font-mono text-cyan-500">
          OPS/SEC: 1,240
        </div>
      </div>

      <div ref={chartContainerRef} className="flex-1 w-full" />

      <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => (
              <div key={i} className="p-4 bg-black/40 border border-slate-800 rounded-2xl">
                  <div className="text-[9px] font-mono text-slate-500 uppercase mb-1">Worker_0{i}</div>
                  <div className="text-sm font-bold text-slate-300">ACTIVO</div>
              </div>
          ))}
      </div>
    </div>
  );
}
