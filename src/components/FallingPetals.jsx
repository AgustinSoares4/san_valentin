import { useMemo } from 'react'

const PETAL_COUNT = 12
const COLORS = ['#E8A0B5', '#F5C6D6', '#F8E1E7', '#B91C3C']

function PetalSvg() {
  return (
    <svg
      viewBox="0 0 24 40"
      className="h-6 w-4 text-romantic-pink-rose opacity-90"
      aria-hidden
    >
      <ellipse cx="12" cy="20" rx="10" ry="18" fill="currentColor" />
      <path
        d="M12 2 Q14 18 12 38 Q10 18 12 2"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}

export default function FallingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left: `${(i * 7 + 3) % 100}%`,
      delay: `${i * 0.8}s`,
      duration: 10 + (i % 4),
      color: COLORS[i % COLORS.length],
      rotation: i * 30,
    }))
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: '-5%',
            color: p.color,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <div
            className="animate-petal-fall"
            style={{
              animationDelay: p.delay,
              animationDuration: `${p.duration}s`,
            }}
          >
            <PetalSvg />
          </div>
        </div>
      ))}
    </div>
  )
}
