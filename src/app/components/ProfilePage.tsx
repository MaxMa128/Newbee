import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Wallet, FileText, Shield, Phone, Mail, Lock, LogOut, Plus, Minus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations, districts, jobCategories } from './i18n';

interface UserData {
  name: string;
  phone: string;
  gender: string;
  age: number;
}

type ProfileView = 'main' | 'settings' | 'wallet' | 'payout' | 'temp-pool' | 'job-history';

interface ProfilePageProps {
  lang: Language;
  user: UserData;
  onLogout: () => void;
}

const CARD_SHADOW = '0 1px 3px rgba(15,22,35,0.06), 0 4px 16px rgba(15,22,35,0.04)';
const CARD_BORDER = '1px solid rgba(15,22,35,0.06)';

const walletTxns = [
  { id: 1, type: 'in' as const, amount: 680, desc: { 'zh-HK': '工資入帳', 'zh-CN': '工资入账', en: 'Wage Deposit' }, job: { 'zh-HK': '餐廳服務員', 'zh-CN': '餐厅服务员', en: 'Restaurant Server' }, company: '大家樂', date: '2026-06-19' },
  { id: 2, type: 'out' as const, amount: 680, desc: { 'zh-HK': '出糧確認', 'zh-CN': '出粮确认', en: 'Payout Confirmed' }, job: { 'zh-HK': '邦芒公司', 'zh-CN': '邦芒公司', en: 'BM Platform' }, company: '', date: '2026-06-19' },
  { id: 3, type: 'in' as const, amount: 950, desc: { 'zh-HK': '工資入帳', 'zh-CN': '工资入账', en: 'Wage Deposit' }, job: { 'zh-HK': '倉務員', 'zh-CN': '仓务员', en: 'Warehouse Picker' }, company: 'SF Express', date: '2026-06-17' },
  { id: 4, type: 'in' as const, amount: 750, desc: { 'zh-HK': '工資入帳', 'zh-CN': '工资入账', en: 'Wage Deposit' }, job: { 'zh-HK': '展覽助理', 'zh-CN': '展览助理', en: 'Exhibition Assistant' }, company: 'HKCEC', date: '2026-06-14' },
  { id: 5, type: 'out' as const, amount: 2280, desc: { 'zh-HK': '出糧確認', 'zh-CN': '出粮确认', en: 'Payout Confirmed' }, job: { 'zh-HK': '邦芒公司', 'zh-CN': '邦芒公司', en: 'BM Platform' }, company: '', date: '2026-06-12' },
];

const jobHistoryItems = [
  { id: 1, title: { 'zh-HK': '展覽助理', 'zh-CN': '展览助理', en: 'Exhibition Assistant' }, company: 'HKCEC', district: { 'zh-HK': '灣仔', 'zh-CN': '湾仔', en: 'Wan Chai' }, date: '2026-06-12', status: 'scheduled' as const },
  { id: 2, title: { 'zh-HK': '倉務員', 'zh-CN': '仓务员', en: 'Warehouse Picker' }, company: 'SF Express', district: { 'zh-HK': '荃灣', 'zh-CN': '荃湾', en: 'Tsuen Wan' }, date: '2026-05-28', status: 'completed' as const },
  { id: 3, title: { 'zh-HK': '餐飲服務員', 'zh-CN': '餐饮服务员', en: 'Restaurant Server' }, company: '大家樂', district: { 'zh-HK': '旺角', 'zh-CN': '旺角', en: 'Mong Kok' }, date: '2026-05-15', status: 'rejected' as const },
  { id: 4, title: { 'zh-HK': '保安員', 'zh-CN': '保安员', en: 'Security Guard' }, company: 'Galaxy Security', district: { 'zh-HK': '將軍澳', 'zh-CN': '将军澳', en: 'Tseung Kwan O' }, date: '2026-05-01', status: 'completed' as const },
  { id: 5, title: { 'zh-HK': '零售店員', 'zh-CN': '零售店员', en: 'Retail Assistant' }, company: 'Uniqlo', district: { 'zh-HK': '觀塘', 'zh-CN': '观塘', en: 'Kwun Tong' }, date: '2026-04-18', status: 'pending' as const },
  { id: 6, title: { 'zh-HK': '派傳單推廣員', 'zh-CN': '派传单推广员', en: 'Promoter' }, company: 'MediaLink', district: { 'zh-HK': '深水埗', 'zh-CN': '深水埗', en: 'Sham Shui Po' }, date: '2026-04-05', status: 'completed' as const },
];

function SubPageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 shrink-0"
      style={{ borderBottom: '1px solid rgba(15,22,35,0.06)', background: '#FFFFFF' }}
    >
      <button
        onClick={onBack}
        className="flex items-center justify-center rounded-xl transition-colors"
        style={{ width: 36, height: 36, background: '#EEF1F8', border: 'none', cursor: 'pointer' }}
      >
        <ChevronLeft size={18} style={{ color: '#0F1623' }} />
      </button>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F1623', margin: 0 }}>{title}</h2>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px 0' }}>
      {text}
    </p>
  );
}

function SettingsRow({ label, value, action, onAction, isDestructive }: {
  label: string;
  value?: string;
  action: string;
  onAction?: () => void;
  isDestructive?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between py-3.5 px-4"
      style={{ borderBottom: '1px solid rgba(15,22,35,0.05)' }}
    >
      <div>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F1623', margin: 0 }}>{label}</p>
        {value && <p style={{ fontSize: '0.78rem', color: '#6B7A99', margin: '2px 0 0 0' }}>{value}</p>}
      </div>
      <button
        onClick={onAction}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: isDestructive ? '#D93025' : '#F5A623',
          padding: '4px 0',
        }}
      >
        {action}
      </button>
    </div>
  );
}

function StyledInput({
  label, value, onChange, type = 'text', placeholder,
}: { label?: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7A99' }}>{label}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: '12px 14px',
          borderRadius: '0.75rem',
          border: `1.5px solid ${focused ? '#F5A623' : 'rgba(15,22,35,0.1)'}`,
          fontSize: '0.9rem',
          color: '#0F1623',
          background: focused ? '#FFFFFF' : '#F7F8FC',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s, background 0.15s',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function MultiSelectDropdown({ label, options, selected, onToggle, placeholder }: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7A99' }}>{label}</span>
      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-full flex items-center justify-between rounded-xl px-4 py-3 transition-all"
          style={{
            background: '#F7F8FC',
            border: `1.5px solid ${open ? '#F5A623' : 'rgba(15,22,35,0.1)'}`,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '0.87rem', color: selected.length > 0 ? '#0F1623' : '#9CA3AF' }}>
            {selected.length > 0 ? selected.join(' · ') : placeholder}
          </span>
          <ChevronRight
            size={16}
            style={{ color: '#9CA3AF', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-1.5 rounded-xl overflow-hidden z-20"
              style={{ background: '#FFFFFF', boxShadow: '0 8px 32px rgba(15,22,35,0.12)', border: '1px solid rgba(15,22,35,0.08)', maxHeight: 220, overflowY: 'auto' }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onToggle(opt)}
                  className="w-full flex items-center justify-between px-4 py-2.5 transition-colors"
                  style={{ background: selected.includes(opt) ? '#EEF1F8' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#0F1623', textAlign: 'left' }}
                >
                  <span>{opt}</span>
                  {selected.includes(opt) && <span style={{ color: '#F5A623', fontWeight: 700, fontSize: '0.75rem' }}>✓</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Sub-views ──────────────────────────────────────────

function SettingsView({ lang, user, t, onLogout }: { lang: Language; user: UserData; t: ReturnType<typeof translations[Language]>; onLogout: () => void }) {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'none' }}>
      {/* Contact */}
      <div className="mb-5">
        <SectionLabel text={t.contactInfo} />
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '1rem',
            boxShadow: CARD_SHADOW,
            border: CARD_BORDER,
            overflow: 'hidden',
          }}
        >
          <SettingsRow label={t.phoneRow} value={user.phone} action={t.changePhone} />
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(15,22,35,0.05)' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F1623', marginBottom: 8 }}>{t.emailRow}</p>
            <div className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '0.6rem', border: '1.5px solid rgba(15,22,35,0.1)', fontSize: '0.85rem', background: '#F7F8FC', outline: 'none', fontFamily: 'inherit', color: '#0F1623' }}
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5A623', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.bindAction}</button>
            </div>
          </div>
          <div className="px-4 py-3">
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F1623', marginBottom: 8 }}>WhatsApp</p>
            <div className="flex gap-2">
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder={t.whatsappPlaceholder}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '0.6rem', border: '1.5px solid rgba(15,22,35,0.1)', fontSize: '0.85rem', background: '#F7F8FC', outline: 'none', fontFamily: 'inherit', color: '#0F1623' }}
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5A623', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.bindAction}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <SectionLabel text={t.passwordSettings} />
        <div style={{ background: '#FFFFFF', borderRadius: '1rem', boxShadow: CARD_SHADOW, border: CARD_BORDER, overflow: 'hidden' }}>
          <SettingsRow label={t.passwordSettings} value="••••••••" action={t.resetPassword} />
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full rounded-xl py-3 transition-all active:scale-[0.98]"
        style={{ background: 'transparent', border: '1.5px solid #D93025', color: '#D93025', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
      >
        {t.logout}
      </button>
    </div>
  );
}

