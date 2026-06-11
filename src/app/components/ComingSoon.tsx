import { motion } from 'motion/react';
import { Language, translations } from './i18n';

interface ComingSoonProps {
  lang: Language;
  tab: 'schedule' | 'messages';
}

function BeeSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 88 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 2L84 24V76L44 98L4 76V24L44 2Z" fill="#FEF3DC" stroke="#F5A62340" strokeWidth="1" />
      <ellipse cx="44" cy="56" rx="11" ry="16" fill="#0F1623" opacity="0.7" />
      <rect x="33" y="52" width="22" height="4.5" rx="2.25" fill="#F5A623" opacity="0.8" />
      <rect x="33" y="60" width="22" height="4.5" rx="2.25" fill="#F5A623" opacity="0.8" />
      <ellipse cx="44" cy="38" rx="8" ry="7" fill="#0F1623" opacity="0.7" />
      <line x1="39" y1="33" x2="34" y2="26" stroke="#0F1623" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="33" cy="25" r="2" fill="#0F1623" opacity="0.4" />
      <line x1="49" y1="33" x2="54" y2="26" stroke="#0F1623" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="55" cy="25" r="2" fill="#0F1623" opacity="0.4" />
      <ellipse cx="31" cy="47" rx="9" ry="5" fill="#E0E7FF" fillOpacity="0.9" transform="rotate(-18 31 47)" />
      <ellipse cx="57" cy="47" rx="9" ry="5" fill="#E0E7FF" fillOpacity="0.9" transform="rotate(18 57 47)" />
    </svg>
  );
}

export function ComingSoon({ lang, tab }: ComingSoonProps) {
  const t = translations[lang];
  const desc = tab === 'schedule' ? t.comingSoonSchedule : t.comingSoonMessages;

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <BeeSVG />
      </motion.div>

      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <h2
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#0F1623',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {t.comingSoon}
        </h2>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#6B7A99',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 280,
          }}
        >
          {desc}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span
          className="rounded-full px-4 py-1.5"
          style={{
            background: '#FEF3DC',
            color: '#D4891A',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid #F5A62340',
          }}
        >
          {lang === 'en' ? 'In Development' : lang === 'zh-CN' ? '开发中' : '開發中'}
        </span>
      </motion.div>
    </div>
  );
}
