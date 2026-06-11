export type Language = 'zh-HK' | 'zh-CN' | 'en';

export const LANG_LABELS: Record<Language, string> = {
  'zh-HK': '繁',
  'zh-CN': '简',
  en: 'EN',
};

export const LANG_NAMES: Record<Language, string> = {
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文',
  en: 'English',
};

type T = {
  // Welcome
  welcome: string;
  slogan: string;
  tagline: string;
  getStarted: string;
  poweredBy: string;

  // Bottom nav
  findJobs: string;
  schedule: string;
  messages: string;
  profile: string;

  // Search & filter
  searchPlaceholder: string;
  filterBtn: string;
  sortBtn: string;
  allTypes: string;
  fullTime: string;
  partTime: string;
  casual: string;
  dailyPay: string;

  // Location
  locationLabel: string;
  allDistricts: string;

  // Job tags
  urgentTag: string;
  dailyPayTag: string;
  fullTimeTag: string;
  partTimeTag: string;
  casualTag: string;
  hourlyUnit: string;
  dailyUnit: string;
  monthlyUnit: string;

  // Job card
  applyNow: string;
  saved: string;
  save: string;
  postedAgo: string;
  spotsLeft: string;

  // Filter sheet
  filterTitle: string;
  jobType: string;
  district: string;
  salary: string;
  sortBy: string;
  latestFirst: string;
  nearestFirst: string;
  highestSalary: string;
  reset: string;
  confirm: string;

  // Feed
  noResults: string;
  noResultsTip: string;
  recommends: string;
  urgent: string;

  // Temp pool banner
  tempPoolBanner: string;
  tempPoolBannerSub: string;
  view: string;

  // Auth
  loginTitle: string;
  registerTitle: string;
  phoneNumber: string;
  phonePlaceholder: string;
  otpCode: string;
  otpPlaceholder: string;
  getOtp: string;
  resendIn: string;
  passwordLogin: string;
  otpLogin: string;
  passwordPlaceholder: string;
  agreeTerms: string;
  terms: string;
  privacy: string;
  loginBtn: string;
  switchToRegister: string;
  switchToLogin: string;
  setPassword: string;
  setPasswordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  fullName: string;
  fullNamePlaceholder: string;
  finishRegister: string;
  passwordHint: string;
  registerInfoTip: string;
  errorPhone: string;
  errorOtp: string;
  errorPassword: string;
  errorConfirm: string;
  errorName: string;
  errorAgree: string;

  // Profile
  personalCenter: string;
  updateProfile: string;
  certifiedHKID: string;
  notCertified: string;
  jobHistory: string;
  myWallet: string;
  pendingBalance: string;
  applyPayout: string;
  transactions: string;
  abnormalFeedback: string;
  logout: string;
  jobRecordCount: string;

  // Account settings
  accountSettings: string;
  contactInfo: string;
  phoneRow: string;
  emailRow: string;
  whatsappRow: string;
  changePhone: string;
  bindAction: string;
  unbindAction: string;
  passwordSettings: string;
  resetPassword: string;
  emailPlaceholder: string;
  whatsappPlaceholder: string;

  // Wallet & payout
  payoutTitle: string;
  payoutAmount: string;
  payoutAmountPlaceholder: string;
  paymentMethod: string;
  cash: string;
  bankTransfer: string;
  bankDetails: string;
  bankDetailsPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  cancelBtn: string;
  submitRequest: string;
  payoutSuccess: string;

  // Temp pool
  tempPoolTitle: string;
  tempPoolRules: string;
  districtPref: string;
  jobTypePref: string;
  saveEnable: string;
  pauseBtn: string;
  tempPoolDistrictPlaceholder: string;
  tempPoolJobTypePlaceholder: string;

  // Job history
  jobHistoryTitle: string;
  statusPending: string;
  statusScheduled: string;
  statusRejected: string;
  statusCompleted: string;

  // Coming soon
  comingSoon: string;
  comingSoonSchedule: string;
  comingSoonMessages: string;
};

