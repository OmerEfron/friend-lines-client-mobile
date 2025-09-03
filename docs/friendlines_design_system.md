# FRIENDLINES — Mobile Design System & UI/UX Specification (React Native)

A newsroom-like social app where your people are the headlines.

## Table of Contents

- [Design Principles](#1-design-principles)
- [Design Tokens (JSON)](#2-design-tokens-json)
- [Iconography & Illustration Guidelines](#3-iconography--illustration-guidelines)
- [Accessibility & Localization Rules (incl. RTL)](#4-accessibility--localization-rules-incl-rtl)
- [Content Design & Microcopy Tone](#5-content-design--microcopy-tone)
- [Component Library Specs](#6-component-library-specs)
- [Layout & Grid Rules](#7-layout--grid-rules)
- [Navigation Architecture](#8-navigation-architecture)
- [Screen-by-Screen Blueprints](#9-screen-by-screen-blueprints)
- [States & Edge Cases](#10-states--edge-cases)
- [Theming (light/dark/high-contrast; brand customization)](#11-theming-lightdarkhigh-contrast-brand-customization)
- [Performance & Offline](#12-performance--offline)
- [Quality Bar & Acceptance Criteria](#13-quality-bar--acceptance-criteria)
- [Appendix: Example React Native Snippets](#14-appendix-example-react-native-snippets)

> **Note on API alignment:** This spec is designed for common social/news primitives (auth, users, posts, groups, friend requests, notifications, search, media). If your OpenAPI at /api/docs/openapi.yaml exposes additional entities or fields, map them to the components/props herein using the same token system and patterns.

## 1) Design Principles

- **Signal over noise:** Default layouts prioritize scannable headlines, clear sources (friend/group), and trustworthy timestamps. No visual clutter.

- **Newsroom rhythm:** Consistent typographic hierarchy and modular cards enable fast reading and reliable skimming; motion is subtle and purposeful.

- **Respect & consent:** Privacy-first affordances (visibility, mute/snooze, reporting) are always one tap away and reversible.

- **Local-first feel:** Feeds feel instant with skeletons and optimistic actions; offline reads and queued posts reduce friction.

- **One system, many lenses:** Main feed, Group feeds, and Friend feeds reuse the same components; theming supports future brands without code churn.

- **Global-ready:** Built-in RTL, dynamic type, locale-aware formatting, and AA/AAA contrast ensure inclusion.

## 2) Design Tokens (JSON)

```json
{
  "$schema": "https://design-tokens.org/schema.json",
  "meta": { "name": "friendlines", "version": "1.0.0" },

  "color": {
    "brand": {
      "primary": { "value": "#2D5BFF" },
      "primary-700": { "value": "#1E3EE6" },
      "primary-300": { "value": "#6E8BFF" },
      "secondary": { "value": "#FFC247" },
      "secondary-700": { "value": "#D79C1F" }
    },
    "neutral": {
      "0": { "value": "#FFFFFF" },
      "50": { "value": "#F8FAFC" },
      "100": { "value": "#F1F5F9" },
      "200": { "value": "#E2E8F0" },
      "300": { "value": "#CBD5E1" },
      "400": { "value": "#94A3B8" },
      "500": { "value": "#64748B" },
      "600": { "value": "#475569" },
      "700": { "value": "#334155" },
      "800": { "value": "#1F2937" },
      "900": { "value": "#0B121A" }
    },
    "semantic": {
      "success": { "value": "#10B981" },
      "info": { "value": "#3B82F6" },
      "warning": { "value": "#F59E0B" },
      "error": { "value": "#EF4444" }
    },
    "states": {
      "focus": { "value": "#2D5BFF" },
      "pressed": { "value": "rgba(45,91,255,0.12)" },
      "hover": { "value": "rgba(45,91,255,0.08)" },
      "selected": { "value": "rgba(45,91,255,0.16)" },
      "disabled-fg": { "value": "#94A3B8" },
      "disabled-bg": { "value": "#E2E8F0" }
    },

    "light": {
      "bg": { "value": "{color.neutral.50.value}" },
      "surface": { "value": "{color.neutral.0.value}" },
      "surface-2": { "value": "{color.neutral.100.value}" },
      "text": { "value": "{color.neutral.800.value}" },
      "text-muted": { "value": "{color.neutral.600.value}" },
      "divider": { "value": "{color.neutral.200.value}" },
      "chip-bg": { "value": "{color.neutral.100.value}" },
      "badge-bg": { "value": "{color.brand.primary.value}" },
      "elevation-overlay": { "value": "rgba(0,0,0,0.02)" }
    },

    "dark": {
      "bg": { "value": "{color.neutral.900.value}" },
      "surface": { "value": "#0E141C" },
      "surface-2": { "value": "#121A23" },
      "text": { "value": "{color.neutral.100.value}" },
      "text-muted": { "value": "{color.neutral.400.value}" },
      "divider": { "value": "rgba(255,255,255,0.08)" },
      "chip-bg": { "value": "#18202A" },
      "badge-bg": { "value": "{color.brand.primary-300.value}" },
      "elevation-overlay": { "value": "rgba(255,255,255,0.04)" }
    },

    "contrast": {
      "hc-bg": { "value": "#000000" },
      "hc-surface": { "value": "#0B0B0B" },
      "hc-text": { "value": "#FFFFFF" },
      "hc-focus": { "value": "#FFD60A" }
    }
  },

  "font": {
    "families": {
      "ios": { "value": "System" },
      "android": { "value": "Roboto" },
      "fallback": { "value": "Segoe UI, Helvetica, Arial" }
    },
    "size": {
      "xs": { "value": 12 },
      "sm": { "value": 14 },
      "md": { "value": 16 },
      "lg": { "value": 18 },
      "xl": { "value": 22 },
      "2xl": { "value": 26 },
      "3xl": { "value": 32 }
    },
    "lineHeight": {
      "tight": { "value": 1.2 },
      "snug": { "value": 1.35 },
      "normal": { "value": 1.5 }
    },
    "weight": {
      "regular": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    },
    "roles": {
      "headline": { "size": "{font.size.2xl.value}", "weight": "{font.weight.bold.value}", "lh": "{font.lineHeight.snug.value}" },
      "title": { "size": "{font.size.xl.value}", "weight": "{font.weight.semibold.value}", "lh": "{font.lineHeight.snug.value}" },
      "subhead": { "size": "{font.size.lg.value}", "weight": "{font.weight.medium.value}", "lh": "{font.lineHeight.normal.value}" },
      "body": { "size": "{font.size.md.value}", "weight": "{font.weight.regular.value}", "lh": "{font.lineHeight.normal.value}" },
      "caption": { "size": "{font.size.sm.value}", "weight": "{font.weight.regular.value}", "lh": "{font.lineHeight.normal.value}" },
      "meta": { "size": "{font.size.xs.value}", "weight": "{font.weight.medium.value}", "lh": "{font.lineHeight.tight.value}" }
    }
  },

  "space": {
    "0": { "value": 0 },
    "1": { "value": 4 },
    "2": { "value": 8 },
    "3": { "value": 12 },
    "4": { "value": 16 },
    "5": { "value": 20 },
    "6": { "value": 24 },
    "7": { "value": 32 },
    "8": { "value": 40 }
  },

  "radius": {
    "none": { "value": 0 },
    "sm": { "value": 6 },
    "md": { "value": 10 },
    "lg": { "value": 14 },
    "xl": { "value": 20 },
    "pill": { "value": 999 }
  },

  "elevation": {
    "0": { "ios": { "shadowColor": "transparent", "shadowOpacity": 0, "shadowRadius": 0, "shadowOffset": { "width": 0, "height": 0 } }, "android": { "elevation": 0 } },
    "1": { "ios": { "shadowColor": "#000000", "shadowOpacity": 0.06, "shadowRadius": 4, "shadowOffset": { "width": 0, "height": 2 } }, "android": { "elevation": 1 } },
    "2": { "ios": { "shadowColor": "#000000", "shadowOpacity": 0.08, "shadowRadius": 8, "shadowOffset": { "width": 0, "height": 4 } }, "android": { "elevation": 2 } },
    "3": { "ios": { "shadowColor": "#000000", "shadowOpacity": 0.1, "shadowRadius": 12, "shadowOffset": { "width": 0, "height": 6 } }, "android": { "elevation": 3 } },
    "4": { "ios": { "shadowColor": "#000000", "shadowOpacity": 0.12, "shadowRadius": 16, "shadowOffset": { "width": 0, "height": 8 } }, "android": { "elevation": 4 } },
    "5": { "ios": { "shadowColor": "#000000", "shadowOpacity": 0.16, "shadowRadius": 24, "shadowOffset": { "width": 0, "height": 12 } }, "android": { "elevation": 6 } }
  },

  "opacity": {
    "0": { "value": 0 },
    "4": { "value": 0.04 },
    "8": { "value": 0.08 },
    "12": { "value": 0.12 },
    "16": { "value": 0.16 },
    "24": { "value": 0.24 },
    "40": { "value": 0.40 },
    "60": { "value": 0.60 },
    "80": { "value": 0.80 },
    "100": { "value": 1 }
  },

  "motion": {
    "duration": {
      "fast": { "value": 80 },
      "normal": { "value": 160 },
      "slow": { "value": 240 }
    },
    "easing": {
      "in": { "value": "cubic-bezier(0.4, 0, 1, 1)" },
      "out": { "value": "cubic-bezier(0.0, 0, 0.2, 1)" },
      "in-out": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" },
      "spring": { "value": { "damping": 16, "mass": 1, "stiffness": 220 } }
    }
  }
}
```

### Usage mappings (examples):

- **Headlines** → `font.roles.headline`, color: `color.light.text` / `color.dark.text`
- **Bylines/Timestamps** → `font.roles.meta`, color: `text-muted`
- **Cards** → background `surface`, radius `md`, elevation `1–2`, divider `divider`
- **Buttons** → primary uses `brand.primary` bg & `neutral.0` text; secondary uses `chip-bg` bg & `text` fg; icon buttons use `text-muted` with pressed overlay
- **Chips/Badges** → chip bg `chip-bg`, badge bg `badge-bg`, text `neutral.0`

## 3) Iconography & Illustration Guidelines

- **Style:** Rounded-corner line icons, 1.5px stroke @1x (auto-thicken per pixel ratio). Filled variants for selected/active states.

- **Grid & Sizes:** 16, 20, 24, 28, 32 px. Use 24 for tab bar, 20 for list rows, 28 for empty states.

- **Color:** Default `text-muted`; active `brand.primary`; error `semantic.error`.

- **Illustrations (empty/error):** Minimal, duotone using `brand.primary-300` + `neutral.300`. Abstract shapes; no faces (privacy).

- **Avatar Rings:** Status ring uses `brand.primary` for "new" in stories-style stacks; presence uses `success`.

## 4) Accessibility & Localization Rules (incl. RTL)

- **Contrast:** Body text AA on both themes; meta text AAA where feasible (choose chip/background combinations accordingly).

- **Dynamic Type:** Respect system font scaling; support up to 200% with layout reflow (multi-line headlines, wrapping actions).

- **Tap targets:** ≥ 44×44 px; min inline touch gap 8 px.

- **Focus:** Visible outlines using `color.states.focus`.

### VoiceOver/TalkBack:

- **Cards:** `accessibilityLabel="Headline — From {source}, {relative time}. {actions}"`
- **Buttons:** Describe action + object ("Mute John"), include state ("selected").

### RTL:

- Use I18nManager mirroring; swap chevrons, sliders, tab order. Keep avatars left in LTR and right in RTL. Truncation uses locale-aware ellipsis.

### Dates/Numbers:

- Use device locale; timestamps: relative ("5m ago"), tap toggles absolute (dd MMM yyyy, HH:mm, 24/12h per locale).

### Reduce Motion:

- Replace transitions with cross-fades; disable parallax/shimmers.

## 5) Content Design & Microcopy Tone

- **Tone:** Factual, warm, never sensational.

- **Headlines:** ≤ 85 chars; active voice; avoid clickbait.

- **Bylines:** From {Friend/Group} • {relative time} (e.g., "From Office • 5m ago").

- **Timestamps:** Relative by default; absolute on tap.

- **Privacy notices:** Clear, opt-in phrasing: "Share with Friends" (explain scope on tap).

- **Empty states:** Friendly and focused; example: "No updates yet. You might invite teammates or follow friends." CTA: "Find friends".

## 6) Component Library Specs

Below: anatomy (in words), core props, states, interactions, and a11y notes. All components use tokens above.

### 6.1 Top Bar / News Header

**Anatomy:** Left: logo/home; Center: section switcher (Main/Groups/Friends, collapsible title); Right: search, inbox. Optional thin divider.

**Props:**
- `title: string`
- `section?: 'Main'|'Groups'|'Friends'|string`
- `onPressLogo?()`, `onPressSearch()`, `onPressInbox()`, `onOpenSectionPicker()`

**States:** default, scrolled (elev=1), searching (inline field), offline (banner below).

**Interactions:** Tap title to switch section; pull-to-refresh passes to parent list.

**A11y:** Label each action; dynamic `accessibilityRole="header"`.

### 6.2 Tab Bar

**Tabs:** Home, Groups, Post (center), Requests/Inbox, Profile.

**Props:** `routes: TabRoute[]`, `badgeCount?: number` per tab

**States:** default/selected/disabled.

**Motion:** ink/underline slides (80–160ms).

**A11y:** `accessibilityRole="tab"`; announce badge counts.

### 6.3 Card (News Item)

**Anatomy:**
- Thumbnail/cover (16:9 default; supports 1:1, 1.91:1)
- Outlet chip (source: friend/group) + optional "NEW" dot
- Headline
- Subhead (1 line, optional)
- Byline + timestamp
- Action row: Share, Save, Mute (more menu)

**Props:**
- `id`, `thumbnailUrl?`, `ratio?: '16:9'|'1:1'|'1.91:1'`
- `source: { type: 'friend'|'group', name: string, avatarUrl? }`
- `headline: string`, `subhead?: string`
- `timestamp: ISOString`, `isRead?: boolean`
- `onPress()`, `onShare()`, `onSave(toggled: boolean)`, `onMute()`, `menuItems?: MenuItem[]`

**States:** default/read/pressed/saved/muted.

**A11y:** Combine source + headline + relative time; actions are separate accessible elements.

**Press feedback:** overlay `states.pressed`.

### 6.4 List Items

**Friend Item:** avatar, name, last activity, action (Follow/Message).

**Props:** `avatarUrl`, `name`, `subtitle?`, `presence?: 'online'|'offline'`, `cta?: 'Follow'|'Invite'`, `onPress()`, `onCTA()`.

**Group Item:** group avatar stack, name, member count, unread badge.

**Props:** `stackUrls`, `name`, `meta`, `unreadCount?`, `onPress()`.

**Request Item:** avatar/name, mutuals, Accept/Ignore.

**Props:** `onAccept()`, `onIgnore()`; confirm on ignore.

**Suggestion Item:** avatar/name + reason (mutuals). CTA: Add.

### 6.5 Avatar

**Sizes:** xs 20, sm 28, md 36, lg 48, xl 64.

**Rings:** status (presence success), new (brand.primary).

**Group Stack:** overlap 40%, up to 3; beyond shows +N.

### 6.6 Badges & Chips

**Badges:** unread counts in tab bar/list; min width 16, pad 4, radius pill.

**Chips:** category/section tags; pill radius; horizontal scroll.

### 6.7 Buttons

**Variants:** primary (filled), secondary (filled neutral), tertiary (text), icon (square).

**Props:** `title?`, `icon?`, `loading?`, `disabled?`, `onPress()`, `size?: 'sm'|'md'|'lg'`.

**States:** hover (desktop only), focus, pressed, loading, disabled.

**A11y:** Role button; loading announces "in progress".

### 6.8 Inputs

**Fields:** email/username/password, search.

**Anatomy:** label (caption), field (radius md), helper/error text.

**Validation:** real-time; error turns border to semantic.error, helper stays muted.

**Props:** `label`, `placeholder`, `value`, `error?`, `helper?`, `secureTextEntry?`, `leftIcon?`, `rightIcon?`, `onChangeText`.

### 6.9 Empty States

**Style:** duotone illustration; single sentence; primary CTA.

**Examples:**
- **Main Feed:** "No updates yet. Invite friends or follow groups." CTAs: Find Friends / Create Group.
- **Requests:** "You're all caught up." CTA: Find Friends.

### 6.10 Skeletons/Shimmers

**Feed card:** image block + 2 text lines + meta line.

**List row:** avatar + 2 lines.

**Timing:** Appear within 80ms; shimmer cycle ~1s; honor Reduce Motion (switch to static blocks).

### 6.11 Banners/Toasts/Sheets

**Banners:** offline, updates, consent; anchored below top bar.

**Toasts:** bottom stacked, 3s default; actions up to 1.

**Sheets:** post visibility, report/mute menus.

**A11y:** Live region announcements.

### 6.12 Segmented Control (Feed tabs)

**Segments:** All / Photos / Work / Family (configurable per group).

**Behavior:** sticky under header; ink animation 160ms; preserve scroll per segment.

## 7) Layout & Grid Rules

- **Safe areas:** Respect insets; top bar height 56–64 (dynamic type aware).

- **Gutters:** page horizontal padding `space.4` (16); large phones `space.6` (24).

- **Vertical rhythm:** stack spacing `space.3` (12) between independent blocks; `space.2` (8) within blocks.

### Density presets:

- **Compact** (small phones ≤360dp): tighter paddings (`space.3` gutters), shorter headlines.
- **Comfortable** (default): spec values above.
- **Spacious** (≥400dp): gutters `space.6`, image ratios may increase to 1.91:1.

## 8) Navigation Architecture

**React Navigation:** Bottom Tabs + per-tab Stacks + Modals (Composer, Sheets).

**Tabs:** Home, Groups, Post (modal), Inbox, Profile.

### Stacks:

- **HomeStack:** Main Feed → Friend Feed → Post Detail → Composer (modal)
- **GroupsStack:** Groups List → Group Feed → Group Members/Settings
- **InboxStack:** Requests, Notifications, Mentions
- **ProfileStack:** My Profile, Settings & Privacy

### Deep links (examples):

- `friendlines://post/:id`
- `friendlines://group/:id`
- `friendlines://user/:id`
- `friendlines://requests`
- `friendlines://compose?groupId=:id`

## 9) Screen-by-Screen Blueprints

All screens specify purpose, layout, actions, content rules, states, gestures, and example routes.

### 9.1 Onboarding (first run)

**Purpose:** Seed network: pick groups, invite contacts (explicit consent), choose notifications.

**Primary:** Continue; **Secondary:** Skip for now.

**Layout:** Pager (3–4 slides): Welcome → Pick Groups → Find Friends → Notifications opt-in.

**Content rules:** Titles ≤ 40 chars; body ≤ 120 chars.

**States:** Loading suggestions; Error (retry); Offline (skip suggestions).

**Gestures:** Swipe, back.

**Deep link:** `friendlines://onboarding`

### 9.2 Login

**Purpose:** Auth to access personalized feeds.

**Primary:** Sign in; **Secondary:** Create account / Forgot password.

**Layout:** Top logo; fields; SSO row (if available); legal links small.

**Validation:** Email format, password length; surface errors inline.

**States:** Loading, Error (rate limit), Offline (local-only mode).

**Gestures:** Dismiss keyboard on swipe down.

**Route:** `/login`

### 9.3 Main Feed (All)

**Purpose:** Personal newsroom across friends & groups.

**Primary:** Read cards; **Secondary:** Filter/segment; compose.

**Layout:** Top bar + Segmented Control; vertical VirtualizedList of Cards; pull-to-refresh; sticky "New posts" pill.

**Content rules:** Headlines ≤ 85 chars; subhead 1 line; byline/timestamp meta; show source chip.

**States:** Loading skeletons; Empty (invite/find); Error (retry); Offline (cached).

**Gestures:** Pull-to-refresh; long-press card → sheet (Save, Mute, Share, Report).

**Route:** `/feed/main`

### 9.4 Group List & Management

**Purpose:** Discover/manage groups.

**Primary:** Open group feed; **Secondary:** Create group.

**Layout:** Search; list of Group Items; "+ Create Group" button.

**States:** Empty (no groups); Error; Offline.

**Route:** `/groups`

### 9.5 Group Feed (per group)

**Purpose:** Focused updates for one group.

**Primary:** Read/post to group; **Secondary:** Filter by segment.

**Layout:** Group header (cover/avatar stack, name, members); feed list of Cards.

**Content rules:** Indicate visibility icon (group-only).

**Gestures:** Swipe to reveal "Mute group" / "Snooze 30d".

**Route:** `/groups/:id`

### 9.6 Friend Feed (per friend)

**Purpose:** Person-centric stream.

**Primary:** Read; **Secondary:** Mute/Snooze.

**Layout:** Friend header (avatar, presence, bio); feed list of Cards; mutual groups chip row.

**Route:** `/users/:id`

### 9.7 Friend Requests

**Purpose:** Review & act on incoming requests.

**Primary:** Accept; **Secondary:** Ignore/Block.

**Layout:** Requests list (Request Items) grouped by Today/Earlier; top actions: "Accept all (n)".

**States:** Empty, All caught up.

**Gestures:** Swipe Accept/Ignore.

**Route:** `/requests`

### 9.8 Find Friends

**Purpose:** Search & suggestions.

**Primary:** Add friend; **Secondary:** Invite.

**Layout:** Search field; suggestions (horizontal); results list.

**Privacy:** Contacts permission is opt-in and revocable.

**Route:** `/find`

### 9.9 Composer (Create Post)

**Purpose:** Publish quick updates with newsroom clarity.

**Primary:** Post; **Secondary:** Set visibility, add media.

**Layout:** Modal: Headline field (1–2 lines), Body (optional), Attachments row (camera, library), Audience control (Only Me/Friends/Group/Custom), Group selector when posting into a group.

**Rules:** Headline required; enforce visibility preview; alt text for images.

**States:** Draft, Uploading (progress), Failed (retry), Queued (offline).

**Route:** `/compose` (modal)

### 9.10 Notifications / Inbox

**Purpose:** Requests, mentions, replies, follows in one place.

**Primary:** Open item; **Secondary:** Mark all read.

**Layout:** Tabs (All / Mentions / Requests); list items with meta.

**Route:** `/inbox`

### 9.11 Search & Global Command

**Purpose:** Find people, groups, posts quickly.

**Primary:** Search; **Secondary:** Recent queries.

**Layout:** Universal search field; sections with "See all"; keyboard focus by default.

**Route:** `/search?q=`

### 9.12 My Profile

**Purpose:** Self overview & quick settings.

**Primary:** Edit profile; **Secondary:** View saved items.

**Layout:** Avatar (xl), name, handle; stats (posts, groups); sections: Saved, Visibility defaults, Connected accounts.

**Route:** `/me`

### 9.13 Settings & Privacy

**Purpose:** Controls for visibility, mute/snooze, permissions, notifications, data.

**Sections:** Account, Privacy & Safety, Notifications, Permissions (Camera/Contacts), Data & Devices, About.

**Route:** `/settings`

### 9.14 Moderation/Reporting

**Purpose:** Safe community.

**Flow:** Long-press → Report → choose reason → optional comment → confirm. Offer mute/block with clear undo.

**Route:** Sheet from any card.

### 9.15 Help & About

**Purpose:** Quick FAQs, contact support, version/build.

**Route:** `/help`

## Creative Screen Improvements

- **Daily Digest** (Morning/Evening): Auto-curated summary cards (top 5 updates) with quick catch-up.
- **Highlights Reel:** Tap-through full-bleed images/videos of key posts (story-like but newsy).
- **Quiet Mode:** Scheduled mute/snooze with banner indicating when updates resume.

## 10) States & Edge Cases

- **Loading:** Skeletons within 80ms; initial list shows ≥ 6 placeholders.

- **Empty:** Clear next steps + CTA; avoid "no content" dead ends.

- **Error:** Inline message with Retry; do not block entire screen if partial data is available.

- **Offline:** Banner + cached feeds; composer queues posts and indicates "Will send when online."

- **Conflicts:** If a queued post conflicts, show sheet: Keep Local / Overwrite / Discard.

## 11) Theming (light/dark/high-contrast; brand customization)

- **Light/Dark:** Use `color.light.*` / `color.dark.*`. Apply elevation-overlay to raised surfaces (dark mode) to preserve depth.

- **High-Contrast:** Swap to `contrast.*` tokens and enforce outlines around tappables.

- **Brand customization:** Replace `color.brand.*` and optionally secondary; all component tokens reference semantic roles so palettes swap cleanly. Provide an override file with only keys under `color.brand` (non-breaking).

## 12) Performance & Offline

- **Lists:** Use FlashList/FlatList with getItemLayout when fixed heights; keyExtractor stable; windowing tuned per device.

- **Images:** Use expo-image or react-native-fast-image; serve thumb (≤ 320w) in lists, eager for viewport items; lazy-load full-res on detail. Prefer WEBP/AVIF where supported.

- **Caching:** Memory cache for thumbs; disk cache for recent; prefetch next 2 screenfuls on idle.

- **Shimmers:** Use Reanimated/Lottie only if Reduce Motion off; otherwise static blocks.

- **Optimistic UX:** Save/Follow changes reflect immediately; rollback on failure with toast.

- **Offline:** Use persistent queue for posts, with per-item retry backoff; conflict resolution UI (see §10).

## 13) Quality Bar & Acceptance Criteria

- **Tokens:** Light/dark palettes compile; body text AA; meta AAA where possible.

- **Touch & Focus:** All targets ≥44×44; clear focus outlines; TalkBack/VoiceOver labels present and meaningful.

- **Screens:** Each blueprint ships loading/empty/error/offline variants.

- **Motion:** Honors Reduce Motion; durations within tokens; no gratuitous animations.

- **Performance:** Time-to-first-skeleton < 300ms; scroll FPS ~60 on mid devices; images never block input.

- **Privacy:** Visibility indicators shown before posting; revoke permissions clearly available.

- **Creative features:** Digest, Highlights Reel, Quiet Mode implemented with configurable schedules.

## 14) Appendix: Example React Native Snippets

Examples show StyleSheet (tokens object) and NativeWind/Tailwind-RN usage.

### Tokens import (JS)

```javascript
// tokens.js
export const tokens = {
  color: {
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#1F2937",
    textMuted: "#475569",
    divider: "#E2E8F0",
    brand: "#2D5BFF",
    pressed: "rgba(45,91,255,0.12)",
    error: "#EF4444"
  },
  radius: { sm: 6, md: 10, lg: 14, xl: 20, pill: 999 },
  space: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40 },
  font: {
    headline: { size: 26, weight: "700", lh: 1.35 },
    body: { size: 16, weight: "400", lh: 1.5 },
    meta: { size: 12, weight: "500", lh: 1.2 }
  },
  elevation: {
    1: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, android: 1 }
  }
};
```

### Card (News Item) — StyleSheet

```javascript
import { StyleSheet, Pressable, Image, View, Text } from "react-native";
import { tokens } from "./tokens";

export function NewsCard({ thumbnailUrl, ratio="16:9", source, headline, subhead, timestamp, onPress }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      {thumbnailUrl ? <Image source={{ uri: thumbnailUrl }} style={[styles.thumb, ratioStyles[ratio]]} /> : null}
      <View style={styles.body}>
        <View style={styles.metaRow}>
          <Text style={styles.chip}>{source?.name}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.time}>5m ago</Text>
        </View>
        <Text numberOfLines={2} style={styles.headline}>{headline}</Text>
        {subhead ? <Text numberOfLines={1} style={styles.subhead}>{subhead}</Text> : null}
      </View>
      <View style={styles.divider} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.color.surface,
    borderRadius: tokens.radius.md,
    marginHorizontal: tokens.space[4],
    marginVertical: tokens.space[3],
    overflow: "hidden",
    ...Platform.select({
      ios: tokens.elevation[1],
      android: { elevation: tokens.elevation[1].android }
    })
  },
  pressed: { backgroundColor: tokens.color.pressed },
  thumb: { width: "100%", backgroundColor: "#E2E8F0" },
  body: { padding: tokens.space[4] },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: tokens.space[2] },
  chip: { backgroundColor: "#F1F5F9", color: tokens.color.textMuted, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, overflow: "hidden" },
  dot: { color: tokens.color.textMuted, marginHorizontal: 8 },
  time: { color: tokens.color.textMuted, fontSize: tokens.font.meta.size },
  headline: { color: tokens.color.text, fontSize: tokens.font.headline.size, fontWeight: tokens.font.headline.weight, lineHeight: tokens.font.headline.size * tokens.font.headline.lh },
  subhead: { color: tokens.color.textMuted, fontSize: tokens.font.body.size },
  divider: { height: 1, backgroundColor: tokens.color.divider, marginTop: tokens.space[3] }
});

const ratioStyles = {
  "16:9": { aspectRatio: 16/9 },
  "1:1": { aspectRatio: 1 },
  "1.91:1": { aspectRatio: 1.91 }
};
```

### Button — StyleSheet

```javascript
export function Button({ title, onPress, variant="primary", disabled, loading, icon }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      style={({pressed}) => [
        base.btn,
        variants[variant],
        (pressed && !disabled) ? base.pressed : null,
        disabled ? base.disabled : null
      ]}
    >
      {icon}
      <Text style={[base.label, variant === "primary" ? base.labelPrimary : base.labelSecondary]}>
        {loading ? "Please wait…" : title}
      </Text>
    </Pressable>
  );
}

const base = StyleSheet.create({
  btn: { minHeight: 44, borderRadius: tokens.radius.lg, paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.5 },
  label: { fontSize: 16, fontWeight: "600" },
  labelPrimary: { color: "#FFFFFF" },
  labelSecondary: { color: tokens.color.text }
});

const variants = StyleSheet.create({
  primary: { backgroundColor: tokens.color.brand },
  secondary: { backgroundColor: "#F1F5F9" },
  tertiary: { backgroundColor: "transparent" }
});
```

### ListItem (Friend) — NativeWind/Tailwind-RN style

```javascript
// Using NativeWind className (no custom colors specified here for brevity)
export function FriendItem({ avatarUrl, name, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3">
      <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full mr-3 bg-slate-200" />
      <View className="flex-1">
        <Text className="text-slate-800 text-base font-semibold" numberOfLines={1}>{name}</Text>
        {subtitle ? <Text className="text-slate-500 text-sm" numberOfLines={1}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}
```

## Media Rules

- **Aspect ratios:** 1.91:1 (wide news), 16:9 (default), 1:1 (profiles/grids).
- **Cropping:** Center-weighted; face detection if available.
- **Safe areas:** Keep text overlays ≥16 px from edges.
- **Loading:** LQIP or dominant-color placeholder; fade-in on load.

## Privacy, Safety, and Consent (Flows & Copy)

- **Post visibility:** Only Me / Friends / Group / Custom. Toggle shows audience summary chip on composer & card.
- **Cross-post indicators:** "Shared to Main Feed from Office" chip.
- **Mute/Snooze:** Long-press → Mute Person/Group or Snooze (30 days); snackbar with Undo.
- **Reporting/Blocking:** Confirm sheet ("We'll review this. Want to block Avi too?").
- **Permissions:** Camera/Photos/Contacts ask-in-context; explain benefit, provide "Not now".

## States Mapping (Tokens → Components)

| Component | BG | FG | Border/Divider | Press/Focus |
|-----------|----|----|----------------|-------------|
| Top Bar | surface | text | divider | focus |
| Card | surface | text / text-muted | divider | states.pressed (overlay) |
| Chip | chip-bg | text-muted | — | selected bg selected |
| Badge | badge-bg | neutral.0 | — | scale 0.98 on press |
| Button Primary | brand.primary | neutral.0 | — | pressed opacity 0.92 |
| Button Secondary | chip-bg | text | divider | pressed overlay |
| Input | surface | text | divider (focused→brand) | focus ring |
| Banner (warning) | warning (12% tint) | warning (700) | — | — |

## Gestures & Haptics

- **Pull-to-refresh:** light selection feedback on completion.
- **Long-press card:** context sheet with light impact.
- **Tab change:** selection feedback on switch.
- **Never use heavy haptics for routine actions.**

## Example Deep Links / Routes

- `friendlines://feed/main`
- `friendlines://groups/:id`
- `friendlines://users/:id`
- `friendlines://compose?groupId=`
- `friendlines://requests`
- `friendlines://inbox?tab=mentions`

## Implementation Notes (Engineers)

- **React Navigation:** Tabs + Stacks + present modals for Composer/Sheets.
- **I18n:** dayjs/date-fns with locale packs; switch relative/absolute on tap.
- **RTL:** I18nManager.allowRTL(true); test both directions manually.
- **A11y testing:** iOS VoiceOver rotor, Android TalkBack traversal; confirm logical order.
- **Design tokens:** Central tokens.ts + theme provider; dark/high-contrast variants swapped at runtime.

## Final Acceptance Checklist

- [ ] All screens implement loading/empty/error/offline variants
- [ ] Text styles honor dynamic type and maintain hierarchy
- [ ] Contrast AA for body; AAA for meta where feasible
- [ ] Tappable targets ≥ 44×44, spacing consistent with space.*
- [ ] Long-press menus on cards and list items
- [ ] Composer shows audience and offers consentful media permissions
- [ ] Offline read + queued posts implemented
- [ ] Digest, Highlights, and Quiet Mode shipped with settings
- [ ] Deep links registered and tested on iOS/Android
- [ ] Theming verified in light/dark/high-contrast

## Quick Props Reference (TypeScript-style)

```typescript
type Source = { type: 'friend'|'group'; name: string; avatarUrl?: string };

type NewsCardProps = {
  id: string;
  thumbnailUrl?: string;
  ratio?: '16:9'|'1:1'|'1.91:1';
  source: Source;
  headline: string;
  subhead?: string;
  timestamp: string; // ISO
  isRead?: boolean;
  onPress(): void;
  onShare?(): void;
  onSave?(saved: boolean): void;
  onMute?(): void;
  menuItems?: { label: string; onPress: () => void; destructive?: boolean }[];
};

type ListItemFriendProps = {
  avatarUrl: string;
  name: string;
  subtitle?: string;
  presence?: 'online'|'offline';
  cta?: 'Follow'|'Invite';
  onPress(): void;
  onCTA?(): void;
};
```