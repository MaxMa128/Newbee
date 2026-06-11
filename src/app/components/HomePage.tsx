import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, LANG_LABELS, LANG_NAMES, translations } from './i18n';
import { jobs } from './jobData';
import { JobCard } from './JobCard';
import { FilterSheet, FilterState, defaultFilters } from './FilterSheet';

interface HomePageProps {
  lang: Language;
  onLangChange: (l: Language) => void;
  onJobPress?: (jobId: number) => void;
}

const TABS: Array<'all' | 'full-time' | 'part-time' | 'casual'> = ['all', 'full-time', 'part-time', 'casual'];

function NewBeeLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <svg width="22" height="25" viewBox="0 0 88 100" fill="none">
        <path d="M44 2L84 24V76L44 98L4 76V24L44 2Z" fill="#F5A623" />
        <ellipse cx="44" cy="52" rx="12" ry="18" fill="#0F1623" />
        <rect x="32" y="48" width="24" height="5" rx="2.5" fill="#F5A623" />
        <rect x="32" y="57" width="24" height="5" rx="2.5" fill="#F5A623" />
        <ellipse cx="44" cy="33" rx="9" ry="8" fill="#0F1623" />
        <line x1="38" y1="27" x2="32" y2="20" stroke="#0F1623" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="31" cy="19" r="2.5" fill="#0F1623" />
        <line x1="50" y1="27" x2="56" y2="20" stroke="#0F1623" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="57" cy="19" r="2.5" fill="#0F1623" />
        <ellipse cx="30" cy="43" rx="10" ry="6" fill="white" fillOpacity="0.85" transform="rotate(-20 30 43)" />
        <ellipse cx="58" cy="43" rx="10" ry="6" fill="white" fillOpacity="0.85" transform="rotate(20 58 43)" />
        <circle cx="40" cy="33" r="2" fill="#F5A623" />
        <circle cx="48" cy="33" r="2" fill="#F5A623" />
      </svg>
      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F1623', letterSpacing: '-0.025em' }}>
        New<span style={{ color: '#F5A623' }}>Bee</span>
      </span>
    </div>
  );
}

export function HomePage({ lang, onLangChange, onJobPress }: HomePageProps) {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'all' | 'full-time' | 'part-time' | 'casual'>('all');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const tabLabels: Record<string, string> = {
    all: t.allTypes,
    'full-time': t.fullTime,
    'part-time': t.partTime,
    casual: t.casual,
  };

  const filteredJobs = useMemo(() => {
    let list = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title[lang].toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.district[lang].toLowerCase().includes(q)
      );
    }

    if (activeTab !== 'all') list = list.filter((j) => j.jobType === activeTab);
    if (filters.jobType !== 'all') list = list.filter((j) => j.jobType === filters.jobType);
    if (filters.urgent) list = list.filter((j) => j.isUrgent);
    if (filters.dailyPay) list = list.filter((j) => j.isDailyPay);
    if (filters.district) list = list.filter((j) => j.district[lang] === filters.district);

    if (filters.sortBy === 'salary') {
      list.sort((a, b) => {
        const toHr = (j: typeof a) =>
          j.salaryPeriod === 'hourly' ? j.salary : j.salaryPeriod === 'daily' ? j.salary / 8 : j.salary / 160;
        return toHr(b) - toHr(a);
      });
    } else {
      list.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return a.postedMinutes - b.postedMinutes;
      });
    }

    return list;
  }, [search, activeTab, filters, lang]);

  const hasActiveFilters =
    filters.jobType !== 'all' || filters.district !== '' || filters.urgent || filters.dailyPay || filters.sortBy !== 'latest';

  return (
    <div className="size-full flex flex-col overflow-hidden" style={{ background: '#F7F8FC' }}>

      {/* ── TOP BAR ── */}
      <div
        className="shrink-0 px-4 pt-4 pb-3"
        style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(15,22,35,0.06)', zIndex: 10 }}
      >
        {/* Row 1: NewBee logo + Lang switcher */}
        <div className="flex items-center justify-between mb-3">
          <NewBeeLogo />

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu((p) => !p)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5"
              style={{ background: '#EEF1F8', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F1623' }}>{LANG_LABELS[lang]}</span>
              <ChevronDown size={12} style={{ color: '#6B7A99' }} />
            </button>
            <AnimatePresence>
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                  <motion.div
                    className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50"
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    style={{ background: '#FFFFFF', boxShadow: '0 8px 32px rgba(15,22,35,0.15)', minWidth: 140, border: '1px solid rgba(15,22,35,0.08)' }}
                  >
                    {(['zh-HK', 'zh-CN', 'en'] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { onLangChange(l); setShowLangMenu(false); }}
                        className="w-full flex items-center justify-between px-4 py-2.5"
                        style={{ background: lang === l ? '#EEF1F8' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: lang === l ? 700 : 500, color: lang === l ? '#0F1623' : '#6B7A99' }}
                      >
                        <span>{LANG_NAMES[l]}</span>
                        {lang === l && <span style={{ fontSize: '0.7rem', color: '#F5A623', fontWeight: 700 }}>✓</span>}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2: Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl py-2.5 pl-9 pr-9 outline-none"
            style={{ background: '#F0F2F8', border: '1.5px solid transparent', fontSize: '0.875rem', color: '#0F1623', fontFamily: 'inherit', transition: 'border-color 0.15s, background 0.15s' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.background = '#FFFFFF'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#F0F2F8'; }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Row 3: Tabs + Filter */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="shrink-0 rounded-xl px-3.5 py-1.5 transition-all"
                style={{
                  background: activeTab === tab ? '#0F1623' : '#EEF1F8',
                  color: activeTab === tab ? '#FFFFFF' : '#6B7A99',
                  fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilter(true)}
            className="shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 relative"
            style={{ background: hasActiveFilters ? '#F5A623' : '#EEF1F8', color: hasActiveFilters ? '#0F1623' : '#6B7A99', border: 'none', cursor: 'pointer' }}
          >
            <SlidersHorizontal size={14} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{t.filterBtn}</span>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1" style={{ width: 8, height: 8, background: '#D4891A', borderRadius: '50%', border: '1.5px solid white', display: 'block' }} />
            )}
          </button>
        </div>
      </div>

      {/* ── FEED ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => onJobPress?.(job.id)}
              style={{ cursor: 'pointer' }}
            >
              <JobCard job={job} lang={lang} />
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="flex items-center justify-center rounded-2xl" style={{ width: 72, height: 72, background: '#EEF1F8' }}>
              <Search size={28} style={{ color: '#CBD1E1' }} />
            </div>
            <div className="text-center flex flex-col gap-1.5">
              <p style={{ fontSize: '0.9rem', color: '#6B7A99', fontWeight: 600 }}>{t.noResults}</p>
              <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{t.noResultsTip}</p>
            </div>
          </div>
        )}

        <div className="h-2" />
      </div>

      {/* Filter Sheet */}
      <AnimatePresence>
        {showFilter && (
          <FilterSheet lang={lang} onClose={() => setShowFilter(false)} onApply={setFilters} current={filters} />
        )}
      </AnimatePresence>
    </div>
  );
}
