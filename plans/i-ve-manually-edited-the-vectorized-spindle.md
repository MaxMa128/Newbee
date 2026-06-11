# NewBee PWA — Auth, Job Feed, Profile Modules

## Context

The existing app has a Welcome splash page and a basic job feed HomePage, both styled in the established design system (deep navy #0F1623 primary, amber #F5A623 accent, white cards, Plus Jakarta Sans, motion animations). The user has provided 8 prototype wireframes covering:

1. Login/Register flow (phone OTP + set-password step)
2. Job feed (首页职位) — improvements to existing  
3. Personal Center (个人中心) — profile, stats, sub-pages
4. Account Settings (账户设定)
5. Wallet (我的钱包)
6. Payout request (申请出粮)
7. Temp-worker pool (临时工候选池)

**Critical constraint**: Maintain the current design aesthetic exactly — amber/navy palette, card styles, bottom nav, motion animations. The prototypes are functional references only, not visual references.

---

## Navigation Architecture

Extend `App.tsx` state from `'welcome' | 'home'` to a full screen enum:

```
screen: 'welcome' | 'auth-login' | 'auth-register' | 'main'
```

- `welcome` → tap CTA → `auth-login`  
- `auth-login` → OTP verified (new user) → `auth-register`  
- `auth-login` / `auth-register` → success → `main`  
- `main` renders bottom-nav shell with `activeNav: 0–3`

**Bottom nav tabs** (already partially built in HomePage, must unify):
- 0: 首页职位 — existing `HomePage` content (job feed)
- 1: 更期打卡 — "Coming Soon" placeholder
- 2: 讯息中心 — "Coming Soon" placeholder
- 3: 个人中心 — new `ProfilePage`

**Profile sub-navigation** (stack within ProfilePage):
```
profileStack: ('main' | 'settings' | 'wallet' | 'payout' | 'temp-pool' | 'job-history')[]
```
Starts as `['main']`. Pushing navigates forward; popping goes back. Sub-pages slide in from the right using motion.

**Shared user state** (lifted to App.tsx):
```ts
user: { name: string; phone: string; gender: string; age: number } | null
isLoggedIn: boolean
```

---

## Files to Create / Modify

### New files

#### `src/app/components/AuthPage.tsx`
Two-step auth flow managed by `step: 'login' | 'register'` prop from App.

**Login step** (`auth-login`):
- Language switcher top-right (reuse pattern from HomePage)
- NewBee logo (small HexLogo + wordmark)
- Phone field: `+852` prefix chip + number input
- Mode toggle: OTP login ↔ Password login (two tabs, styled as pill toggle)
- OTP mode: OTP input + countdown "获取验证码" button (60s timer)
- Password mode: Password input
- Agreement checkbox row: 服務條款 / 隱私政策 links
- Primary CTA button: 登錄 / 登入 (full width, amber-on-navy)
- "首次使用？立即注册" link → triggers set-password step

**Register step** (`auth-register`):
- Back arrow → returns to login
- Amber info tip box (rules note)
- Set password input + confirm password input
- Full name input (与证件一致)
- Yellow/amber info note box: SMS code used for login / password recovery
- "完成注册" primary CTA → sets user state, navigates to main

State: `phone`, `otp`, `otpSent`, `countdown`, `password`, `confirmPassword`, `name`, `agreed`, `loginMode: 'otp' | 'password'`, `errors`

#### `src/app/components/ProfilePage.tsx`
Manages `profileStack` state internally. Top-level renders based on stack tail.

**Main profile view**:
- Header: "个人中心" title + settings gear icon (→ push 'settings')
- User card (white, subtle shadow):
  - Avatar circle (initials, amber bg)
  - Name + gender + age
  - "更新" button (navy, rounded-xl)
  - Info rows: HKID certification status chip, education, languages
- Two stat cards in a row:
  - 求職記錄 / 68 (→ push 'job-history')
  - 我的錢包 / HK$22,899 (→ push 'wallet')
- Amber/green "临时工候选池" banner card (→ push 'temp-pool')
- Logout button (outline, bottom)

**Settings sub-view** (账户设定):
- Back arrow header
- Section: 聯絡方式
  - 電話號碼 row: value + "換綁" action
  - 電子郵件 row: input placeholder + "去綁定"
  - WhatsApp row: placeholder + "去綁定"
- Section: 密碼設定
  - Password row: ******* + "重設密碼"
- Logout button (outline, destructive color)

**Wallet sub-view** (我的钱包):
- Back arrow header
- Balance card: "待支付餘額: HK$2,899" + "申請出糧" button (→ push 'payout')
- Section title: 帳單明細
- Transaction list (vertical, each a white card):
  - Type icon (+ green / − red) + amount + description
  - Job title + company
  - Date
- "異常反饋" text link at bottom

**Payout sub-view** (申请出粮):
- Back arrow header  
- Form card:
  - Amount input: "申請金額: HK$___"
  - Payment method: radio group (現金 / 銀行轉帳)
  - Bank info textarea (conditional on bank transfer)
  - Notes textarea
- Cancel + 提交申請 buttons

**Temp-pool sub-view** (临时工候选池):
- Back arrow header
- Amber rules info box (PRD rule description)
- District multiselect dropdown (HK 18 districts)
- Job type multiselect dropdown
- Pause (outline) + 保存開啟 (amber) buttons

**Job history sub-view** (求职记录):
- Back arrow header
- Simple list of application records (mock data: 6 items)
- Status chips: 審核中 / 已排班 / 已拒絕

#### `src/app/components/ComingSoon.tsx`
Shared placeholder for 更期打卡 and 讯息中心 tabs:
- Centered bee icon illustration
- "正在開發中" / "Coming Soon" heading
- Subtitle about the feature
- Estimated availability note

### Modify existing files

#### `src/app/App.tsx`
- Extend `screen` type to `'welcome' | 'auth-login' | 'auth-register' | 'main'`
- Add `isLoggedIn`, `user` state
- Move `lang` + `setLang` here (already there)
- Move bottom nav `activeNav` here (currently in HomePage, must lift to App level so tabs work across all pages)
- Render: `<MainShell>` wrapper that contains bottom nav + swaps content by `activeNav`; HomePage, ComingSoon×2, ProfilePage are children

#### `src/app/components/HomePage.tsx`
- Move bottom nav OUT (it will live in App/MainShell)
- Add dismissable "临时工候选池" banner (green tinted card, amber close ×, "查看" link → navigates to temp-pool via callback)
- Improve job cards: add remaining spots count ("余5人") to mock data and card display
- Empty state: show tip box ("试试扩大区域/放宽工作种类") when no results

#### `src/app/components/jobData.ts`
- Add `remainingSpots: number` field to Job type and mock data

#### `src/app/components/i18n.ts`
Add translation keys for:
- Auth: `login`, `register`, `phoneNumber`, `otpCode`, `getOtp`, `resendIn`, `passwordLogin`, `otpLogin`, `agreeTerms`, `terms`, `privacy`, `firstName`, `setPassword`, `confirmPassword`, `finishRegister`, `passwordHint`, `switchToRegister`, `switchToLogin`
- Profile: `personalCenter`, `certifiedHKID`, `jobHistory`, `myWallet`, `pendingBalance`, `applyPayout`, `transactions`, `abnormalFeedback`, `accountSettings`, `contactInfo`, `phone`, `email`, `changePhone`, `bindAction`, `unbindAction`, `passwordSettings`, `resetPassword`, `logout`, `payoutAmount`, `paymentMethod`, `cash`, `bankTransfer`, `bankDetails`, `notes`, `cancelBtn`, `submitRequest`, `tempPoolTitle`, `tempPoolRules`, `saveEnable`, `pause`, `comingSoon`, `comingSoonDesc`, `jobRecordCount`

---

## MainShell Component (new, inline in App.tsx or separate file)

Wraps all "logged-in" content. Contains:
- The content area (flex-1, scrollable per tab)
- Bottom nav bar (shared, amber active state)
- Passes `onNavigate` callbacks down for inter-module navigation (e.g., profile → temp-pool)

```tsx
// App.tsx renders:
<MainShell activeNav={activeNav} onNavChange={setActiveNav} lang={lang} onLangChange={setLang}>
  {/* Content swapped by activeNav */}
</MainShell>
```

---

## Animation & Style Rules (must match existing)

- **Cards**: `bg-card rounded-2xl`, `box-shadow: 0 1px 3px rgba(15,22,35,0.06), 0 4px 16px rgba(15,22,35,0.04)`, `border: 1px solid rgba(15,22,35,0.06)`
- **Primary buttons**: `background: #0F1623, color: #FFFFFF, border-radius: 0.875rem`
- **Accent buttons**: `background: #F5A623, color: #0F1623`
- **Outline buttons**: `border: 1.5px solid rgba(15,22,35,0.15), background: transparent`
- **Section headers**: `font-size: 0.75rem, fontWeight: 700, color: #6B7A99, textTransform: uppercase, letterSpacing: 0.08em`
- **Input focus**: border-color `#F5A623`, background `#FFFFFF`
- **Sub-page entry**: `motion.div` sliding in from `x: 24` with `opacity: 0 → 1`
- **Bottom nav active**: amber icon + amber label + amber pill background behind icon
- **Tags**: pill with colored bg/text (urgent=amber, daily-pay=green, type=navy-muted)

---

## Mock Data to Add

### Wallet transactions (in ProfilePage or walletData.ts)
```
+HK$680  工資入帳  餐廳服務員 / 大家樂  2026-06-19
−HK$680  出糧確認  邦芒公司             2026-06-19
+HK$950  工資入帳  倉務員 / SF Express  2026-06-17
+HK$750  工資入帳  展覽助理 / HKCEC     2026-06-14
−HK$2,280 出糧確認 邦芒公司            2026-06-12
```

### Job history records
```
展覽助理  HKCEC  灣仔  2026-06-12  已排班
倉務員    順豐   荃灣  2026-05-28  已完成
餐飲服務員 大家樂 旺角  2026-05-15  已拒絕
保安員    Galaxy 將軍澳 2026-05-01  已完成
```

---

## Verification

1. **Welcome → Auth flow**: Tap "立即搵工" → Login screen appears with phone OTP form
2. **OTP mode toggle**: Switch between OTP and password login modes
3. **Register flow**: Fill OTP → tap register link → set-password form → complete → lands on main
4. **Password login**: Fill phone + password → login → lands on main
5. **Job feed**: Temp-pool banner visible, can be dismissed; search/filter still works
6. **Bottom nav**: All 4 tabs switch correctly; 更期打卡 and 讯息中心 show ComingSoon
7. **Profile**: User info card shows; tap 我的錢包 → wallet view; tap 申請出糧 → payout form
8. **Settings**: Gear icon → account settings; contact rows display; logout button present
9. **Temp-pool**: Banner "查看" → temp-pool settings form; district + job type dropdowns; save button
10. **Language switching**: All new screens respect current language from App-level state
11. **Back navigation**: All sub-pages have back arrow returning to parent
