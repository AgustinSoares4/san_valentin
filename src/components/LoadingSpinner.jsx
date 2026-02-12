import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-3 py-6"
    >
      <Loader2 className="h-8 w-8 animate-spin text-romantic-red" strokeWidth={2} />
      <p className="text-sm text-gray-600">Verifying...</p>
    </motion.div>
  )
}
