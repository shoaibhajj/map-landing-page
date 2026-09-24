import { useState, type FormEvent } from 'react'
import AuthField from './AuthField'
import { useAuthLanguage } from './useAuthLanguage'
import AuthBackdrop from './AuthBackdrop'
import AuthBrandMark from './AuthBrandMark'

export default function Signup() {
  const { language, setLanguage, t } = useAuthLanguage()
  const [expanded, setExpanded] = useState(false)
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!expanded) {
      setExpanded(true)
      return
    }
    if (!agree) {
      setError(t('Please accept the Terms of use and Privacy policy.'))
      return
    }
    setError('')
    setLoading(true)
    // TODO: wire up to your real signup endpoint.
    setTimeout(() => setLoading(false), 1400)
  }

  return (
    <div className="relative min-h-screen bg-ground text-text font-body flex items-center justify-center px-6 overflow-hidden">
      <AuthBackdrop />

      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="absolute top-6 end-6 font-mono text-xs border border-edge px-3 py-2 text-neon hover:border-neon transition-colors"
        aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      >
        {language === 'en' ? 'العربية' : 'EN'}
      </button>

      {/* brand mark lives above the card, not inside it */}
      <div className="relative w-full max-w-sm flex flex-col items-center">
        <AuthBrandMark />

        <div
          className="w-full bg-surface border border-edge px-8 py-10 text-center"
          style={{ boxShadow: '0 0 60px #00ff6e14, 0 0 160px #00ff6e08' }}
        >
          <p className="font-body text-muted text-sm mb-7">{t('Start monitoring your fleet in minutes.')}</p>

          <form onSubmit={handleSubmit} noValidate className="text-start">
            <div
              style={{
                display: 'grid',
                gridTemplateRows: expanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div style={{ overflow: 'hidden', minHeight: 0 }}>
                <div
                  className="pt-1"
                  style={{
                    opacity: expanded ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    transitionDelay: expanded ? '0.1s' : '0s',
                  }}
                >
                  <AuthField label={t('Full name')} name="name" autoComplete="name" tabIndex={expanded ? 0 : -1} />
                  <AuthField
                    label={t('Username or email')}
                    name="identifier"
                    autoComplete="email"
                    tabIndex={expanded ? 0 : -1}
                  />
                  <AuthField
                    label={t('Company (optional)')}
                    name="company"
                    autoComplete="organization"
                    tabIndex={expanded ? 0 : -1}
                  />
                  <AuthField
                    label={t('Password')}
                    name="password"
                    isPassword
                    autoComplete="new-password"
                    tabIndex={expanded ? 0 : -1}
                  />
                  <AuthField
                    label={t('Confirm password')}
                    name="confirm"
                    isPassword
                    autoComplete="new-password"
                    tabIndex={expanded ? 0 : -1}
                  />
                  {error && <p className="font-mono text-xs text-red mb-4">{error}</p>}
                  <label className="flex items-start gap-2.5 font-mono text-xs text-muted mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={e => setAgree(e.target.checked)}
                      tabIndex={expanded ? 0 : -1}
                      className="w-3.5 h-3.5 mt-0.5 accent-[#00ff6e]"
                    />
                    <span>
                      {t('I agree with')}{' '}
                      <a href="/terms" className="text-neon hover:text-neon-dim transition-colors">
                        {t('Terms of use')}
                      </a>{' '}
                      {t('and')}{' '}
                      <a href="/privacy" className="text-neon hover:text-neon-dim transition-colors">
                        {t('Privacy policy')}
                      </a>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-display font-bold tracking-widest text-sm uppercase px-7 py-3.5 bg-neon text-ground hover:bg-neon-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ boxShadow: '0 0 24px #00ff6e22' }}
            >
              {loading ? (
                <>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 animate-spin" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  {t('Creating account…')}
                </>
              ) : (
                t('Create Account')
              )}
            </button>
          </form>

          <p className="font-mono text-xs text-muted mt-6">
            {t('Already have an account?')}{' '}
            <a href="/login" className="text-neon hover:text-neon-dim transition-colors">
              {t('Sign in')}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
