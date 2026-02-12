import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CaptchaTile({ image, selected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`relative aspect-square w-full overflow-hidden rounded border-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-romantic-red focus:ring-offset-1 ${
        selected
          ? 'scale-95 border-blue-500 ring-2 ring-blue-500 ring-offset-1'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover"
        draggable={false}
        onError={(e) => {
          e.target.src = 'https://placehold.co/400x400/f5c6d6/9f1239?text=❤️'
        }}
      />
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-blue-500/30"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
            <Check className="h-6 w-6" strokeWidth={3} />
          </div>
        </motion.div>
      )}
    </motion.button>
  )
}
