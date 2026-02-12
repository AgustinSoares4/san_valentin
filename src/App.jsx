import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { config } from './data'
import FakeRecaptcha from './components/FakeRecaptcha'
import CaptchaModal from './components/CaptchaModal'
import RomanticLanding from './components/RomanticLanding'

export default function App() {
  const [step, setStep] = useState('recaptcha') // 'recaptcha' | 'captcha_modal' | 'landing'
  const [modalOpen, setModalOpen] = useState(false)
  const [recaptchaChecked, setRecaptchaChecked] = useState(false)

  const openModal = () => {
    if (config.recaptchaSound) {
      new Audio(config.recaptchaSound).play().catch(() => {})
    }
    setRecaptchaChecked(true)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleVerified = () => {
    setModalOpen(false)
    setStep('landing')
  }

  return (
    <>
      {step === 'landing' ? (
        <RomanticLanding />
      ) : (
        <>
          <FakeRecaptcha checked={recaptchaChecked} onCheck={openModal} />
          <AnimatePresence>
            {modalOpen && (
              <CaptchaModal onVerify={handleVerified} onClose={closeModal} />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
