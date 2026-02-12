import confetti from 'canvas-confetti'

/**
 * Triggers a heart-shaped / romantic confetti burst.
 * canvas-confetti doesn't have a built-in heart shape, so we use
 * multiple bursts with red/pink colors for a "heart shower" effect.
 */
export function useConfetti() {
  const fire = () => {
    const count = 150
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#B91C3C', '#9F1239', '#E8A0B5', '#F5C6D6', '#FF69B4'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
      spread: 100,
      ticks: 200,
      gravity: 1,
      drift: 0.5,
      startVelocity: 35,
    }

    // Center burst
    confetti({
      ...defaults,
      particleCount: count,
    })

    // Left and right bursts for a fuller effect
    confetti({
      ...defaults,
      particleCount: count * 0.6,
      origin: { x: 0.2, y: 0.6 },
      spread: 80,
    })
    confetti({
      ...defaults,
      particleCount: count * 0.6,
      origin: { x: 0.8, y: 0.6 },
      spread: 80,
    })

    // Delayed second wave
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: count * 0.5,
        origin: { x: 0.5, y: 0.5 },
        spread: 120,
        startVelocity: 25,
      })
    }, 200)
  }

  return { fire }
}
