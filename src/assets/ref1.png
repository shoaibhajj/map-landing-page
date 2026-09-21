import { useState, useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import LandingPage from './LandingPage'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <LanguageProvider>
      <LandingPage darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
    </LanguageProvider>
  )
}