function WalletView({ lang, t, onPayoutPress }: { lang: Language; t: ReturnType<typeof translations[Language]>; onPayoutPress: () => void }) {
  const pendingBalance = 2899;
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
      {/* Balance card */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#0F1623', boxShadow: '0 8px 32px rgba(15,22,35,0.2)' }}
      >
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: 8 }}>
          {t.pendingBalance}
        </p>
        <div className="flex items-end justify-between">
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            HK${pendingBalance.toLocaleString()}
          </span>
          <button
            onClick={onPayoutPress}
            className="rounded-xl px-4 py-2 transition-all active:scale-95"
            style={{ background: '#F5A623', color: '#0F1623', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
          >
            {t.applyPayout}
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <SectionLabel text={t.transactions} />
        <div className="flex flex-col gap-2.5">
          {walletTxns.map((tx) => (
            <div
              key={tx.id}
              className="rounded-2xl p-4"
              style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: 36,
                    height: 36,
                    background: tx.type === 'in' ? '#DCFCE7' : '#FEE2E2',
                  }}
                >
                  {tx.type === 'in'
                    ? <Plus size={16} style={{ color: '#15803D' }} />
                    : <Minus size={16} style={{ color: '#D93025' }} />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F1623' }}>
                      {tx.desc[lang]}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: tx.type === 'in' ? '#15803D' : '#D93025' }}>
                      {tx.type === 'in' ? '+' : '−'}HK${tx.amount.toLocaleString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#6B7A99', margin: '3px 0 0 0' }}>
                    {tx.job[lang]}{tx.company ? ` · ${tx.company}` : ''}
                  </p>
                  <p style={{ fontSize: '0.73rem', color: '#9CA3AF', margin: '2px 0 0 0' }}>{tx.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="flex justify-center py-2">
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5A623', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <div className="flex items-center gap-1.5">
            <AlertCircle size={14} />
            {t.abnormalFeedback}
          </div>
        </button>
      </div>
    </div>
  );
}

function PayoutView({ lang, t, onBack }: { lang: Language; t: ReturnType<typeof translations[Language]>; onBack: () => void }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'cash' | 'bank'>('cash');
  const [bankDetails, setBankDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center rounded-full"
          style={{ width: 80, height: 80, background: '#DCFCE7' }}
        >
          <span style={{ fontSize: '2.5rem' }}>✓</span>
        </motion.div>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0F1623', textAlign: 'center' }}>
          {t.payoutSuccess}
        </p>
        <button
          onClick={onBack}
          className="rounded-xl px-8 py-2.5"
          style={{ background: '#F5A623', color: '#0F1623', border: 'none', cursor: 'pointer', fontWeight: 700 }}
        >
          {lang === 'en' ? 'Back to Wallet' : lang === 'zh-CN' ? '返回钱包' : '返回錢包'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
      <div
        className="rounded-2xl p-4 flex flex-col gap-4"
        style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER }}
      >
        <StyledInput
          label={t.payoutAmount}
          value={amount}
          onChange={setAmount}
          type="number"
          placeholder="HK$ 0"
        />

        {/* Payment method */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7A99', display: 'block', marginBottom: 10 }}>
            {t.paymentMethod}
          </span>
          <div className="flex gap-3">
            {(['cash', 'bank'] as const).map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setMethod(m)}
                  className="flex items-center justify-center rounded-full transition-all"
                  style={{
                    width: 18,
                    height: 18,
                    border: `2px solid ${method === m ? '#F5A623' : 'rgba(15,22,35,0.2)'}`,
                    background: method === m ? '#F5A623' : 'transparent',
                  }}
                >
                  {method === m && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFFFFF' }} />}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F1623' }}>
                  {m === 'cash' ? t.cash : t.bankTransfer}
                </span>
              </label>
            ))}
          </div>
        </div>

        {method === 'bank' && (
          <StyledInput
            label={t.bankDetails}
            value={bankDetails}
            onChange={setBankDetails}
            placeholder={t.bankDetailsPlaceholder}
          />
        )}

        <StyledInput
          label={t.notesLabel}
          value={notes}
          onChange={setNotes}
          placeholder={t.notesPlaceholder}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl py-3 transition-all"
          style={{ background: '#EEF1F8', color: '#6B7A99', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
        >
          {t.cancelBtn}
        </button>
        <button
          onClick={() => setSubmitted(true)}
          className="flex-2 rounded-xl py-3 transition-all active:scale-[0.98]"
          style={{ flex: 2, background: '#F5A623', color: '#0F1623', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}
        >
          {t.submitRequest}
        </button>
      </div>
    </div>
  );
}

function TempPoolView({ lang, t }: { lang: Language; t: ReturnType<typeof translations[Language]> }) {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(['灣仔', '中西區', '油尖旺']);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(['展覽活動', '飲食餐飲', '零售']);
  const [saved, setSaved] = useState(false);

  const allDistricts = districts[lang];
  const allJobTypes = jobCategories[lang];

  function toggleDistrict(d: string) {
    setSelectedDistricts((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }
  function toggleJobType(j: string) {
    setSelectedJobTypes((prev) => prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]);
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
      {/* Rules */}
      <div
        className="rounded-xl p-4"
        style={{ background: '#FFFBEB', border: '1px solid #F5A62340' }}
      >
        <p style={{ fontSize: '0.82rem', color: '#92580A', lineHeight: 1.65, margin: 0 }}>
          {t.tempPoolRules}
        </p>
      </div>

      <MultiSelectDropdown
        label={t.districtPref}
        options={allDistricts}
        selected={selectedDistricts}
        onToggle={toggleDistrict}
        placeholder={t.tempPoolDistrictPlaceholder}
      />

      <MultiSelectDropdown
        label={t.jobTypePref}
        options={allJobTypes}
        selected={selectedJobTypes}
        onToggle={toggleJobType}
        placeholder={t.tempPoolJobTypePlaceholder}
      />

      <div className="flex-1" />

      {saved ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl py-3 text-center"
          style={{ background: '#DCFCE7', color: '#15803D', fontWeight: 700, fontSize: '0.9rem' }}
        >
          ✓ {lang === 'en' ? 'Enabled!' : lang === 'zh-CN' ? '已开启！' : '已開啟！'}
        </motion.div>
      ) : (
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-xl py-3 transition-all"
            style={{ background: '#EEF1F8', color: '#6B7A99', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
          >
            {t.pauseBtn}
          </button>
          <button
            onClick={() => setSaved(true)}
            className="flex-2 rounded-xl py-3 transition-all active:scale-[0.98]"
            style={{ flex: 2, background: '#F5A623', color: '#0F1623', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}
          >
            {t.saveEnable}
          </button>
        </div>
      )}
    </div>
  );
}

function JobHistoryView({ lang, t }: { lang: Language; t: ReturnType<typeof translations[Language]> }) {
  const statusMap: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: t.statusPending, bg: '#FEF3DC', color: '#D4891A' },
    scheduled: { label: t.statusScheduled, bg: '#DCFCE7', color: '#15803D' },
    rejected: { label: t.statusRejected, bg: '#FEE2E2', color: '#D93025' },
    completed: { label: t.statusCompleted, bg: '#EEF1F8', color: '#6B7A99' },
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
      <p style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600 }}>
        {jobHistoryItems.length} {t.jobRecordCount}
      </p>
      {jobHistoryItems.map((item, i) => {
        const s = statusMap[item.status];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-2xl p-4"
            style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F1623', margin: 0 }}>
                  {item.title[lang]}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#6B7A99', margin: '3px 0 0 0' }}>
                  {item.company} · {item.district[lang]}
                </p>
                <p style={{ fontSize: '0.73rem', color: '#9CA3AF', margin: '3px 0 0 0' }}>
                  {item.date}
                </p>
              </div>
              <span
                className="shrink-0 rounded-lg px-2.5 py-1"
                style={{ background: s.bg, color: s.color, fontSize: '0.72rem', fontWeight: 700 }}
              >
                {s.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main profile view ──────────────────────────────────

function MainProfileView({ lang, user, t, onNavigate, onLogout }: {
  lang: Language;
  user: UserData;
  t: ReturnType<typeof translations[Language]>;
  onNavigate: (v: ProfileView) => void;
  onLogout: () => void;
}) {
  const initials = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
      {/* User card */}
      <div
        className="rounded-2xl p-4"
        style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER }}
      >
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 flex items-center justify-center rounded-2xl"
            style={{ width: 56, height: 56, background: '#FEF3DC', border: '2px solid #F5A62340' }}
          >
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D4891A' }}>{initials}</span>
          </div>
          <div className="flex-1">
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F1623', margin: 0 }}>{user.name}</h2>
            <p style={{ fontSize: '0.82rem', color: '#6B7A99', margin: '3px 0 0 0' }}>
              {user.gender} · {user.age}{lang === 'en' ? ' yrs' : '歲'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="rounded-xl px-3.5 py-2 transition-all"
            style={{ background: '#0F1623', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
          >
            {t.updateProfile}
          </button>
        </div>

        <div
          className="mt-4 pt-4 flex flex-col gap-2"
          style={{ borderTop: '1px solid rgba(15,22,35,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <Shield size={13} style={{ color: '#15803D', flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: '#15803D', fontWeight: 600 }}>{t.certifiedHKID}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={13} style={{ color: '#6B7A99', flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: '#6B7A99' }}>
              {lang === 'en' ? 'Bachelor\'s Degree' : lang === 'zh-CN' ? '本科' : '本科'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={13} style={{ color: '#6B7A99', flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: '#6B7A99' }}>
              {lang === 'en' ? 'Cantonese · Mandarin · English' : lang === 'zh-CN' ? '粤语、普通话、英语' : '廣東話、普通話、英語'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('job-history')}
          className="rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
          style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER, cursor: 'pointer' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <FileText size={13} style={{ color: '#6B7A99' }} />
            <span style={{ fontSize: '0.75rem', color: '#6B7A99', fontWeight: 600 }}>{t.jobHistory}</span>
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F1623', letterSpacing: '-0.02em' }}>68</span>
        </button>
        <button
          onClick={() => onNavigate('wallet')}
          className="rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
          style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER, cursor: 'pointer' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Wallet size={13} style={{ color: '#6B7A99' }} />
            <span style={{ fontSize: '0.75rem', color: '#6B7A99', fontWeight: 600 }}>{t.myWallet}</span>
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F1623', letterSpacing: '-0.02em' }}>HK$22,899</span>
        </button>
      </div>

      {/* Temp pool banner */}
      <button
        onClick={() => onNavigate('temp-pool')}
        className="rounded-2xl p-4 flex items-start justify-between gap-3 text-left transition-all active:scale-[0.99]"
        style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', cursor: 'pointer', boxShadow: CARD_SHADOW }}
      >
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#15803D', margin: '0 0 4px 0' }}>
            {t.tempPoolBanner}
          </p>
          <p style={{ fontSize: '0.78rem', color: '#166534', lineHeight: 1.5, margin: 0 }}>
            {t.tempPoolBannerSub}
          </p>
        </div>
        <ChevronRight size={16} style={{ color: '#15803D', flexShrink: 0, marginTop: 2 }} />
      </button>

      {/* Settings quick link */}
      <button
        onClick={() => onNavigate('settings')}
        className="rounded-2xl p-4 flex items-center justify-between transition-all active:scale-[0.99]"
        style={{ background: '#FFFFFF', boxShadow: CARD_SHADOW, border: CARD_BORDER, cursor: 'pointer' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: '#EEF1F8' }}>
            <Settings size={16} style={{ color: '#6B7A99' }} />
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F1623' }}>{t.accountSettings}</span>
        </div>
        <ChevronRight size={16} style={{ color: '#9CA3AF' }} />
      </button>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full rounded-xl py-3 transition-all active:scale-[0.98]"
        style={{ background: 'transparent', border: '1.5px solid rgba(15,22,35,0.12)', color: '#6B7A99', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
      >
        <div className="flex items-center justify-center gap-2">
          <LogOut size={15} />
          {t.logout}
        </div>
      </button>

      <div className="h-2" />
    </div>
  );
}

// ── ProfilePage orchestrator ───────────────────────────

export function ProfilePage({ lang, user, onLogout }: ProfilePageProps) {
  const t = translations[lang];
  const [stack, setStack] = useState<ProfileView[]>(['main']);

  const current = stack[stack.length - 1];
  const push = (v: ProfileView) => setStack((s) => [...s, v]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  const titles: Record<ProfileView, string> = {
    main: t.personalCenter,
    settings: t.accountSettings,
    wallet: t.myWallet,
    payout: t.payoutTitle,
    'temp-pool': t.tempPoolTitle,
    'job-history': t.jobHistoryTitle,
  };

  return (
    <div className="size-full flex flex-col overflow-hidden" style={{ background: '#F7F8FC' }}>
      {/* Header */}
      {current === 'main' ? (
        <div
          className="flex items-center justify-between px-4 py-4 shrink-0"
          style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(15,22,35,0.06)' }}
        >
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F1623', margin: 0 }}>
            {t.personalCenter}
          </h1>
          <button
            onClick={() => push('settings')}
            className="flex items-center justify-center rounded-xl transition-colors"
            style={{ width: 36, height: 36, background: '#EEF1F8', border: 'none', cursor: 'pointer' }}
          >
            <Settings size={17} style={{ color: '#6B7A99' }} />
          </button>
        </div>
      ) : (
        <SubPageHeader title={titles[current]} onBack={pop} />
      )}

      {/* Content with slide animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="flex-1 flex flex-col overflow-hidden"
          initial={{ opacity: 0, x: current === 'main' ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: current === 'main' ? -16 : 16 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {current === 'main' && (
            <MainProfileView lang={lang} user={user} t={t} onNavigate={push} onLogout={onLogout} />
          )}
          {current === 'settings' && (
            <SettingsView lang={lang} user={user} t={t} onLogout={onLogout} />
          )}
          {current === 'wallet' && (
            <WalletView lang={lang} t={t} onPayoutPress={() => push('payout')} />
          )}
          {current === 'payout' && (
            <PayoutView lang={lang} t={t} onBack={pop} />
          )}
          {current === 'temp-pool' && (
            <TempPoolView lang={lang} t={t} />
          )}
          {current === 'job-history' && (
            <JobHistoryView lang={lang} t={t} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
