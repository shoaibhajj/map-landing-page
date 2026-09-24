import { useEffect, useState } from 'react'
import AuthBackdrop from './AuthBackdrop'
import { useAuthLanguage } from './useAuthLanguage'

const PHASES = ['Connecting to satellite…', 'Authenticating…', 'Syncing fleet data…', 'Almost there…']

interface LoadingProps {
  /** Called once the splash has shown for durationMs. Omit to show it indefinitely. */
  onDone?: () => void
  durationMs?: number
}

export default function Loading({ onDone, durationMs = 2400 }: LoadingProps) {
  const { t } = useAuthLanguage()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const step = setInterval(() => setPhase(p => (p + 1) % PHASES.length), 650)
    const done = onDone ? setTimeout(onDone, durationMs) : undefined
    return () => {
      clearInterval(step)
      if (done) clearTimeout(done)
    }
  }, [onDone, durationMs])

  return (
    <div className="relative min-h-screen bg-ground flex items-center justify-center overflow-hidden">
      <AuthBackdrop className="opacity-40" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, #050d08 75%)' }}
      />

      <div className="relative flex flex-col items-center gap-6" style={{ animation: 'fade-up 0.6s ease both' }}>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-edge" />
          <div
            className="absolute inset-0 rounded-full border-2 border-t-neon border-r-neon border-b-transparent border-l-transparent"
            style={{ animation: 'spin-slow 1.3s linear infinite', boxShadow: '0 0 20px #00ff6e44' }}
          />
          <div className="w-9 h-9 bg-neon flex items-center justify-center" style={{ boxShadow: '0 0 24px #00ff6e66' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ground">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>

        <div className="font-display font-bold text-xl text-text tracking-widest">TRIPMONITOR</div>

        <div className="font-mono text-xs text-neon h-4" key={phase} style={{ animation: 'count-tick 0.3s ease' }}>
          {t(PHASES[phase])}
        </div>
      </div>
    </div>
  )
}
