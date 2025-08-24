"use client"
import React, { useEffect, useRef } from 'react';

export default function MatrixCode({ color = '#00FF41', bg = 'transparent', height = 80 }) {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = React.useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanvasWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const fontSize = 16;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      if (!ctx) return;
      // Gradyan arka plan
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#222');
      gradient.addColorStop(1, '#444');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      // Kod karakterleri ve yoğunluk
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`;
        ctx.font = fontSize + 'px monospace';
        // Karakter havuzu
        const chars = '01AI<>[]{}#@%$&';
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i] += Math.random() > 0.5 ? 2 : 1; // Daha hızlı ve yoğun akış
      }
    }
    let animation: number;
    function loop() {
      draw();
      animation = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(animation);
  }, [color, bg, height, canvasWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={height}
      style={{ width: '100%', height: height, display: 'block', background: bg }}
    />
  );
}
