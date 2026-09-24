import { useCallback, useEffect, useState } from 'react'

// ═══════════════════════════════════════════════════════════
// Mirrors the language pattern already used in src/App.tsx
// (same localStorage key, same lang/dir side effect) so the
// language choice stays in sync with the rest of the site even
// though these auth pages don't yet share a React context with
// the landing page (there's no router wiring them together yet).
// If you add React Router later, this can be lifted into one
// shared LanguageProvider with minimal changes.
// ═══════════════════════════════════════════════════════════

export type AuthLang = 'en' | 'ar'

const STORAGE_KEY = 'tripmonitor-language'

const AUTH_AR: Record<string, string> = {
  'AUTH · LIVE VIEW': 'المصادقة · عرض مباشر',

  'Welcome back': 'مرحباً بعودتك',
  'Track your fleet in real time.': 'تابع أسطولك لحظياً.',
  'Username or email': 'اسم المستخدم أو البريد الإلكتروني',
  Password: 'كلمة المرور',
  'Remember me': 'تذكرني',
  'Forgot password?': 'نسيت كلمة المرور؟',
  'Log In': 'تسجيل الدخول',
  'Logging in…': 'جارٍ تسجيل الدخول…',
  "Don't have an account?": 'ليس لديك حساب؟',
  'Sign up': 'إنشاء حساب',
  'Sign in': 'تسجيل الدخول',

  'Create your account': 'أنشئ حسابك',
  'Start monitoring your fleet in minutes.': 'ابدأ بمراقبة أسطولك خلال دقائق.',
  'Full name': 'الاسم الكامل',
  'Company (optional)': 'الشركة (اختياري)',
  'Confirm password': 'تأكيد كلمة المرور',
  'I agree with': 'أوافق على',
  'Terms of use': 'شروط الاستخدام',
  and: 'و',
  'Privacy policy': 'سياسة الخصوصية',
  'Create Account': 'إنشاء الحساب',
  'Creating account…': 'جارٍ إنشاء الحساب…',
  'Already have an account?': 'لديك حساب بالفعل؟',
  'Please accept the Terms of use and Privacy policy.': 'يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية.',

  'Connecting to satellite…': 'جارٍ الاتصال بالقمر الصناعي…',
  'Authenticating…': 'جارٍ التحقق من الهوية…',
  'Syncing fleet data…': 'جارٍ مزامنة بيانات الأسطول…',
  'Almost there…': 'على وشك الانتهاء…',
}

export function useAuthLanguage() {
  const [language, setLanguage] = useState<AuthLang>(() =>
    localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const t = useCallback(
    (text: string) => (language === 'ar' ? (AUTH_AR[text] ?? text) : text),
    [language]
  )

  return { language, setLanguage, t }
}
