"use client";

import React, { useEffect, useRef } from "react";

export const CanvasParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Device capability detection
    const isMobile = window.innerWidth < 768;
    // Detect WebKit/Safari on iOS — most constrained browser
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // Limit DPR to max 1.25 for background particles: looks identical but saves 75% GPU overdraw on Retina
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Size canvas with DPR scaling
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // No mouse tracking on touch/iOS — it's pointless and causes main-thread jank
    const mouse = { x: width / 2, y: height / 2, radiusSq: 180 * 180, radius: 180 };
    let hasMouse = false;

    const handleMouseMove = (e: MouseEvent) => {
      hasMouse = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    if (!isMobile && !isIOS) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) requestAnimationFrame(render);
      else cancelAnimationFrame(animationFrameId);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Particle count: highly optimized for 60fps across all screens
    const numParticles = isIOS ? 8 : isMobile ? 12 : Math.min(Math.floor((width * height) / 36000), 22);

    const colors = ["#38bdf8", "#818cf8", "#34d399", "#c084fc"];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number;
    }[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.6 + 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    // Throttle to ~30fps on mobile/iOS for half the CPU budget, 60fps on desktop
    const targetInterval = isMobile || isIOS ? 1000 / 30 : 0;
    let lastFrameTime = 0;

    // Connection threshold (squared): 90px on mobile, 110px on desktop
    const connDistSq = isMobile || isIOS ? 8100 : 12100;
    const connDist = isMobile || isIOS ? 90 : 110;

    const render = (timestamp = 0) => {
      if (!isVisible) return;

      // Throttle framerate on mobile
      if (targetInterval > 0 && timestamp - lastFrameTime < targetInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      const particleCount = particles.length;

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        // Mouse proximity connection — only on desktop when mouse has moved
        if (hasMouse) {
          const dxm = mouse.x - p1.x;
          const dym = mouse.y - p1.y;
          const distSqMouse = dxm * dxm + dym * dym;
          if (distSqMouse < mouse.radiusSq) {
            const distMouse = Math.sqrt(distSqMouse);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - distMouse / mouse.radius) * 0.25;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Inter-particle connections
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#38bdf8";
            ctx.globalAlpha = (1 - dist / connDist) * 0.1;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-55"
    />
  );
};
