import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'en' | 'ar'

// Bilingual string lookup — English is the key, Arabic is the value
export const AR: Record<string, string> = {
  // Nav
  'Route Planner': 'تخطيط المسارات', 'Live Cockpit': 'المركبة المباشرة',
  'Geofences': 'السياج الجغرافي', 'ROI Calculator': 'حاسبة العائد',
  'REQUEST DEMO': 'اطلب عرضاً', 'SYSTEM NOMINAL': 'النظام يعمل بكفاءة',
  'Start Free Trial': 'ابدأ التجربة المجانية', 'Try the Demo ↓': 'جرّب العرض ↓',
  'vehicles live': 'مركبة متصلة', 'uptime SLA': 'جاهزية الخدمة',
  'update latency': 'زمن التحديث', 'EXPLORE BELOW': 'اكتشف المزيد',
  'Active Vehicles': 'المركبات النشطة', 'Routes Today': 'مسارات اليوم',
  'Km Tracked': 'كم تم تتبعها', 'Avg Speed': 'متوسط السرعة',
  'Fuel Saved': 'الوقود الموفر', 'On-Time Rate': 'نسبة الالتزام',
  'Alerts Resolved': 'تنبيهات معالجة', 'Uptime': 'وقت التشغيل',

  // Auth — Login
  'Sign in to your account': 'تسجيل الدخول إلى حسابك',
  'Monitor your fleet in real time.': 'راقب أسطولك في الوقت الفعلي.',
  'Email or username': 'البريد الإلكتروني أو اسم المستخدم',
  'Password': 'كلمة المرور',
  'Show password': 'إظهار كلمة المرور',
  'Hide password': 'إخفاء كلمة المرور',
  'Remember me': 'تذكرني',
  'Forgot password?': 'نسيت كلمة المرور؟',
  'Sign In': 'تسجيل الدخول',
  'Signing in…': 'جارٍ تسجيل الدخول…',
  "Don't have an account?": 'ليس لديك حساب؟',
  'Create one': 'إنشاء حساب',
  'This field is required.': 'هذا الحقل مطلوب.',
  'Please enter a valid email or username.': 'أدخل بريداً إلكترونياً أو اسم مستخدم صحيحاً.',
  'Password must be at least 8 characters.': 'يجب أن تكون كلمة المرور 8 أحرف على الأقل.',
  'Invalid credentials. Please try again.': 'بيانات الاعتماد غير صحيحة. حاول مرة أخرى.',
  'FLEET · AUTH': 'أسطول · المصادقة',
  'SECURE CONNECTION': 'اتصال آمن',
  'Back to home': 'العودة للرئيسية',
  'GPS TRACKING': 'تتبع GPS',
  'LIVE': 'مباشر',
  'SAT: 12': 'قمر: ١٢',
}

interface LanguageCtx {
  language: Language
  setLanguage: (l: Language) => void
  t: (text: string) => string
  isRTL: boolean
}

export const LanguageContext = createContext<LanguageCtx>({
  language: 'en',
  setLanguage: () => {},
  t: (s) => s,
  isRTL: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>('en')

  const setLanguage = (l: Language) => {
    setLang(l)
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', l)
  }

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en')
  }, [])

  const isRTL = language === 'ar'
  const t = (text: string): string => language === 'ar' ? (AR[text] ?? text) : text

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
