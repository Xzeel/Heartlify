import { useMemo } from "react";

export function LoveBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 36,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 12,
        glowDuration: 2 + Math.random() * 3,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s, ${p.glowDuration}s`,
            animationDelay: `${p.delay}s, 0s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
