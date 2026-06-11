import { Language } from './i18n';

export type JobType = 'full-time' | 'part-time' | 'casual';
export type SalaryPeriod = 'hourly' | 'daily' | 'monthly';

export interface Job {
  id: number;
  title: Record<Language, string>;
  company: string;
  store: Record<Language, string>;
  district: Record<Language, string>;
  mtr: Record<Language, string>;
  salary: number;
  salaryMax?: number;
  salaryPeriod: SalaryPeriod;
  jobType: JobType;
  isUrgent: boolean;
  isDailyPay: boolean;
  postedMinutes: number;
  logo: string;
  logoColor: string;
  category: Record<Language, string>;
  requirements: Record<Language, string[]>;
  remainingSpots: number;
  date: Record<Language, string>;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: { 'zh-HK': '展覽場地助理', 'zh-CN': '展览场地助理', en: 'Exhibition Hall Assistant' },
    company: 'HK Convention & Exhibition Centre',
    store: { 'zh-HK': '灣仔會展中心', 'zh-CN': '湾仔会展中心', en: 'HKCEC Wan Chai' },
    district: { 'zh-HK': '灣仔', 'zh-CN': '湾仔', en: 'Wan Chai' },
    mtr: { 'zh-HK': '灣仔站', 'zh-CN': '湾仔站', en: 'Wan Chai MTR' },
    salary: 80,
    salaryMax: 90,
    salaryPeriod: 'hourly',
    jobType: 'casual',
    isUrgent: true,
    isDailyPay: true,
    postedMinutes: 30,
    logo: 'H',
    logoColor: '#0F1623',
    category: { 'zh-HK': '展覽活動', 'zh-CN': '展览活动', en: 'Exhibition' },
    requirements: {
      'zh-HK': ['懂廣東話', '可即時上工'],
      'zh-CN': ['懂粤语', '可即时上岗'],
      en: ['Cantonese speaker', 'Immediate start'],
    },
    remainingSpots: 5,
    date: { 'zh-HK': '6月12日', 'zh-CN': '6月12日', en: 'Jun 12' },
  },
  {
    id: 2,
    title: { 'zh-HK': '餐飲服務員', 'zh-CN': '餐饮服务员', en: 'Restaurant Server' },
    company: '美食集團',
    store: { 'zh-HK': '銅鑼灣時代廣場', 'zh-CN': '铜锣湾时代广场', en: 'Times Square Causeway Bay' },
    district: { 'zh-HK': '銅鑼灣', 'zh-CN': '铜锣湾', en: 'Causeway Bay' },
    mtr: { 'zh-HK': '銅鑼灣站', 'zh-CN': '铜锣湾站', en: 'Causeway Bay MTR' },
    salary: 80,
    salaryMax: 90,
    salaryPeriod: 'hourly',
    jobType: 'part-time',
    isUrgent: false,
    isDailyPay: false,
    postedMinutes: 120,
    logo: '美',
    logoColor: '#E5A00D',
    category: { 'zh-HK': '飲食', 'zh-CN': '餐饮', en: 'F&B' },
    requirements: {
      'zh-HK': ['今日 18:00–23:00', '余2人'],
      'zh-CN': ['今日 18:00–23:00', '余2人'],
      en: ['Today 18:00–23:00', '2 spots left'],
    },
    remainingSpots: 2,
    date: { 'zh-HK': '今日', 'zh-CN': '今日', en: 'Today' },
  },
  {
    id: 3,
    title: { 'zh-HK': '店舖理貨員', 'zh-CN': '店铺理货员', en: 'Stock Replenisher' },
    company: '零售連鎖',
    store: { 'zh-HK': '銅鑼灣時代廣場', 'zh-CN': '铜锣湾时代广场', en: 'Times Square Causeway Bay' },
    district: { 'zh-HK': '沙田', 'zh-CN': '沙田', en: 'Sha Tin' },
    mtr: { 'zh-HK': '沙田站', 'zh-CN': '沙田站', en: 'Sha Tin MTR' },
    salary: 2500,
    salaryMax: 3000,
    salaryPeriod: 'monthly',
    jobType: 'full-time',
    isUrgent: false,
    isDailyPay: false,
    postedMinutes: 360,
    logo: '零',
    logoColor: '#374151',
    category: { 'zh-HK': '零售', 'zh-CN': '零售', en: 'Retail' },
    requirements: {
      'zh-HK': ['每週五天', '余1人'],
      'zh-CN': ['每周五天', '余1人'],
      en: ['5 days/week', '1 spot left'],
    },
    remainingSpots: 1,
    date: { 'zh-HK': '長期', 'zh-CN': '长期', en: 'Ongoing' },
  },
  {
    id: 4,
    title: { 'zh-HK': '倉務員（散工）', 'zh-CN': '仓务员（散工）', en: 'Warehouse Picker (Casual)' },
    company: 'SF Express 順豐速運',
    store: { 'zh-HK': '荃灣倉庫', 'zh-CN': '荃湾仓库', en: 'Tsuen Wan Warehouse' },
    district: { 'zh-HK': '荃灣', 'zh-CN': '荃湾', en: 'Tsuen Wan' },
    mtr: { 'zh-HK': '荃灣站', 'zh-CN': '荃湾站', en: 'Tsuen Wan MTR' },
    salary: 950,
    salaryPeriod: 'daily',
    jobType: 'casual',
    isUrgent: true,
    isDailyPay: true,
    postedMinutes: 15,
    logo: 'S',
    logoColor: '#E85D04',
    category: { 'zh-HK': '物流倉務', 'zh-CN': '物流仓储', en: 'Logistics' },
    requirements: {
      'zh-HK': ['能搬運重物', '自備安全鞋'],
      'zh-CN': ['能搬运重物', '自备安全鞋'],
      en: ['Heavy lifting required', 'Safety shoes needed'],
    },
    remainingSpots: 8,
    date: { 'zh-HK': '明日', 'zh-CN': '明日', en: 'Tomorrow' },
  },
  {
    id: 5,
    title: { 'zh-HK': '零售店員（兼職）', 'zh-CN': '零售店员（兼职）', en: 'Retail Assistant (Part-time)' },
    company: 'Uniqlo 優衣庫',
    store: { 'zh-HK': '觀塘apm', 'zh-CN': '观塘apm', en: 'Kwun Tong apm' },
    district: { 'zh-HK': '觀塘', 'zh-CN': '观塘', en: 'Kwun Tong' },
    mtr: { 'zh-HK': '觀塘站', 'zh-CN': '观塘站', en: 'Kwun Tong MTR' },
    salary: 72,
    salaryPeriod: 'hourly',
    jobType: 'part-time',
    isUrgent: false,
    isDailyPay: false,
    postedMinutes: 240,
    logo: 'U',
    logoColor: '#CC0000',
    category: { 'zh-HK': '零售', 'zh-CN': '零售', en: 'Retail' },
    requirements: {
      'zh-HK': ['英文流利', '週末可上班'],
      'zh-CN': ['英文流利', '周末可上班'],
      en: ['Fluent English', 'Weekend availability'],
    },
    remainingSpots: 3,
    date: { 'zh-HK': '週末', 'zh-CN': '周末', en: 'Weekend' },
  },
  {
    id: 6,
    title: { 'zh-HK': '保安員（夜班）', 'zh-CN': '保安员（夜班）', en: 'Security Guard (Night Shift)' },
    company: 'Galaxy Security',
    store: { 'zh-HK': '將軍澳商業中心', 'zh-CN': '将军澳商业中心', en: 'TKO Commercial Centre' },
    district: { 'zh-HK': '將軍澳', 'zh-CN': '将军澳', en: 'Tseung Kwan O' },
    mtr: { 'zh-HK': '坑口站', 'zh-CN': '坑口站', en: 'Hang Hau MTR' },
    salary: 16800,
    salaryPeriod: 'monthly',
    jobType: 'full-time',
    isUrgent: true,
    isDailyPay: false,
    postedMinutes: 60,
    logo: 'G',
    logoColor: '#1A3A6B',
    category: { 'zh-HK': '保安', 'zh-CN': '保安', en: 'Security' },
    requirements: {
      'zh-HK': ['保安員牌照（丙）', '可輪班'],
      'zh-CN': ['保安员牌照（丙）', '可轮班'],
      en: ['Security License (C)', 'Shift work'],
    },
    remainingSpots: 2,
    date: { 'zh-HK': '長期', 'zh-CN': '长期', en: 'Ongoing' },
  },
  {
    id: 7,
    title: { 'zh-HK': '地盤雜工（散工）', 'zh-CN': '地盘杂工（散工）', en: 'Construction Labourer' },
    company: 'Hip Hing Construction',
    store: { 'zh-HK': '元朗工地', 'zh-CN': '元朗工地', en: 'Yuen Long Site' },
    district: { 'zh-HK': '元朗', 'zh-CN': '元朗', en: 'Yuen Long' },
    mtr: { 'zh-HK': '元朗站', 'zh-CN': '元朗站', en: 'Yuen Long MTR' },
    salary: 1200,
    salaryPeriod: 'daily',
    jobType: 'casual',
    isUrgent: false,
    isDailyPay: true,
    postedMinutes: 360,
    logo: '協',
    logoColor: '#374151',
    category: { 'zh-HK': '建築', 'zh-CN': '建筑', en: 'Construction' },
    requirements: {
      'zh-HK': ['建造業安全卡', '體力充沛'],
      'zh-CN': ['建造业安全卡', '体力充沛'],
      en: ['CIC Safety Card', 'Good fitness'],
    },
    remainingSpots: 4,
    date: { 'zh-HK': '本週', 'zh-CN': '本周', en: 'This Week' },
  },
  {
    id: 8,
    title: { 'zh-HK': '派傳單推廣員', 'zh-CN': '派传单推广员', en: 'Promoter' },
    company: 'MediaLink Promotions',
    store: { 'zh-HK': '深水埗黃金商場', 'zh-CN': '深水埗黄金商场', en: 'Golden Centre Sham Shui Po' },
    district: { 'zh-HK': '深水埗', 'zh-CN': '深水埗', en: 'Sham Shui Po' },
    mtr: { 'zh-HK': '深水埗站', 'zh-CN': '深水埗站', en: 'Sham Shui Po MTR' },
    salary: 700,
    salaryPeriod: 'daily',
    jobType: 'casual',
    isUrgent: true,
    isDailyPay: true,
    postedMinutes: 20,
    logo: 'M',
    logoColor: '#9333EA',
    category: { 'zh-HK': '推廣活動', 'zh-CN': '推广活动', en: 'Promotions' },
    requirements: {
      'zh-HK': ['開朗有禮', '可即日上工'],
      'zh-CN': ['开朗有礼', '可即日上岗'],
      en: ['Outgoing personality', 'Immediate start'],
    },
    remainingSpots: 6,
    date: { 'zh-HK': '今日', 'zh-CN': '今日', en: 'Today' },
  },
];

export function formatTime(minutes: number, lang: Language): string {
  if (lang === 'en') {
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  }
  if (minutes < 60) return `${minutes}分鐘前`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}小時前`;
  return `${Math.floor(minutes / 1440)}天前`;
}