export const translations: Record<Language, T> = {
  'zh-HK': {
    welcome: '歡迎使用',
    slogan: '工作好、出糧快',
    tagline: '香港最專業的靈活用工平台',
    getStarted: '立即搵工',
    poweredBy: '© 2026 NewBee 香港',

    findJobs: '首頁職位',
    schedule: '更期打卡',
    messages: '訊息中心',
    profile: '個人中心',

    searchPlaceholder: '搜尋職位 / 公司 / 門店 / 地區',
    filterBtn: '篩選',
    sortBtn: '排序',
    allTypes: '全部',
    fullTime: '全職',
    partTime: '兼職',
    casual: '臨時工',
    dailyPay: '日結',

    locationLabel: '香港',
    allDistricts: '全部地區',

    urgentTag: '急聘',
    dailyPayTag: '日結',
    fullTimeTag: '全職',
    partTimeTag: '兼職',
    casualTag: '臨時工',
    hourlyUnit: '/時',
    dailyUnit: '/日',
    monthlyUnit: '/月',

    applyNow: '立即申請',
    saved: '已收藏',
    save: '收藏',
    postedAgo: '前發佈',
    spotsLeft: '餘',

    filterTitle: '篩選條件',
    jobType: '工作類型',
    district: '地區',
    salary: '薪酬',
    sortBy: '排序方式',
    latestFirst: '最新優先',
    nearestFirst: '距離優先',
    highestSalary: '薪酬最高',
    reset: '重置',
    confirm: '確認',

    noResults: '暫無相關職位',
    noResultsTip: '試試擴大區域 / 放寬工作種類',
    recommends: '推薦職位',
    urgent: '急聘職位',

    tempPoolBanner: '建議加入臨時工候選池',
    tempPoolBannerSub: '開啟後，急聘僱主可在你空檔時向你發出工作邀請。',
    view: '查看',

    loginTitle: '登入 / 注冊',
    registerTitle: '完成注冊',
    phoneNumber: '手機號碼',
    phonePlaceholder: '輸入手機號碼',
    otpCode: '短信驗證碼',
    otpPlaceholder: '輸入驗證碼',
    getOtp: '獲取驗證碼',
    resendIn: '秒後重發',
    passwordLogin: '密碼登入',
    otpLogin: '驗證碼登入',
    passwordPlaceholder: '輸入登入密碼',
    agreeTerms: '我已閱讀並同意',
    terms: '服務條款',
    privacy: '隱私政策',
    loginBtn: '登入',
    switchToRegister: '首次使用？立即注冊',
    switchToLogin: '已有帳號？立即登入',
    setPassword: '設置登入密碼',
    setPasswordPlaceholder: '設定至少8位密碼',
    confirmPassword: '再次確認密碼',
    confirmPasswordPlaceholder: '重複輸入密碼',
    fullName: '姓名（與證件一致）',
    fullNamePlaceholder: '輸入真實姓名',
    finishRegister: '完成注冊',
    passwordHint: '說明：短信驗證碼用於登入 / 找回密碼；密碼可在「個人 - 賬戶設定」中修改。',
    registerInfoTip: '首次注冊需設定密碼及姓名，以便後續認證和求職申請。',
    errorPhone: '請輸入有效的香港手機號碼',
    errorOtp: '請輸入驗證碼',
    errorPassword: '密碼至少8位',
    errorConfirm: '兩次密碼不一致',
    errorName: '請輸入真實姓名',
    errorAgree: '請同意服務條款',

    personalCenter: '個人中心',
    updateProfile: '更新',
    certifiedHKID: '香港工作資格認證 - 已認證',
    notCertified: '香港工作資格認證 - 未認證',
    jobHistory: '求職記錄',
    myWallet: '我的錢包',
    pendingBalance: '待支付餘額',
    applyPayout: '申請出糧',
    transactions: '帳單明細',
    abnormalFeedback: '異常反饋',
    logout: '退出登入',
    jobRecordCount: '條記錄',

    accountSettings: '賬戶設定',
    contactInfo: '聯絡方式',
    phoneRow: '電話號碼',
    emailRow: '電子郵件',
    whatsappRow: 'WhatsApp',
    changePhone: '換綁',
    bindAction: '去綁定',
    unbindAction: '去綁定',
    passwordSettings: '密碼設定',
    resetPassword: '重設密碼',
    emailPlaceholder: '請輸入電郵',
    whatsappPlaceholder: '請輸入 WhatsApp 號碼',

    payoutTitle: '申請出糧',
    payoutAmount: '申請金額',
    payoutAmountPlaceholder: '輸入申請金額',
    paymentMethod: '收款方式',
    cash: '現金',
    bankTransfer: '銀行轉帳',
    bankDetails: '銀行資料',
    bankDetailsPlaceholder: '戶名 / 銀行 / 帳號',
    notesLabel: '備注',
    notesPlaceholder: '選填備注',
    cancelBtn: '取消',
    submitRequest: '提交申請',
    payoutSuccess: '申請已提交，平台將在1-3個工作日處理。',

    tempPoolTitle: '臨時工候選池',
    tempPoolRules: '規則說明：加入臨時工候選池後，當無排班冲突時，急聘僱主可在你未申請崗位時向你發出工作邀請；接受後可直接上崗。',
    districtPref: '地區偏好',
    jobTypePref: '工作種類偏好',
    saveEnable: '保存開啟',
    pauseBtn: '暫停',
    tempPoolDistrictPlaceholder: '選擇地區（可多選）',
    tempPoolJobTypePlaceholder: '選擇工作種類（可多選）',

    jobHistoryTitle: '求職記錄',
    statusPending: '審核中',
    statusScheduled: '已排班',
    statusRejected: '已拒絕',
    statusCompleted: '已完成',

    comingSoon: '正在開發中',
    comingSoonSchedule: '更期打卡功能即將上線，讓你輕鬆管理排班與打卡記錄。',
    comingSoonMessages: '訊息中心功能即將上線，所有通知與系統消息將集中於此。',
  },

  'zh-CN': {
    welcome: '欢迎使用',
    slogan: '工作好、出粮快',
    tagline: '香港最专业的灵活用工平台',
    getStarted: '立即找工作',
    poweredBy: '© 2026 NewBee 香港',

    findJobs: '首页职位',
    schedule: '更期打卡',
    messages: '讯息中心',
    profile: '个人中心',

    searchPlaceholder: '搜索职位 / 公司 / 门店 / 地区',
    filterBtn: '筛选',
    sortBtn: '排序',
    allTypes: '全部',
    fullTime: '全职',
    partTime: '兼职',
    casual: '临时工',
    dailyPay: '日结',

    locationLabel: '香港',
    allDistricts: '全部地区',

    urgentTag: '急聘',
    dailyPayTag: '日结',
    fullTimeTag: '全职',
    partTimeTag: '兼职',
    casualTag: '临时工',
    hourlyUnit: '/时',
    dailyUnit: '/日',
    monthlyUnit: '/月',

    applyNow: '立即申请',
    saved: '已收藏',
    save: '收藏',
    postedAgo: '前发布',
    spotsLeft: '余',

    filterTitle: '筛选条件',
    jobType: '工作类型',
    district: '地区',
    salary: '薪酬',
    sortBy: '排序方式',
    latestFirst: '最新优先',
    nearestFirst: '距离优先',
    highestSalary: '薪酬最高',
    reset: '重置',
    confirm: '确认',

    noResults: '暂无相关职位',
    noResultsTip: '试试扩大区域 / 放宽工作种类',
    recommends: '推荐职位',
    urgent: '急聘职位',

    tempPoolBanner: '建议加入临时工候选池',
    tempPoolBannerSub: '开启后，急聘雇主可在你空档时向你发出工作邀请。',
    view: '查看',

    loginTitle: '登录 / 注册',
    registerTitle: '完成注册',
    phoneNumber: '手机号码',
    phonePlaceholder: '输入手机号码',
    otpCode: '短信验证码',
    otpPlaceholder: '输入验证码',
    getOtp: '获取验证码',
    resendIn: '秒后重发',
    passwordLogin: '密码登录',
    otpLogin: '验证码登录',
    passwordPlaceholder: '输入登录密码',
    agreeTerms: '我已阅读并同意',
    terms: '服务条款',
    privacy: '隐私政策',
    loginBtn: '登录',
    switchToRegister: '首次使用？立即注册',
    switchToLogin: '已有账号？立即登录',
    setPassword: '设置登录密码',
    setPasswordPlaceholder: '设定至少8位密码',
    confirmPassword: '再次确认密码',
    confirmPasswordPlaceholder: '重复输入密码',
    fullName: '姓名（与证件一致）',
    fullNamePlaceholder: '输入真实姓名',
    finishRegister: '完成注册',
    passwordHint: '说明：短信验证码用于登录 / 找回密码；密码可在「个人 - 账户设定」中修改。',
    registerInfoTip: '首次注册需设定密码及姓名，以便后续认证和求职申请。',
    errorPhone: '请输入有效的香港手机号码',
    errorOtp: '请输入验证码',
    errorPassword: '密码至少8位',
    errorConfirm: '两次密码不一致',
    errorName: '请输入真实姓名',
    errorAgree: '请同意服务条款',

    personalCenter: '个人中心',
    updateProfile: '更新',
    certifiedHKID: '香港工作资格认证 - 已认证',
    notCertified: '香港工作资格认证 - 未认证',
    jobHistory: '求职记录',
    myWallet: '我的钱包',
    pendingBalance: '待支付余额',
    applyPayout: '申请出粮',
    transactions: '账单明细',
    abnormalFeedback: '异常反馈',
    logout: '退出登录',
    jobRecordCount: '条记录',

    accountSettings: '账户设定',
    contactInfo: '联络方式',
    phoneRow: '电话号码',
    emailRow: '电子邮件',
    whatsappRow: 'WhatsApp',
    changePhone: '换绑',
    bindAction: '去绑定',
    unbindAction: '去绑定',
    passwordSettings: '密码设定',
    resetPassword: '重设密码',
    emailPlaceholder: '请输入电邮',
    whatsappPlaceholder: '请输入 WhatsApp 号码',

    payoutTitle: '申请出粮',
    payoutAmount: '申请金额',
    payoutAmountPlaceholder: '输入申请金额',
    paymentMethod: '收款方式',
    cash: '现金',
    bankTransfer: '银行转账',
    bankDetails: '银行资料',
    bankDetailsPlaceholder: '户名 / 银行 / 账号',
    notesLabel: '备注',
    notesPlaceholder: '选填备注',
    cancelBtn: '取消',
    submitRequest: '提交申请',
    payoutSuccess: '申请已提交，平台将在1-3个工作日处理。',

    tempPoolTitle: '临时工候选池',
    tempPoolRules: '规则说明：加入临时工候选池后，当无排班冲突时，急聘雇主可在你未申请岗位时向你发出工作邀请；接受后可直接上岗。',
    districtPref: '地区偏好',
    jobTypePref: '工作种类偏好',
    saveEnable: '保存开启',
    pauseBtn: '暂停',
    tempPoolDistrictPlaceholder: '选择地区（可多选）',
    tempPoolJobTypePlaceholder: '选择工作种类（可多选）',

    jobHistoryTitle: '求职记录',
    statusPending: '审核中',
    statusScheduled: '已排班',
    statusRejected: '已拒绝',
    statusCompleted: '已完成',

    comingSoon: '正在开发中',
    comingSoonSchedule: '更期打卡功能即将上线，让你轻松管理排班与打卡记录。',
    comingSoonMessages: '讯息中心功能即将上线，所有通知与系统消息将集中于此。',
  },

  en: {
    welcome: 'Welcome to',
    slogan: 'Great Jobs, Fast Pay',
    tagline: "Hong Kong's Premier Flexible Work Platform",
    getStarted: 'Find a Job',
    poweredBy: '© 2026 NewBee Hong Kong',

    findJobs: 'Jobs',
    schedule: 'Schedule',
    messages: 'Messages',
    profile: 'Profile',

    searchPlaceholder: 'Search jobs, companies or locations',
    filterBtn: 'Filter',
    sortBtn: 'Sort',
    allTypes: 'All',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    casual: 'Casual',
    dailyPay: 'Daily Pay',

    locationLabel: 'Hong Kong',
    allDistricts: 'All Districts',

    urgentTag: 'Urgent',
    dailyPayTag: 'Daily Pay',
    fullTimeTag: 'Full-time',
    partTimeTag: 'Part-time',
    casualTag: 'Casual',
    hourlyUnit: '/hr',
    dailyUnit: '/day',
    monthlyUnit: '/mo',

    applyNow: 'Apply Now',
    saved: 'Saved',
    save: 'Save',
    postedAgo: 'ago',
    spotsLeft: 'left',

    filterTitle: 'Filters',
    jobType: 'Job Type',
    district: 'District',
    salary: 'Salary',
    sortBy: 'Sort By',
    latestFirst: 'Latest First',
    nearestFirst: 'Nearest First',
    highestSalary: 'Highest Salary',
    reset: 'Reset',
    confirm: 'Apply',

    noResults: 'No matching jobs found',
    noResultsTip: 'Try expanding your area or broadening job types',
    recommends: 'Recommended',
    urgent: 'Urgent Hiring',

    tempPoolBanner: 'Join the Temp Worker Pool',
    tempPoolBannerSub: 'Once enabled, urgent employers can invite you during your free time.',
    view: 'View',

    loginTitle: 'Login / Register',
    registerTitle: 'Complete Registration',
    phoneNumber: 'Mobile Number',
    phonePlaceholder: 'Enter mobile number',
    otpCode: 'SMS Code',
    otpPlaceholder: 'Enter verification code',
    getOtp: 'Get Code',
    resendIn: 's to resend',
    passwordLogin: 'Password',
    otpLogin: 'OTP',
    passwordPlaceholder: 'Enter your password',
    agreeTerms: 'I have read and agree to the',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    loginBtn: 'Login',
    switchToRegister: 'New user? Register now',
    switchToLogin: 'Have an account? Login',
    setPassword: 'Set Login Password',
    setPasswordPlaceholder: 'At least 8 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter password',
    fullName: 'Full Name (as on ID)',
    fullNamePlaceholder: 'Enter your legal name',
    finishRegister: 'Complete Registration',
    passwordHint: 'Note: SMS code is used for login and password recovery. Password can be changed in Profile → Account Settings.',
    registerInfoTip: 'A password and name are required for first-time registration to complete future verification and job applications.',
    errorPhone: 'Please enter a valid HK mobile number',
    errorOtp: 'Please enter the verification code',
    errorPassword: 'Password must be at least 8 characters',
    errorConfirm: 'Passwords do not match',
    errorName: 'Please enter your legal name',
    errorAgree: 'Please agree to the Terms of Service',

    personalCenter: 'Profile',
    updateProfile: 'Update',
    certifiedHKID: 'HK Work Authorization — Certified',
    notCertified: 'HK Work Authorization — Not Certified',
    jobHistory: 'Job History',
    myWallet: 'My Wallet',
    pendingBalance: 'Pending Balance',
    applyPayout: 'Request Payout',
    transactions: 'Transactions',
    abnormalFeedback: 'Report Issue',
    logout: 'Log Out',
    jobRecordCount: 'records',

    accountSettings: 'Account Settings',
    contactInfo: 'Contact Info',
    phoneRow: 'Phone Number',
    emailRow: 'Email',
    whatsappRow: 'WhatsApp',
    changePhone: 'Change',
    bindAction: 'Bind',
    unbindAction: 'Bind',
    passwordSettings: 'Password',
    resetPassword: 'Reset Password',
    emailPlaceholder: 'Enter email address',
    whatsappPlaceholder: 'Enter WhatsApp number',

    payoutTitle: 'Request Payout',
    payoutAmount: 'Amount',
    payoutAmountPlaceholder: 'Enter payout amount',
    paymentMethod: 'Payment Method',
    cash: 'Cash',
    bankTransfer: 'Bank Transfer',
    bankDetails: 'Bank Details',
    bankDetailsPlaceholder: 'Name / Bank / Account No.',
    notesLabel: 'Notes',
    notesPlaceholder: 'Optional notes',
    cancelBtn: 'Cancel',
    submitRequest: 'Submit Request',
    payoutSuccess: 'Request submitted. Platform will process within 1–3 business days.',

    tempPoolTitle: 'Temp Worker Pool',
    tempPoolRules: 'By joining the Temp Worker Pool, urgent employers can invite you when you have no scheduling conflicts. Accept an invitation to start work directly.',
    districtPref: 'District Preference',
    jobTypePref: 'Job Type Preference',
    saveEnable: 'Save & Enable',
    pauseBtn: 'Pause',
    tempPoolDistrictPlaceholder: 'Select districts (multi-select)',
    tempPoolJobTypePlaceholder: 'Select job types (multi-select)',

    jobHistoryTitle: 'Job History',
    statusPending: 'Under Review',
    statusScheduled: 'Scheduled',
    statusRejected: 'Rejected',
    statusCompleted: 'Completed',

    comingSoon: 'Coming Soon',
    comingSoonSchedule: 'The Schedule & Clock-in feature is coming soon, helping you manage shifts and attendance effortlessly.',
    comingSoonMessages: 'The Messages hub is coming soon. All notifications and system messages will be centralized here.',
  },
};

