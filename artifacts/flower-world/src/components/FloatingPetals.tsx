import { useEffect, useState } from 'react';

const FLOWER_COLORS = [
  '#ffb7c5', '#e6e6fa', '#ffd700', '#ff69b4',
  '#da70d6', '#fff0f5', '#ffc0cb', '#dda0dd',
];

const FlowerSVG = ({ color, size, rotation }: { color: string; size: number; rotation: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ transform: `rotate(${rotation}deg)`, display: 'block' }}
  >
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse
        key={angle}
        cx="20"
        cy="10"
        rx="5.5"
        ry="10"
        fill={color}
        opacity="0.82"
        transform={`rotate(${angle} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="5" fill="#ffd700" opacity="0.95" />
    <circle cx="20" cy="20" r="2.5" fill="#fff8dc" opacity="0.7" />
  </svg>
);

interface Flower {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  swayAmount: number;
}

const FloatingPetals = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    const generated: Flower[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 14 + Math.random() * 16,
      size: 14 + Math.random() * 22,
      color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      swayAmount: 30 + Math.random() * 50,
    }));
    setFlowers(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatFlower {
          0% {
            transform: translateY(110vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          5% { opacity: 1; }
          50% {
            transform: translateY(50vh) translateX(var(--sway)) rotate(var(--rot-half));
          }
          95% { opacity: 0.8; }
          100% {
            transform: translateY(-15vh) translateX(calc(var(--sway) * -0.5)) rotate(var(--rot-end));
            opacity: 0;
          }
        }
        .floating-flower {
          position: absolute;
          bottom: 0;
          animation: floatFlower linear infinite;
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {flowers.map((f) => (
          <div
            key={f.id}
            className="floating-flower"
            style={{
              left: `${f.left}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              ['--sway' as string]: `${f.swayAmount}px`,
              ['--rot-half' as string]: `${f.rotation + 180}deg`,
              ['--rot-end' as string]: `${f.rotation + 360}deg`,
            }}
          >
            <FlowerSVG color={f.color} size={f.size} rotation={f.rotation} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingPetals;
