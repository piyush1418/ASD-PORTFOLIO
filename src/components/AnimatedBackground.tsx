import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  theme?: 'dark' | 'light';
}

export function AnimatedBackground({ theme = 'dark' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const codeSymbols = ['{', '}', '<', '>', '/', '*', ';', '=', '+', '-'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      baseOpacity: number;
      angle: number;
      angleSpeed: number;
      symbol: string;
      phaseX: number;
      phaseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseVx = (Math.random() - 0.5) * 0.2; // Slower base speed
        this.baseVy = (Math.random() - 0.5) * 0.2;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 1.0 + 0.2; // Slightly smaller
        this.baseOpacity = Math.random() * 0.08 + 0.02; // More subtle opacity
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.01;
        this.symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
      }

      update(t: number) {
        this.angle += this.angleSpeed;
        
        // Add dynamic, wave-like movement
        this.vx = this.baseVx + Math.cos(this.angle) * 0.05 + Math.sin(t * 0.001 + this.phaseX) * 0.1;
        this.vy = this.baseVy + Math.sin(this.angle) * 0.05 + Math.cos(t * 0.001 + this.phaseY) * 0.1;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.x > canvas!.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas!.height + 50;
        if (this.y > canvas!.height + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.radius * 8}px monospace`;
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(255, 255, 255, ${this.baseOpacity})` 
          : `rgba(0, 0, 0, ${this.baseOpacity * 0.5})`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 25 : 60; // Slightly fewer particles for subtlety
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Slightly longer connection distance
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            // More subtle lines
            const opacity = (0.03 - distance / 5000) * (particles[i].baseOpacity + particles[j].baseOpacity) * 5;
            if (opacity > 0) {
              ctx!.strokeStyle = theme === 'dark'
                ? `rgba(255, 255, 255, ${opacity})`
                : `rgba(0, 0, 0, ${opacity * 0.8})`;
              ctx!.lineWidth = 0.3;
              ctx!.stroke();
            }
          }
        }
      }
    };

    const drawBackground = () => {
      const gradient = ctx!.createLinearGradient(0, 0, canvas!.width, canvas!.height);
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(8, 8, 12, 1)'); // Slightly deeper dark
        gradient.addColorStop(0.5, 'rgba(12, 16, 24, 1)');
        gradient.addColorStop(1, 'rgba(8, 8, 12, 1)');
      } else {
        gradient.addColorStop(0, 'rgba(250, 250, 250, 1)'); // Softer light
        gradient.addColorStop(0.5, 'rgba(244, 244, 245, 1)');
        gradient.addColorStop(1, 'rgba(250, 250, 250, 1)');
      }
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
    };

    const animate = (timestamp: number) => {
      time = timestamp;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      drawBackground();

      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let staticResize: () => void;

    if (!prefersReducedMotion) {
      window.addEventListener('resize', resize);
      resize();
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Static fallback
      staticResize = () => {
        canvas!.width = window.innerWidth;
        canvas!.height = window.innerHeight;
        drawBackground();
        // Draw particles statically once
        particles.forEach(particle => particle.draw());
        drawLines();
      };
      window.addEventListener('resize', staticResize);
      resize(); // Initialize particles
      staticResize();
    }

    return () => {
      if (!prefersReducedMotion) {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
      } else {
        window.removeEventListener('resize', staticResize);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 transition-colors duration-500"
    />
  );
}
