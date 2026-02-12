import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { config, carouselImages, playlist } from '../data'
import { useConfetti } from '../hooks/useConfetti'
import FallingPetals from './FallingPetals'
import MiniPlayer from './MiniPlayer'

export default function RomanticLanding() {
  const [accepted, setAccepted] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const sharedAudioRef = useRef(null)
  const { fire: fireConfetti } = useConfetti()

  const startAudio = () => {
    if (sharedAudioRef.current) return
    const src = config.acceptSound || playlist[0]?.src
    if (!src) return
    const audio = new Audio(src)
    audio.volume = 0.7
    sharedAudioRef.current = audio
    audio.play().catch(() => {})
  }

  const handleAccept = () => {
    if (accepted) return
    startAudio()
    setAccepted(true)
  }

  const totalSlides = carouselImages.length
  const goPrev = () =>
    setCarouselIndex((i) => (i === 0 ? totalSlides - 1 : i - 1))
  const goNext = () =>
    setCarouselIndex((i) => (i === totalSlides - 1 ? 0 : i + 1))

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-romantic-white-soft to-romantic-pink-light">
      <FallingPetals />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-xl flex-col items-center text-center"
        >
          {!accepted ? (
            <>
              <h1 className="font-script text-4xl text-romantic-red-deep sm:text-5xl">
                {config.loveMessage}
              </h1>
              <button
                type="button"
                onPointerDown={startAudio}
                onClick={handleAccept}
                className="mt-8 rounded-full bg-romantic-red px-10 py-4 font-medium text-white shadow-lg transition hover:bg-romantic-red-deep focus:outline-none focus:ring-2 focus:ring-romantic-red focus:ring-offset-2"
              >
                Si obvio!!
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={fireConfetti}
                className="mt-6 cursor-pointer select-none border-0 bg-transparent p-0 font-script text-4xl text-romantic-red-deep outline-none transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-romantic-red focus-visible:ring-offset-2 sm:text-5xl md:text-6xl"
              >
                Feliz San Valentín, {config.recipientName}!
              </button>
              <p className="mt-2 text-center text-xs text-gray-600">
                (Hacé click en el título para más confeti!)
              </p>
            </>
          )}
        </motion.section>

        {accepted && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex w-full max-w-2xl flex-col items-center"
          >
            <div className="relative w-full max-w-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={carouselImages[carouselIndex]?.id}
                    src={carouselImages[carouselIndex]?.src}
                    alt={carouselImages[carouselIndex]?.alt}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </div>
              {totalSlides > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-romantic-red shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-romantic-red"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-romantic-red shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-romantic-red"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <p className="mt-6 text-center font-script text-xl text-romantic-red-deep/90 sm:text-2xl md:text-3xl">
              Algunos de nuestros recuerdos. Y los que nos quedan...
            </p>

            <div className="mt-8 flex w-full justify-center">
              <MiniPlayer tracks={playlist} sharedAudioRef={sharedAudioRef} />
            </div>
          </motion.section>
        )}
      </main>
    </div>
  )
}
