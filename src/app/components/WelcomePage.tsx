import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Language, translations } from './i18n';

interface WelcomePageProps {
  lang: Language;
  onGetStarted: () => void;
}

function HexLogo() {
  return (
    <svg width="88" height="100" viewBox="0 0 88 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M44 2L84 24V76L44 98L4 76V24L44 2Z"
        fill="#F5A623"
        stroke="#F5A623"
        strokeWidth="0"
      />
      {/* Bee body */}
      <ellipse cx="44" cy="52" rx="12" ry="18" fill="#0F1623" />
      {/* Bee stripes */}
      <rect x="32" y="48" width="24" height="5" rx="2.5" fill="#F5A623" />
      <rect x="32" y="57" width="24" height="5" rx="2.5" fill="#F5A623" />
      {/* Bee head */}
      <ellipse cx="44" cy="33" rx="9" ry="8" fill="#0F1623" />
      {/* Antennae */}
      <line x1="38" y1="27" x2="32" y2="20" stroke="#0F1623" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="31" cy="19" r="2.5" fill="#0F1623" />
      <line x1="50" y1="27" x2="56" y2="20" stroke="#0F1623" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="57" cy="19" r="2.5" fill="#0F1623" />
      {/* Wings */}
      <ellipse cx="30" cy="43" rx="10" ry="6" fill="white" fillOpacity="0.85" transform="rotate(-20 30 43)" />
      <ellipse cx="58" cy="43" rx="10" ry="6" fill="white" fillOpacity="0.85" transform="rotate(20 58 43)" />
      {/* Eyes */}
      <circle cx="40" cy="33" r="2" fill="#F5A623" />
      <circle cx="48" cy="33" r="2" fill="#F5A623" />
    </svg>
  );
}

export function WelcomePage({ lang, onGetStarted }: WelcomePageProps) {
  const t = translations[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="size-full flex flex-col items-center justify-between overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg, #0F1623 0%, #1A2B4A 55%, #0F1E38 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(245,166,35,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Decorative hexagons */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none" style={{ transform: 'translate(30%, -20%)' }}>
        <svg width="320" height="370" viewBox="0 0 88 100" fill="none">
          <path d="M44 2L84 24V76L44 98L4 76V24L44 2Z" fill="#F5A623" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none" style={{ transform: 'translate(-30%, 20%)' }}>
        <svg width="240" height="280" viewBox="0 0 88 100" fill="none">
          <path d="M44 2L84 24V76L44 98L4 76V24L44 2Z" fill="#F5A623" />
        </svg>
      </div>

      {/* Top spacer */}
      <div className="flex-1" />

      {/* Center content */}
      <motion.div
        className="flex flex-col items-center gap-8 px-8"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 32 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HexLogo />
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="tracking-tight"
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            New
            <span style={{ color: '#F5A623' }}>Bee</span>
          </div>
          <div
            className="mt-1"
            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            {t.tagline}
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#F5A623',
              letterSpacing: '0.04em',
              lineHeight: 1.3,
            }}
          >
            {t.slogan}
          </div>
        </motion.div>
      </motion.div>

      <div className="flex-1" />

      {/* Bottom section */}
      <motion.div
        className="w-full px-6 pb-14 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Feature pills */}
        <div className="flex gap-3 flex-wrap justify-center">
          {(['🗓 靈活排班', '💰 快速出糧', '🔒 平台保障'] as const).map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.78rem',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={onGetStarted}
          className="w-full max-w-xs rounded-2xl transition-all duration-200 active:scale-95"
          style={{
            background: '#F5A623',
            color: '#0F1623',
            padding: '16px 0',
            fontSize: '1.05rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(245,166,35,0.4)',
            letterSpacing: '-0.01em',
          }}
        >
          {t.getStarted}
        </button>

        {/* Legal */}
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
          {t.poweredBy}
        </p>
      </motion.div>
    </div>
  );
}
