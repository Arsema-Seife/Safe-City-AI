import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let meteors: Meteor[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const createMeteor = () => {
      if (Math.random() > 0.995 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * canvas.width + 200,
          y: -20,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 8 + 4,
          opacity: 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw and update meteors
      createMeteor();
      meteors = meteors.filter((meteor) => {
        meteor.x -= meteor.speed;
        meteor.y += meteor.speed;
        meteor.opacity -= 0.005;

        if (meteor.opacity <= 0) return false;

        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x + meteor.length,
          meteor.y - meteor.length
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + meteor.length, meteor.y - meteor.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 dark:block hidden"
      style={{ opacity: 0.6 }}
    />
  );
}
