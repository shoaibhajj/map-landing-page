import { useState, useEffect, type CSSProperties, type ReactNode } from "react"
import { useLanguage } from "./contexts/LanguageContext"

// ── Tiny shared primitives ────────────────────────────────────────────────────

const glass = (opacity = 0.92): CSSProperties => ({
  background: `color-mix(in srgb, var(--card) ${Math.round(opacity * 100)}%, transparent)`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--border)",
})

function GreenDot({
  size = 8,
  animate = false,
}: {
  size?: number
  animate?: boolean
}) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--primary)",
        boxShadow: "0 0 8px var(--primary)",
        flexShrink: 0,
        ...(animate ? { animation: "livePulse 2s ease-in-out infinite" } : {}),
      }}
    />
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({
  darkMode,
  onToggleDark,
}: {
  darkMode: boolean
  onToggleDark: () => void
}) {
  const { t, lang, setLang, isRTL } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const navLinks = [
    { label: t("nav_features"), href: "#features" },
    { label: t("nav_solutions"), href: "#trust" },
    { label: t("nav_about"), href: "#footer" },
  ]

  const navBase: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 64,
    display: "flex",
    alignItems: "center",
    padding: "0 clamp(16px, 4vw, 48px)",
    gap: 16,
    flexDirection: isRTL ? "row-reverse" : "row",
    transition:
      "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
    ...(scrolled
      ? {
          ...glass(0.88),
          boxShadow: "0 1px 24px rgba(0,0,0,0.12)",
        }
      : {
          background: "transparent",
          border: "none",
        }),
  }

  const iconBtn: CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 9,
    border: "1px solid var(--border)",
    ...glass(0.7),
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--muted-foreground)",
    transition: "color 0.15s, border-color 0.15s, background 0.15s",
    flexShrink: 0,
  }

  return (
    <nav style={navBase}>
      {/* Logo */}
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="var(--primary)" />
          <path
            d="M16 5C11.03 5 7 9.03 7 14c0 6.5 9 17 9 17s9-10.5 9-17c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            fill="white"
          />
        </svg>
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "var(--foreground)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            TripMonitor
          </div>
          <div
            style={{
              fontSize: 9.5,
              fontWeight: 600,
              color: "var(--primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            GPS Platform
          </div>
        </div>
      </a>

      {/* Center nav links */}
      {!isMobile && (
        <div
          style={{ flex: 1, display: "flex", justifyContent: "center", gap: 4 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--muted-foreground)",
                textDecoration: "none",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)"
                e.currentTarget.style.background = "var(--secondary)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)"
                e.currentTarget.style.background = "transparent"
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
      {/* Right controls */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexShrink: 0,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        {/* Language */}
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          style={{
            ...iconBtn,
            width: "auto",
            padding: "0 13px",
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--primary)",
            letterSpacing: "0.01em",
          }}
        >
          {t("lang_toggle")}
        </button>

        {/* Dark mode */}
        <button
          onClick={onToggleDark}
          style={iconBtn}
          title={darkMode ? t("light_mode") : t("dark_mode")}
        >
          {darkMode ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* CTA */}
        <a
          href="https://dashboard.tripmonitor.nns.com.sa/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 18px",
            height: 38,
            borderRadius: 9,
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            fontSize: 13.5,
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.15s, transform 0.15s",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.88"
            e.currentTarget.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          {t("cta_dashboard")}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </nav>
  )
}

// ── Fleet Map SVG (inside dashboard preview) ─────────────────────────────────

function FleetMapSVG() {
  const cities = [
    { x: 110, y: 68, label: "MDN", count: 142 },
    { x: 72, y: 148, label: "JED", count: 203 },
    { x: 262, y: 122, label: "RYD", count: 318 },
    { x: 382, y: 104, label: "DMM", count: 184 },
  ]

  return (
    <svg
      viewBox="0 0 460 210"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <radialGradient id="mapCenter" cx="55%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="lineGlow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="460" height="210" fill="#040c07" />
      <rect width="460" height="210" fill="url(#mapCenter)" />

      {/* Grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={`g-v${i}`}
          x1={i * 65.7}
          y1="0"
          x2={i * 65.7}
          y2="210"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`g-h${i}`}
          x1="0"
          y1={i * 52.5}
          x2="460"
          y2={i * 52.5}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}

      {/* Route lines — glow layer */}
      <path
        d="M 72,148 C 140,128 200,122 262,122"
        stroke="#22c55e"
        strokeWidth="3"
        opacity="0.08"
        strokeLinecap="round"
        filter="url(#lineGlow)"
      />
      <path
        d="M 110,68 C 175,88 218,105 262,122"
        stroke="#22c55e"
        strokeWidth="3"
        opacity="0.07"
        strokeLinecap="round"
        filter="url(#lineGlow)"
      />
      <path
        d="M 262,122 C 305,114 342,109 382,104"
        stroke="#22c55e"
        strokeWidth="3"
        opacity="0.08"
        strokeLinecap="round"
        filter="url(#lineGlow)"
      />

      {/* Route lines — crisp */}
      <path
        d="M 72,148 C 140,128 200,122 262,122"
        stroke="#16a34a"
        strokeWidth="1.5"
        opacity="0.75"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 110,68 C 175,88 218,105 262,122"
        stroke="#16a34a"
        strokeWidth="1.5"
        opacity="0.65"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 262,122 C 305,114 342,109 382,104"
        stroke="#16a34a"
        strokeWidth="1.5"
        opacity="0.80"
        strokeLinecap="round"
        fill="none"
      />

      {/* Moving vehicle dots with SMIL pulse */}
      {[
        { cx: 172, cy: 134, dur: "1.6s" },
        { cx: 196, cy: 92, dur: "2.1s" },
        { cx: 322, cy: 113, dur: "1.4s" },
      ].map((v, i) => (
        <g key={i}>
          <circle cx={v.cx} cy={v.cy} r="7" fill="#22c55e" opacity="0.12">
            <animate
              attributeName="r"
              values="7;13;7"
              dur={v.dur}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.12;0;0.12"
              dur={v.dur}
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={v.cx}
            cy={v.cy}
            r="4"
            fill="#22c55e"
            filter="url(#dotGlow)"
          >
            <animate
              attributeName="opacity"
              values="1;0.65;1"
              dur={v.dur}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* City nodes */}
      {cities.map((city) => (
        <g key={city.label}>
          <circle
            cx={city.x}
            cy={city.y}
            r="11"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.35"
          />
          <circle
            cx={city.x}
            cy={city.y}
            r="5.5"
            fill="#16a34a"
            filter="url(#dotGlow)"
          />
          <text
            x={city.x}
            y={city.y - 17}
            textAnchor="middle"
            fontSize="7.5"
            fill="#4ade80"
            fontFamily="'JetBrains Mono', monospace"
            opacity="0.85"
            letterSpacing="0.5"
          >
            {city.label}
          </text>
          <text
            x={city.x}
            y={city.y + 24}
            textAnchor="middle"
            fontSize="6.5"
            fill="rgba(255,255,255,0.35)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {city.count}
          </text>
        </g>
      ))}

      {/* Idle dots (amber) */}
      {[
        { cx: 77, cy: 158 },
        { cx: 270, cy: 138 },
      ].map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="3"
          fill="#f59e0b"
          opacity="0.75"
        />
      ))}

      {/* Offline dot */}
      <circle cx="378" cy="113" r="2.5" fill="#6b7280" opacity="0.55" />

      {/* Compass */}
      <g transform="translate(432,192)">
        <circle
          r="10"
          fill="rgba(22,163,74,0.08)"
          stroke="rgba(22,163,74,0.2)"
          strokeWidth="1"
        />
        <polygon points="0,-7 2,-2 0,0 -2,-2" fill="#ef4444" opacity="0.8" />
        <polygon points="0,7 2,2 0,0 -2,2" fill="rgba(255,255,255,0.25)" />
        <text
          textAnchor="middle"
          y="-10"
          fontSize="6"
          fill="rgba(255,255,255,0.4)"
          fontFamily="monospace"
        >
          N
        </text>
      </g>

      {/* Scale bar */}
      <g transform="translate(16,198)">
        <line
          x1="0"
          y1="0"
          x2="56"
          y2="0"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="-3"
          x2="0"
          y2="3"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <line
          x1="56"
          y1="-3"
          x2="56"
          y2="3"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <text
          x="28"
          y="-6"
          textAnchor="middle"
          fontSize="6"
          fill="rgba(255,255,255,0.28)"
          fontFamily="monospace"
        >
          500 km
        </text>
      </g>
    </svg>
  )
}

// ── Dashboard Preview Card ────────────────────────────────────────────────────

function DashboardPreview({ isRTL }: { isRTL: boolean }) {
  const { t } = useLanguage()
  const [hovered, setHovered] = useState(false)

  const tiltBase = isRTL
    ? "perspective(1100px) rotateY(9deg) rotateX(3.5deg)"
    : "perspective(1100px) rotateY(-9deg) rotateX(3.5deg)"
  const tiltHover = isRTL
    ? "perspective(1100px) rotateY(3deg) rotateX(1deg)"
    : "perspective(1100px) rotateY(-3deg) rotateX(1deg)"

  const floatCard = (style: CSSProperties, children: ReactNode) => (
    <div
      style={{
        position: "absolute",
        ...glass(0.85),
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.06) inset",
        zIndex: 10,
        minWidth: 150,
        ...style,
      }}
    >
      {children}
    </div>
  )

  const statNum: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 22,
    fontWeight: 700,
    color: "var(--foreground)",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  }
  const statLabel: CSSProperties = {
    fontSize: 10.5,
    fontWeight: 600,
    color: "var(--muted-foreground)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  }
  const statSub: CSSProperties = {
    fontSize: 10.5,
    color: "var(--muted-foreground)",
    marginTop: 1,
  }

  return (
    <div
      style={{
        position: "relative",
        padding: "30px 24px 38px",
        flexShrink: 0,
        maxWidth: 580,
        width: "100%",
      }}
    >
      {/* Floating card: Active Vehicles — top corner */}
      {floatCard(
        {
          top: -4,
          [isRTL ? "left" : "right"]: -12,
          animation: "float 5s ease-in-out infinite",
        },
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background:
                  "color-mix(in srgb, var(--primary) 15%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <span style={statLabel}>{t("fcard_vehicles_label")}</span>
          </div>
          <div style={statNum}>{t("fcard_vehicles_value")}</div>
          <div style={{ ...statSub, color: "var(--primary)", marginTop: 3 }}>
            ↑ {t("fcard_vehicles_sub")}
          </div>
        </div>,
      )}

      {/* Floating card: System Uptime — bottom corner */}
      {floatCard(
        {
          bottom: 4,
          [isRTL ? "right" : "left"]: -12,
          animation: "float 7s ease-in-out infinite",
          animationDelay: "2s",
        },
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background:
                  "color-mix(in srgb, var(--primary) 15%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span style={statLabel}>{t("fcard_uptime_label")}</span>
          </div>
          <div style={{ ...statNum, color: "var(--primary)" }}>
            {t("fcard_uptime_value")}
          </div>
          <div style={statSub}>{t("fcard_uptime_sub")}</div>
        </div>,
      )}

      {/* Floating alert card */}
      {floatCard(
        {
          top: "38%",
          [isRTL ? "right" : "left"]: -20,
          animation: "float 6s ease-in-out infinite",
          animationDelay: "1s",
          minWidth: 130,
          borderColor: "rgba(245,158,11,0.25)",
        },
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: "rgba(245,158,11,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#f59e0b",
                fontFamily: "var(--font-mono)",
                lineHeight: 1,
              }}
            >
              {t("fcard_alert_value")}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--muted-foreground)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {t("fcard_alert_label")}
            </div>
          </div>
        </div>,
      )}

      {/* Main dashboard card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(34,197,94,0.22)",
          boxShadow: [
            "0 32px 80px rgba(0,0,0,0.50)",
            "0 8px 32px rgba(0,0,0,0.30)",
            "0 0 0 1px rgba(34,197,94,0.08)",
            "0 0 60px rgba(22,163,74,0.08)",
            "inset 0 1px 0 rgba(255,255,255,0.06)",
          ].join(", "),
          transform: hovered ? tiltHover : tiltBase,
          transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          background: "#060e09",
          flexShrink: 0,
        }}
      >
        {/* Window bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            background: "rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <GreenDot animate />
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.03em",
              }}
            >
              TripMonitor — {t("dash_live")}
            </span>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {[
              "rgba(255,255,255,0.15)",
              "rgba(255,255,255,0.15)",
              "rgba(255,255,255,0.12)",
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <FleetMapSVG />

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.3)",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          {[
            { color: "#22c55e", count: "847", label: t("dash_active") },
            { color: "#f59e0b", count: "124", label: t("dash_idle") },
            { color: "#6b7280", count: "23", label: t("dash_offline") },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRight:
                  i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {s.count}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const { t, isRTL } = useLanguage()

  const pills = [
    t("pill_gps"),
    t("pill_drivers"),
    t("pill_fuel"),
    t("pill_alerts"),
    t("pill_reports"),
    t("pill_security"),
  ]

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding:
          "clamp(100px, 14vh, 140px) clamp(16px, 5vw, 64px) clamp(60px, 8vh, 100px)",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            opacity: 0.5,
          }}
        />
        {/* Green glow — behind hero text */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            [isRTL ? "right" : "left"]: "5%",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 14%, transparent) 0%, transparent 65%)",
            transform: "translate(-30%, -35%)",
          }}
        />
        {/* Green glow — behind dashboard */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            [isRTL ? "left" : "right"]: "0%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 65%)",
            transform: isRTL ? "translate(-50%, -30%)" : "translate(40%, -30%)",
          }}
        />
      </div>

      {/* Hero layout */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "clamp(40px, 5vw, 80px)",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: 560,
            ...(isRTL ? { marginLeft: "auto" } : { marginRight: "auto" }),
            order: isRTL ? 1 : 0,
          }}
        >
          {/* Badge pill */}
          <div
            className="anim-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px 6px 8px",
              borderRadius: 99,
              border:
                "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
              background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
              marginBottom: 28,
              alignSelf: isRTL ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "2px 9px",
                borderRadius: 99,
                background:
                  "color-mix(in srgb, var(--primary) 15%, transparent)",
              }}
            >
              <GreenDot size={6} animate />
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {t("badge_status")}
              </span>
            </div>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--muted-foreground)",
              }}
            >
              {t("badge_platform")}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="anim-fade-up delay-100"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              color: "var(--foreground)",
              marginBottom: 8,
            }}
          >
            {t("hero_h1_a")}
          </h1>
          <h1
            className="anim-fade-up delay-200"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              color: "var(--primary)",
              marginBottom: 28,
              textShadow:
                "0 0 40px color-mix(in srgb, var(--primary) 40%, transparent)",
            }}
          >
            {t("hero_h1_b")}
          </h1>

          {/* Description */}
          <p
            className="anim-fade-up delay-300"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
              lineHeight: 1.72,
              color: "var(--muted-foreground)",
              marginBottom: 32,
              maxWidth: 500,
            }}
          >
            {t("hero_desc")}
          </p>

          {/* Capability pills */}
          <div
            className="anim-fade-up delay-400"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginBottom: 36,
              justifyContent: isRTL ? "flex-end" : "flex-start",
            }}
          >
            {pills.map((pill) => (
              <span
                key={pill}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 11px",
                  borderRadius: 99,
                  border: "1px solid var(--border)",
                  background: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  transition:
                    "border-color 0.15s, color 0.15s, background 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--primary) 40%, transparent)"
                  e.currentTarget.style.color = "var(--primary)"
                  e.currentTarget.style.background =
                    "color-mix(in srgb, var(--primary) 8%, var(--secondary))"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)"
                  e.currentTarget.style.color = "var(--secondary-foreground)"
                  e.currentTarget.style.background = "var(--secondary)"
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="anim-fade-up delay-500"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            {/* Primary CTA */}
            <a
              href="https://dashboard.tripmonitor.nns.com.sa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 24px",
                height: 48,
                borderRadius: 11,
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.015em",
                boxShadow:
                  "0 4px 24px color-mix(in srgb, var(--primary) 35%, transparent)",
                transition: "opacity 0.15s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.90"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow =
                  "0 8px 32px color-mix(in srgb, var(--primary) 45%, transparent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow =
                  "0 4px 24px color-mix(in srgb, var(--primary) 35%, transparent)"
              }}
            >
              {t("cta_dashboard")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 22px",
                height: 48,
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--foreground)",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.015em",
                transition:
                  "border-color 0.15s, background 0.15s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--primary) 50%, transparent)"
                e.currentTarget.style.background = "var(--secondary)"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)"
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t("cta_demo")}
            </button>
          </div>
        </div>

        {/* Dashboard preview column */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            order: isRTL ? 0 : 1,
          }}
          className="anim-fade-up delay-300"
        >
          <DashboardPreview isRTL={isRTL} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="anim-fade-in delay-800"
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "var(--muted-foreground)",
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

