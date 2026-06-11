import { useState } from 'react';
import { MapPin, Clock, Bookmark, BookmarkCheck, Users, ChevronRight } from 'lucide-react';
import { Language, translations } from './i18n';
import { Job, formatTime } from './jobData';

interface JobCardProps {
  job: Job;
  lang: Language;
}

export function JobCard({ job, lang }: JobCardProps) {
  const t = translations[lang];
  const [saved, setSaved] = useState(false);

  const salaryStr = job.salaryMax
    ? `HK$${job.salary}–${job.salaryMax}${t[job.salaryPeriod === 'hourly' ? 'hourlyUnit' : job.salaryPeriod === 'daily' ? 'dailyUnit' : 'monthlyUnit']}`
    : `HK$${job.salary.toLocaleString()}${t[job.salaryPeriod === 'hourly' ? 'hourlyUnit' : job.salaryPeriod === 'daily' ? 'dailyUnit' : 'monthlyUnit']}`;

  return (
    <div
      className="bg-card rounded-2xl p-4 transition-all duration-150 hover:shadow-md active:scale-[0.99]"
      style={{
        boxShadow: '0 1px 3px rgba(15,22,35,0.06), 0 4px 16px rgba(15,22,35,0.04)',
        border: '1px solid rgba(15,22,35,0.06)',
      }}
    >
      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.isUrgent && (
          <span className="rounded-md px-2 py-0.5" style={{ fontSize: '0.7rem', fontWeight: 700, background: '#FEF3DC', color: '#D4891A', border: '1px solid rgba(245,166,35,0.25)' }}>
            {t.urgentTag}
          </span>
        )}
        <span className="rounded-md px-2 py-0.5" style={{ fontSize: '0.7rem', fontWeight: 700, background: '#EEF1F8', color: '#1A2B4A', border: '1px solid rgba(15,22,35,0.08)' }}>
          {job.jobType === 'full-time' ? t.fullTimeTag : job.jobType === 'part-time' ? t.partTimeTag : t.casualTag}
        </span>
        {job.isDailyPay && (
          <span className="rounded-md px-2 py-0.5" style={{ fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#15803D', border: '1px solid rgba(21,128,61,0.18)' }}>
            {t.dailyPayTag}
          </span>
        )}
      </div>

      {/* Header: logo + title + save */}
      <div className="flex items-start gap-3">
        {/* Logo */}
        <div
          className="shrink-0 flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: job.logoColor + '16', border: `1.5px solid ${job.logoColor}22` }}
        >
          <span style={{ fontSize: '1rem', fontWeight: 800, color: job.logoColor }}>{job.logo}</span>
        </div>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F1623', lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em' }}>
            {job.title[lang]}
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#6B7A99', fontWeight: 500, margin: '2px 0 0' }}>
            {job.company}
          </p>
          <p style={{ fontSize: '0.74rem', color: '#9CA3AF', margin: '1px 0 0' }}>
            {job.store[lang]}
          </p>
        </div>

        {/* Save + chevron */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
            className="p-1 rounded-lg transition-colors"
            style={{ color: saved ? '#F5A623' : '#CBD1E1', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label={saved ? t.saved : t.save}
          >
            {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
          </button>
          <ChevronRight size={15} style={{ color: '#CBD1E1', marginTop: 4 }} />
        </div>
      </div>

      {/* Location + meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', color: '#6B7A99' }}>
            {job.district[lang]} · {job.mtr[lang]}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
            {job.date[lang]} · {formatTime(job.postedMinutes, lang)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
            {t.spotsLeft}{job.remainingSpots}{lang !== 'en' ? '人' : ''}
          </span>
        </div>
      </div>

      {/* Salary */}
      <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(15,22,35,0.05)' }}>
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F1623', letterSpacing: '-0.02em' }}>
          {salaryStr}
        </span>
      </div>
    </div>
  );
}
