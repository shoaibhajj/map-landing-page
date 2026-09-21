import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { strings, type Lang, type LandingKey } from '../i18n/landing'

interface LanguageCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: LandingKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageCtx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', l)
  }

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en')
  }, [])

  const isRTL = lang === 'ar'
  const t = (key: LandingKey): string => strings[lang][key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
