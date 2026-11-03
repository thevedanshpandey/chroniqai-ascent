import { useEffect, useRef } from "react";

interface BlackHoleCanvasProps {
  size?: "hero" | "story";
  className?: string;
}

export function BlackHoleCanvas({ size = "hero", className = "" }: BlackHoleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let rotation = 0;

    const isMobile = window.innerWidth < 768;
    const isHero = size === "hero";
    const particleCount = prefersReducedMotion
      ? 15
      : isMobile
      ? (isHero ? 28 : 18)
      : (isHero ? 65 : 40);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle system
    interface Particle {
      angle: number;
      radius: number;
      speed: number;
      radialSpeed: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ["#FFFFFF", "#E2E8F0", "#CBD5E1", "#B8C0D9"];

    const initParticle = (p?: Partial<Particle>): Particle => {
      const maxR = isHero ? Math.min(width, height) * 0.44 : Math.min(width, height) * 0.38;
      const minR = isHero ? Math.min(width, height) * 0.16 : Math.min(width, height) * 0.14;

      return {
        angle: p?.angle ?? Math.random() * Math.PI * 2,
        radius: p?.radius ?? minR + Math.random() * (maxR - minR),
        speed: (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : 1), // slow smooth rotation
        radialSpeed: 0.15 + Math.random() * 0.25, // slow inward spiral
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.15 + Math.random() * 0.65,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(initParticle());
    }

    // Scroll listener for story variant
    let scrollYOffset = 0;
    const handleScroll = () => {
      if (!isHero) {
        scrollYOffset = window.scrollY * 0.0003;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = isHero
        ? Math.min(width, height) * 0.15
        : Math.min(width, height) * 0.12;

      // 1. Soft Gravitational Lensing Outer Glow
      const outerGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.8, cx, cy, baseRadius * 2.8);
      outerGlow.addColorStop(0, "rgba(184, 192, 217, 0.18)");
      outerGlow.addColorStop(0.3, "rgba(226, 232, 240, 0.08)");
      outerGlow.addColorStop(0.7, "rgba(184, 192, 217, 0.03)");
      outerGlow.addColorStop(1, "rgba(3, 5, 8, 0)");

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Gravitational Lensing Rings (Soft Light Rings)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation * 0.4 + scrollYOffset);

      // Ring 1 - Lensing arc
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.75, baseRadius * 1.55, 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 192, 217, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ring 2 - Outer subtle ring
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 2.2, baseRadius * 1.95, -0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 3. Thin Glowing Silver & White Accretion Disk (Tilted Ellipse)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation + scrollYOffset);

      // Accretion disk glow
      const diskGrad = ctx.createLinearGradient(-baseRadius * 2.1, 0, baseRadius * 2.1, 0);
      diskGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      diskGrad.addColorStop(0.2, "rgba(184, 192, 217, 0.25)");
      diskGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.65)");
      diskGrad.addColorStop(0.8, "rgba(184, 192, 217, 0.25)");
      diskGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.9, baseRadius * 0.55, 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = diskGrad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#B8C0D9";
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Inner razor thin bright white edge
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.35, baseRadius * 0.4, 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;
      ctx.stroke();

      ctx.restore();

      // 4. Inward-Spiraling Particles
      const minRadius = baseRadius * 0.95;
      const maxRadius = isHero ? Math.min(width, height) * 0.44 : Math.min(width, height) * 0.38;

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.angle += p.speed;
          p.radius -= p.radialSpeed;

          // Respawn at outer edge when drawn into the event horizon
          if (p.radius < minRadius) {
            p.radius = maxRadius * (0.8 + Math.random() * 0.2);
            p.angle = Math.random() * Math.PI * 2;
            p.alpha = 0.2 + Math.random() * 0.6;
          }
        }

        // Project particle coordinate
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.7); // slight elliptical perspective

        // Fade particle as it approaches event horizon
        const distRatio = Math.max(0, Math.min(1, (p.radius - minRadius) / (maxRadius - minRadius)));
        const finalAlpha = p.alpha * Math.sin(distRatio * Math.PI * 0.85);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.85, finalAlpha));
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      // 5. Pure Black Core (Event Horizon) with clean border
      ctx.save();
      // Subtle horizon glow border
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 8;
      ctx.fill();

      // Sharp inner black core with zero transparency
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.98, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.shadowBlur = 0;
      ctx.fill();

      // Very thin event horizon rim
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      if (!prefersReducedMotion) {
        rotation += 0.0025;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [size]);

  return (
    <div
      className={`relative pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
