"use client"
import React, { useEffect, useRef } from 'react';

export default function MatrixCode({ color = '#00FF41', bg = 'transparent', height = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const fontSize = 20;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '0' : '1';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
  let animation: number;
    function loop() {
      draw();
      animation = requestAnimationFrame(loop);
    }
    loop();
  return () => cancelAnimationFrame(animation);
  }, [color, bg, height]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={height}
      style={{ width: '100%', height: height, display: 'block', background: bg }}
    />
  );
}
