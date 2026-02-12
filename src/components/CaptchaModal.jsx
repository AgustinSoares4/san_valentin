import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { captchaImages } from '../data'
import CaptchaTile from './CaptchaTile'
import LoadingSpinner from './LoadingSpinner'

const VERIFY_DELAY_MS = 1500

export default function CaptchaModal({ onVerify, onClose }) {
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [verifying, setVerifying] = useState(false)
  const [incompleteMessage, setIncompleteMessage] = useState('')

  const toggleTile = (id) => {
    setIncompleteMessage('')
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleVerify = () => {
    if (selectedIds.size !== captchaImages.length) {
      setIncompleteMessage('te faltaron algunas, linda ;)')
      return
    }
    setIncompleteMessage('')
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      onVerify()
    }, VERIFY_DELAY_MS)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && !verifying && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-800 sm:text-base">
            Select all squares with: <strong>THE GIRL OF MY DREAMS</strong>
          </h2>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">
          <AnimatePresence mode="wait">
            {verifying ? (
              <LoadingSpinner key="spinner" />
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                {captchaImages.map((img) => (
                  <CaptchaTile
                    key={img.id}
                    image={img}
                    selected={selectedIds.has(img.id)}
                    onToggle={() => toggleTile(img.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {!verifying && incompleteMessage && (
            <p className="mt-3 text-center text-sm italic text-romantic-red">
              {incompleteMessage}
            </p>
          )}
        </div>
        {!verifying && (
          <div className="flex shrink-0 justify-end border-t border-gray-200 p-4">
            <button
              type="button"
              onClick={handleVerify}
              className="rounded bg-romantic-red px-6 py-2 text-sm font-medium text-white transition hover:bg-romantic-red-deep focus:outline-none focus:ring-2 focus:ring-romantic-red focus:ring-offset-2"
            >
              Verify
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
