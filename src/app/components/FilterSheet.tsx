import { useState } from 'react';
import { X } from 'lucide-react';
import { Language, translations, districts } from './i18n';

interface FilterSheetProps {
  lang: Language;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  current: FilterState;
}

export interface FilterState {
  jobType: 'all' | 'full-time' | 'part-time' | 'casual';
  district: string;
  sortBy: 'latest' | 'nearest' | 'salary';
  dailyPay: boolean;
  urgent: boolean;
}

export const defaultFilters: FilterState = {
  jobType: 'all',
  district: '',
  sortBy: 'latest',
  dailyPay: false,
  urgent: false,
};

export function FilterSheet({ lang, onClose, onApply, current }: FilterSheetProps) {
  const t = translations[lang];
  const [f, setF] = useState<FilterState>(current);

  const districtList = districts[lang];

  const Toggle = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="rounded-xl px-3.5 py-2 transition-all duration-150 active:scale-95"
      style={{
        background: active ? '#0F1623' : '#EEF1F8',
        color: active ? '#FFFFFF' : '#6B7A99',
        fontSize: '0.82rem',
        fontWeight: 600,
        border: active ? '1.5px solid #0F1623' : '1.5px solid transparent',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(15,22,35,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-t-3xl bg-card flex flex-col max-h-[85vh]"
        style={{ boxShadow: '0 -8px 40px rgba(15,22,35,0.15)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: '#E5E7EB' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F1623' }}>{t.filterTitle}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full transition-colors"
            style={{ background: '#EEF1F8', color: '#6B7A99', border: 'none', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-5">
          {/* Sort */}
          <section>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t.sortBy}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Toggle label={t.latestFirst} active={f.sortBy === 'latest'} onClick={() => setF({ ...f, sortBy: 'latest' })} />
              <Toggle label={t.nearestFirst} active={f.sortBy === 'nearest'} onClick={() => setF({ ...f, sortBy: 'nearest' })} />
              <Toggle label={t.highestSalary} active={f.sortBy === 'salary'} onClick={() => setF({ ...f, sortBy: 'salary' })} />
            </div>
          </section>

          {/* Job type */}
          <section>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t.jobType}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Toggle label={t.allTypes} active={f.jobType === 'all'} onClick={() => setF({ ...f, jobType: 'all' })} />
              <Toggle label={t.fullTime} active={f.jobType === 'full-time'} onClick={() => setF({ ...f, jobType: 'full-time' })} />
              <Toggle label={t.partTime} active={f.jobType === 'part-time'} onClick={() => setF({ ...f, jobType: 'part-time' })} />
              <Toggle label={t.casual} active={f.jobType === 'casual'} onClick={() => setF({ ...f, jobType: 'casual' })} />
            </div>
          </section>

          {/* Special tags */}
          <section>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {lang === 'en' ? 'Special' : '特別'}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Toggle label={`🔥 ${t.urgentTag}`} active={f.urgent} onClick={() => setF({ ...f, urgent: !f.urgent })} />
              <Toggle label={t.dailyPay} active={f.dailyPay} onClick={() => setF({ ...f, dailyPay: !f.dailyPay })} />
            </div>
          </section>

          {/* District */}
          <section>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9CA3AF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t.district}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setF({ ...f, district: '' })}
                className="rounded-xl py-2 transition-all"
                style={{
                  background: f.district === '' ? '#0F1623' : '#EEF1F8',
                  color: f.district === '' ? '#FFFFFF' : '#6B7A99',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t.allDistricts}
              </button>
              {districtList.map((d) => (
                <button
                  key={d}
                  onClick={() => setF({ ...f, district: d })}
                  className="rounded-xl py-2 transition-all"
                  style={{
                    background: f.district === d ? '#0F1623' : '#EEF1F8',
                    color: f.district === d ? '#FFFFFF' : '#6B7A99',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid rgba(15,22,35,0.06)' }}>
          <button
            onClick={() => setF(defaultFilters)}
            className="flex-1 rounded-xl py-3 transition-all"
            style={{
              background: '#EEF1F8',
              color: '#6B7A99',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t.reset}
          </button>
          <button
            onClick={() => { onApply(f); onClose(); }}
            className="flex-2 rounded-xl py-3 transition-all"
            style={{
              flex: 2,
              background: '#F5A623',
              color: '#0F1623',
              fontSize: '0.9rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