// ── Stats Strip ───────────────────────────────────────────────────────────────

function StatsStrip() {
  const { t, isRTL } = useLanguage()

  const stats = [
    {
      value: t("stat1_value"),
      label: t("stat1_label"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      value: t("stat2_value"),
      label: t("stat2_label"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      value: t("stat3_value"),
      label: t("stat3_label"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      value: t("stat4_value"),
      label: t("stat4_label"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ]

  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        padding: "clamp(32px, 5vw, 56px) clamp(16px, 5vw, 64px)",
      }}
    >
      <p
        className="anim-fade-up"
        style={{
          textAlign: "center",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--muted-foreground)",
          marginBottom: 40,
        }}
      >
        {t("stats_h")}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          maxWidth: 960,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="anim-fade-up"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "clamp(16px, 3vw, 32px) 16px",
              borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              textAlign: "center",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                background:
                  "color-mix(in srgb, var(--primary) 10%, var(--secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
              }}
            >
              {s.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--foreground)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

const featureIcons = [
  // GPS
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>,
  // Route
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="5" cy="6" r="3" />
    <circle cx="19" cy="18" r="3" />
    <path d="M5 9c0 2.2.8 4.2 2.1 5.7L19 15" />
    <path d="M19 15c-2.1 0-4-.8-5.4-2.1L5 9" />
  </svg>,
  // Driver / person
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>,
  // Fuel gauge / droplet
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>,
  // Geofence / shield
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  // Reports / bar chart
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>,
]

function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    { titleKey: "feat1_title" as const, descKey: "feat1_desc" as const },
    { titleKey: "feat2_title" as const, descKey: "feat2_desc" as const },
    { titleKey: "feat3_title" as const, descKey: "feat3_desc" as const },
    { titleKey: "feat4_title" as const, descKey: "feat4_desc" as const },
    { titleKey: "feat5_title" as const, descKey: "feat5_desc" as const },
    { titleKey: "feat6_title" as const, descKey: "feat6_desc" as const },
  ]

  return (
    <section
      id="features"
      style={{
        padding: "clamp(64px, 10vh, 120px) clamp(16px, 5vw, 64px)",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2
          className="anim-fade-up"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "var(--foreground)",
            marginBottom: 14,
          }}
        >
          {t("feat_h")}
        </h2>
        <p
          className="anim-fade-up delay-100"
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
            color: "var(--muted-foreground)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          {t("feat_sub")}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 16,
        }}
      >
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={featureIcons[i]}
            title={t(f.titleKey)}
            desc={t(f.descKey)}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: ReactNode
  title: string
  desc: string
  delay: number
}) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className="anim-fade-up"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          padding: "clamp(20px, 2.5vw, 28px)",
          borderRadius: 14,
          border: `1px solid ${
            hov
              ? "color-mix(in srgb, var(--primary) 35%, transparent)"
              : "var(--border)"
          }`,
          background: hov
            ? "color-mix(in srgb, var(--primary) 4%, var(--card))"
            : "var(--card)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transition:
            "border-color 0.2s, background 0.2s, transform 0.25s, box-shadow 0.25s",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov
            ? "0 16px 48px rgba(0,0,0,0.14), 0 0 0 1px color-mix(in srgb, var(--primary) 15%, transparent)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 11,
            background: hov
              ? "color-mix(in srgb, var(--primary) 18%, var(--secondary))"
              : "var(--secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 15.5,
              fontWeight: 700,
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              marginBottom: 7,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.65,
              color: "var(--muted-foreground)",
            }}
          >
            {desc}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Trust Strip ───────────────────────────────────────────────────────────────