export const districts: Record<Language, string[]> = {
  'zh-HK': [
    '中西區', '灣仔', '東區', '南區',
    '油尖旺', '深水埗', '九龍城', '黃大仙', '觀塘',
    '葵青', '荃灣', '屯門', '元朗', '北區',
    '大埔', '沙田', '西貢', '離島',
  ],
  'zh-CN': [
    '中西区', '湾仔', '东区', '南区',
    '油尖旺', '深水埗', '九龙城', '黄大仙', '观塘',
    '葵青', '荃湾', '屯门', '元朗', '北区',
    '大埔', '沙田', '西贡', '离岛',
  ],
  en: [
    'Central & Western', 'Wan Chai', 'Eastern', 'Southern',
    'Yau Tsim Mong', 'Sham Shui Po', 'Kowloon City', 'Wong Tai Sin', 'Kwun Tong',
    'Kwai Tsing', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long', 'North',
    'Tai Po', 'Sha Tin', 'Sai Kung', 'Islands',
  ],
};

export const jobCategories: Record<Language, string[]> = {
  'zh-HK': ['展覽活動', '飲食餐飲', '零售', '物流倉務', '建築工程', '保安', '推廣活動', '清潔', '辦公室', '護理'],
  'zh-CN': ['展览活动', '餐饮', '零售', '物流仓储', '建筑工程', '保安', '推广活动', '清洁', '办公室', '护理'],
  en: ['Exhibition', 'F&B', 'Retail', 'Logistics', 'Construction', 'Security', 'Promotions', 'Cleaning', 'Office', 'Caregiving'],
};
