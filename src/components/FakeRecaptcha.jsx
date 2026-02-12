import { motion } from 'framer-motion'
import { Check, Shield } from 'lucide-react'

export default function FakeRecaptcha({ checked, onCheck }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen items-center justify-center bg-romantic-white-soft p-4"
    >
      <div className="w-full max-w-md">
        <div className="rounded border border-gray-300 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={onCheck}
            className="flex w-full cursor-pointer items-center gap-3 rounded border-0 bg-transparent p-2 text-left outline-none focus:ring-0 min-h-[44px] touch-manipulation"
            aria-label="Verify you are the best girlfriend"
          >
            <div className="flex h-10 w-10 min-h-[40px] min-w-[40px] shrink-0 items-center justify-center rounded border-2 border-gray-400 bg-white">
              {checked ? (
                <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
              ) : null}
            </div>
            <span className="text-sm text-gray-700">
              Vamos a chequear si sos la mejor novia del mundo
            </span>
          </button>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Protected by reCAPTCHA</span>
            <span className="text-gray-400">-</span>
            <a href="#privacy" className="text-blue-600 hover:underline">
              Privacy
            </a>
            <span className="text-gray-400">-</span>
            <a href="#terms" className="text-blue-600 hover:underline">
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
