import { useState, useRef, useEffect } from 'react'
import { SkipBack, SkipForward, Play, Pause, Volume1, Volume2 } from 'lucide-react'

const VOLUME_STEP = 0.15

export default function MiniPlayer({ tracks = [], sharedAudioRef }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)
  const didSkipInitialSrcRef = useRef(false)

  const total = tracks.length
  const currentTrack = total > 0 ? tracks[currentIndex] : null

  // Use shared Audio from parent (started on accept click) or create our own
  useEffect(() => {
    if (total === 0) return
    if (sharedAudioRef?.current) {
      audioRef.current = sharedAudioRef.current
      return () => {
        audioRef.current = null
      }
    }
    const audio = new Audio(tracks[0].src)
    audio.volume = volume
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [total, sharedAudioRef])

  // When track or play state changes, update src and play/pause (do not depend on volume)
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    // When using shared ref, parent already set src and started track 0; avoid resetting src on first run so the song does not restart
    const skipSrc = sharedAudioRef && currentIndex === 0 && !didSkipInitialSrcRef.current
    if (skipSrc) didSkipInitialSrcRef.current = true
    if (!skipSrc) audioRef.current.src = currentTrack.src
    audioRef.current.volume = volume
    if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false))
    else audioRef.current.pause()
  }, [currentIndex, currentTrack?.src, isPlaying, sharedAudioRef])

  // Volume only: update audio volume without touching src (so the song does not restart)
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // On ended: advance to next track (effect above will play if isPlaying)
  useEffect(() => {
    if (!audioRef.current || total === 0) return
    const audio = audioRef.current
    const onEnded = () => setCurrentIndex((i) => (i + 1) % total)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [total])

  const goPrev = () => {
    if (total === 0) return
    setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1))
  }

  const goNext = () => {
    if (total === 0) return
    setCurrentIndex((i) => (i + 1) % total)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const volumeDown = () => {
    const next = Math.max(0, volume - VOLUME_STEP)
    setVolume(next)
    if (audioRef.current) audioRef.current.volume = next
  }
  const volumeUp = () => {
    const next = Math.min(1, volume + VOLUME_STEP)
    setVolume(next)
    if (audioRef.current) audioRef.current.volume = next
  }

  if (total === 0) return null

  const buttonClass =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-romantic-red transition hover:bg-romantic-pink/20 focus:outline-none focus:ring-2 focus:ring-romantic-red focus:ring-offset-1'

  return (
    <div className="mt-5 w-full max-w-lg px-2">
      <div className="rounded-xl bg-white/80 p-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className="min-w-0 flex-1 truncate text-sm text-romantic-red-deep"
            title={currentTrack?.title}
          >
            {currentTrack?.title ?? '—'}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              className={buttonClass}
              aria-label="Anterior"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className={buttonClass}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={goNext}
              className={buttonClass}
              aria-label="Siguiente"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={volumeDown}
              className={buttonClass}
              aria-label="Bajar volumen"
            >
              <Volume1 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={volumeUp}
              className={buttonClass}
              aria-label="Subir volumen"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
