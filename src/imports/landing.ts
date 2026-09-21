const strings = {
  en: {
    // Navbar
    nav_features:  'Features',
    nav_solutions: 'Solutions',
    nav_about:     'About',
    lang_toggle:   'عربي',
    dark_mode:     'Dark mode',
    light_mode:    'Light mode',
    cta_dashboard: 'Access Dashboard',
    cta_demo:      'Watch Demo',

    // Hero badge
    badge_platform: 'Fleet Intelligence Platform',
    badge_status:   'System Online',

    // Hero text
    hero_h1_a:    'Track every vehicle.',
    hero_h1_b:    'In real time.',
    hero_desc:    'TripMonitor gives Saudi enterprise fleet operators complete visibility across every vehicle, driver, and route — one intelligent platform built for the demands of modern logistics.',

    // Capability pills
    pill_gps:      'Real-Time GPS',
    pill_drivers:  'Driver Analytics',
    pill_fuel:     'Fuel Monitoring',
    pill_alerts:   'Smart Alerts',
    pill_reports:  'Fleet Reports',
    pill_security: 'Enterprise Security',

    // Dashboard overlay labels
    dash_live:    'Live',
    dash_active:  'Active',
    dash_idle:    'Idle',
    dash_offline: 'Offline',

    // Floating stat cards
    fcard_vehicles_label: 'Active Vehicles',
    fcard_vehicles_value: '847',
    fcard_vehicles_sub:   '+12 added today',
    fcard_uptime_label:   'System Uptime',
    fcard_uptime_value:   '99.8%',
    fcard_uptime_sub:     'All systems nominal',
    fcard_alert_label:    'Alerts',
    fcard_alert_value:    '3',
    fcard_alert_sub:      'Require attention',

    // Stats strip
    stats_h:        'Trusted by enterprises across Saudi Arabia',
    stat1_value:    '99.8%',
    stat1_label:    'Platform Uptime',
    stat2_value:    '24/7',
    stat2_label:    'Live Tracking',
    stat3_value:    '200+',
    stat3_label:    'Enterprise Clients',
    stat4_value:    '12,000+',
    stat4_label:    'Vehicles Tracked',

    // Features section
    feat_h:        'Everything your fleet demands',
    feat_sub:      'A complete suite of tools purpose-built for Saudi enterprise logistics operations.',
    feat1_title:   'Real-Time GPS Tracking',
    feat1_desc:    'Sub-second position updates across the Kingdom with full coverage on all major highways and urban centers.',
    feat2_title:   'Route Intelligence',
    feat2_desc:    'AI-optimized routing with live traffic, geofence triggers, and return-trip planning built in.',
    feat3_title:   'Driver Analytics',
    feat3_desc:    'Behavioral scoring, safety event detection, and performance history — per driver, per shift.',
    feat4_title:   'Fuel Monitoring',
    feat4_desc:    'Live consumption tracking with anomaly detection and instant theft alerts to fleet managers.',
    feat5_title:   'Geofence Alerts',
    feat5_desc:    'Create custom zones across any region and receive instant notifications on entry or exit.',
    feat6_title:   'Fleet Reporting',
    feat6_desc:    'Comprehensive Arabic and English reports, exportable and scheduled for any stakeholder.',

    // Trust strip
    trust_h:      'Powering fleet operations across the Kingdom',
    trust_cities: 'Mecca · Medina · Riyadh · Jeddah · Dammam',

    // Footer
    footer_tagline: 'Enterprise fleet intelligence for Saudi Arabia.',
    footer_copy:    '© 2025 TripMonitor. All rights reserved.',
    footer_features: 'Features',
    footer_solutions: 'Solutions',
    footer_privacy:  'Privacy Policy',
    footer_contact:  'Contact',
  },
  ar: {
    nav_features:  'المميزات',
    nav_solutions: 'الحلول',
    nav_about:     'من نحن',
    lang_toggle:   'English',
    dark_mode:     'الوضع الداكن',
    light_mode:    'الوضع الفاتح',
    cta_dashboard: 'الدخول للوحة التحكم',
    cta_demo:      'مشاهدة العرض',

    badge_platform: 'منصة ذكاء الأسطول',
    badge_status:   'النظام متاح',

    hero_h1_a:   'تتبّع كل مركبة.',
    hero_h1_b:   'في الوقت الفعلي.',
    hero_desc:   'TripMonitor يمنح مشغلي أساطيل المؤسسات السعودية رؤية شاملة لكل مركبة وسائق ومسار — منصة ذكية واحدة مصمَّمة لمتطلبات اللوجستيات الحديثة.',

    pill_gps:      'تتبع GPS مباشر',
    pill_drivers:  'تحليلات السائقين',
    pill_fuel:     'مراقبة الوقود',
    pill_alerts:   'تنبيهات ذكية',
    pill_reports:  'تقارير الأسطول',
    pill_security: 'أمان مؤسسي',

    dash_live:    'مباشر',
    dash_active:  'نشط',
    dash_idle:    'خامل',
    dash_offline: 'غير متصل',

    fcard_vehicles_label: 'المركبات النشطة',
    fcard_vehicles_value: '٨٤٧',
    fcard_vehicles_sub:   '+١٢ مضافة اليوم',
    fcard_uptime_label:   'وقت تشغيل النظام',
    fcard_uptime_value:   '٩٩.٨٪',
    fcard_uptime_sub:     'جميع الأنظمة تعمل',
    fcard_alert_label:    'تنبيهات',
    fcard_alert_value:    '٣',
    fcard_alert_sub:      'تستوجب المتابعة',

    stats_h:        'موثوق به من قبل الشركات في المملكة',
    stat1_value:    '٩٩.٨٪',
    stat1_label:    'وقت تشغيل المنصة',
    stat2_value:    '٢٤/٧',
    stat2_label:    'تتبع مباشر',
    stat3_value:    '+٢٠٠',
    stat3_label:    'عميل مؤسسي',
    stat4_value:    '+١٢٠٠٠',
    stat4_label:    'مركبة مُتتبَّعة',

    feat_h:        'كل ما يحتاجه أسطولك',
    feat_sub:      'مجموعة متكاملة من الأدوات المصمَّمة لعمليات اللوجستيات المؤسسية في المملكة.',
    feat1_title:   'تتبع GPS الفوري',
    feat1_desc:    'تحديثات الموقع بأقل من ثانية في أنحاء المملكة مع تغطية كاملة على الطرق السريعة والمراكز الحضرية.',
    feat2_title:   'ذكاء المسارات',
    feat2_desc:    'مسارات محسَّنة بالذكاء الاصطناعي مع حركة المرور الحية والمناطق الجغرافية وتخطيط رحلة العودة.',
    feat3_title:   'تحليلات السائقين',
    feat3_desc:    'تقييم السلوك والكشف عن أحداث السلامة وسجل الأداء — لكل سائق وكل وردية.',
    feat4_title:   'مراقبة الوقود',
    feat4_desc:    'تتبع الاستهلاك في الوقت الفعلي مع الكشف عن الشذوذات وتنبيهات السرقة الفورية.',
    feat5_title:   'تنبيهات المناطق الجغرافية',
    feat5_desc:    'أنشئ مناطق مخصصة في أي منطقة وتلقَّ إشعارات فورية عند الدخول أو الخروج.',
    feat6_title:   'تقارير الأسطول',
    feat6_desc:    'تقارير شاملة باللغتين العربية والإنجليزية، قابلة للتصدير والجدولة لأي مستفيد.',

    trust_h:      'تُشغِّل عمليات الأسطول في أنحاء المملكة',
    trust_cities: 'مكة المكرمة · المدينة المنورة · الرياض · جدة · الدمام',

    footer_tagline:   'ذكاء الأسطول المؤسسي للمملكة العربية السعودية.',
    footer_copy:      '© ٢٠٢٥ TripMonitor. جميع الحقوق محفوظة.',
    footer_features:  'المميزات',
    footer_solutions: 'الحلول',
    footer_privacy:   'سياسة الخصوصية',
    footer_contact:   'اتصل بنا',
  },
} as const

export type Lang = 'en' | 'ar'
export type LandingKey = keyof typeof strings.en
export { strings }