function TrustStrip() {
  const { t } = useLanguage()

  const cities = t("trust_cities").split(" · ")

  return (
    <section
      id="trust"
      style={{
        padding: "clamp(56px, 8vh, 96px) clamp(16px, 5vw, 64px)",
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Overline */}
        <div
          className="anim-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              width: 40,
              background: "var(--border)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Kingdom of Saudi Arabia
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              width: 40,
              background: "var(--border)",
            }}
          />
        </div>

        <h2
          className="anim-fade-up delay-100"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "var(--foreground)",
            marginBottom: 36,
            lineHeight: 1.15,
          }}
        >
          {t("trust_h")}
        </h2>

        {/* City pills */}
        <div
          className="anim-fade-up delay-200"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cities.map((city, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 99,
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                transition:
                  "border-color 0.2s, background 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--primary) 40%, transparent)"
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--primary) 6%, var(--secondary))"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)"
                e.currentTarget.style.background = "var(--secondary)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <GreenDot size={7} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                {city}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle map dots decoration */}
        <div
          className="anim-fade-in delay-400"
          style={{ marginTop: 48, position: "relative", height: 48 }}
        >
          <svg
            width="100%"
            height="48"
            viewBox="0 0 800 48"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {/* Connection lines */}
            <path
              d="M 160,24 C 240,10 320,10 400,24 C 480,38 560,38 640,24"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* City dots */}
            {[160, 280, 400, 520, 640].map((x, i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy="24"
                  r="10"
                  fill="color-mix(in srgb, var(--primary) 8%, var(--secondary))"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <circle cx={x} cy="24" r="4" fill="var(--primary)" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function FooterSection({
  darkMode,
  onToggleDark,
}: {
  darkMode: boolean
  onToggleDark: () => void
}) {
  const { t, lang, setLang, isRTL } = useLanguage()

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--border)",
        padding:
          "clamp(32px, 5vh, 56px) clamp(16px, 5vw, 64px) clamp(24px, 3vh, 40px)",
        background: "var(--card)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gap: 32,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          alignItems: "start",
        }}
      >
        {/* Brand column */}
        <div style={{ gridColumn: "1 / span 1" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 12,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="var(--primary)" />
              <path
                d="M16 5C11.03 5 7 9.03 7 14c0 6.5 9 17 9 17s9-10.5 9-17c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                fill="white"
              />
            </svg>
            <div
              style={{
                fontSize: 14.5,
                fontWeight: 800,
                color: "var(--foreground)",
                letterSpacing: "-0.025em",
              }}
            >
              TripMonitor
            </div>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              maxWidth: 240,
            }}
          >
            {t("footer_tagline")}
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button
              onClick={onToggleDark}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted-foreground)",
                transition: "color 0.15s",
              }}
            >
              {darkMode ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              style={{
                padding: "0 12px",
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              {t("lang_toggle")}
            </button>
          </div>
        </div>

        {/* Links */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            Platform
          </div>
          {[t("footer_features"), t("footer_solutions"), t("nav_about")].map(
            (link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13.5,
                  color: "var(--foreground)",
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
              >
                {link}
              </a>
            ),
          )}
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--muted-foreground)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            Legal
          </div>
          {[t("footer_privacy"), t("footer_contact")].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                display: "block",
                fontSize: 13.5,
                color: "var(--foreground)",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA box */}
        <div
          style={{
            padding: "22px 24px",
            borderRadius: 14,
            border:
              "1px solid color-mix(in srgb, var(--primary) 25%, transparent)",
            background:
              "color-mix(in srgb, var(--primary) 6%, var(--secondary))",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 8,
            }}
          >
            Ready to get started?
          </div>
          <p
            style={{
              fontSize: 12.5,
              color: "var(--muted-foreground)",
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            Access the TripMonitor dashboard or request a demo for your
            enterprise fleet.
          </p>
          <a
            href="https://dashboard.tripmonitor.nns.com.sa/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("cta_dashboard")}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto 0",
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
          {t("footer_copy")}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <GreenDot size={5} animate />
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  )
}

// ── Landing Page ──────────────────────────────────────────────────────────────

interface Props {
  darkMode: boolean
  onToggleDark: () => void
}

export default function LandingPage({ darkMode, onToggleDark }: Props) {
  return (
    <div
      style={{
        minHeight: "100%",
        background: "var(--background)",
        overflowX: "hidden",
      }}
    >
      <Navbar darkMode={darkMode} onToggleDark={onToggleDark} />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <TrustStrip />
      </main>
      <FooterSection darkMode={darkMode} onToggleDark={onToggleDark} />
    </div>
  )
}
