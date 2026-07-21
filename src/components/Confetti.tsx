import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      const newParticles = Array.from({ length: 60 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 200 + Math.random() * 400;
        return {
          id: i,
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity - 200, // bias upward
          rotate: Math.random() * 720,
          scale: Math.random() * 0.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.1
        };
      });
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-3 h-6 rounded-sm shadow-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: p.scale, rotate: p.rotate, opacity: 0 }}
          transition={{ duration: 1.5 + Math.random(), delay: p.delay, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
    </div>
  );
}
