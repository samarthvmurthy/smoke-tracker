# Smoke Free — Professional Polish Plan

## Overview
Four areas of improvement following Google Play closed testing submission:
1. SEO — rank for smoking-related queries
2. File structure — professional GitHub repo layout
3. Roadmap — planned features and platform rollouts
4. Product page + iOS/MS Store planning

## Progress
- [x] Fix password recovery redirect URL (GitHub Pages → smokefreetimer.com)
- [x] SEO (robots.txt, sitemap.xml, meta tags, JSON-LD)
- [ ] File structure reorganization
- [ ] Product landing page (index.html conversion)
- [ ] ROADMAP.md
- [ ] iOS & MS Store planning docs

---

## Part 1 — SEO

### New files to create
| File | Purpose |
|---|---|
| `/robots.txt` | Allow all crawlers, point to sitemap |
| `/sitemap.xml` | List all public pages with priority weights |

### Meta tags to add to all pages
- `<meta name="description">` — unique per page
- `<meta name="keywords">` — smoking-related terms
- `<link rel="canonical">` — absolute URL
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD `WebApplication` structured data (landing page only)

### Target keywords
quit smoking app, smoke free timer, cigarette tracker, smoking cessation, resist smoking, stop smoking counter, quit smoking with friends, smoking streak tracker

---

## Part 2 — File Structure Reorganization

### Strategy
Web files stay at root (Vercel requirement + PWA spec).
Everything else moves into subdirectories.

### New structure
```
smoke-tracker/
│
├── index.html              ← converted to product landing page
├── login.html              ← new (auth, moved from index.html)
├── app.html                ← unchanged
├── about.html              ← unchanged
├── privacy.html            ← unchanged
├── manifest.json           ← stays at root (PWA spec)
├── sw.js                   ← stays at root (PWA spec)
├── favicon.svg             ← stays at root
├── icon-192.png            ← stays at root (referenced by manifest)
├── icon-512.png            ← stays at root (referenced by manifest)
├── robots.txt              ← new
├── sitemap.xml             ← new
├── README.md               ← unchanged
├── .gitignore              ← new
│
├── .well-known/
│   └── assetlinks.json
│
├── android/                ← new folder
│   ├── app/
│   ├── build.gradle
│   ├── settings.gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── gradle/
│   └── twa-manifest.json
│
├── tools/                  ← new folder
│   ├── generate-icons.html
│   └── generate-feature-graphic.html
│
├── assets/
│   └── store/              ← new folder
│       ├── store_icon.png
│       ├── feature-graphic.png
│       ├── screenshot-mobile.jpeg
│       ├── screenshot-mobile-1.jpeg
│       ├── screenshot-mobile-2.jpeg
│       ├── screenshot-mobile-3.jpeg
│       └── screenshot-desktop.png
│
└── docs/                   ← new folder
    ├── RELEASE_NOTES.md
    └── ROADMAP.md
```

### .gitignore contents
```
# Android build artifacts
*.apk
*.aab
*.idsig
*.keystore
.gradle/
build/
android/build/

# Logs & temp
*.log
manifest-checksum.txt

# OS
.DS_Store
Thumbs.db

# Sensitive
*.csv
*.env
```

### Files to delete
- `hs_err_pid31476.log` — JVM crash log
- `manifest-checksum.txt` — bubblewrap artifact

### Internal link updates required
| Location | Current link | Updated to |
|---|---|---|
| `app.html` signout | `index.html` | `login.html` |
| `about.html` back button | `index.html` | `login.html` |
| `privacy.html` back button | `index.html` | `login.html` |
| `about.html` footer "Sign In" | `index.html` | `login.html` |
| `privacy.html` footer "Sign In" | `index.html` | `login.html` |
| `sw.js` SHELL cache | `/index.html` | add `/login.html`, `/privacy.html` |

### Bug fix (found during audit)
`login.html` (current index.html) has a hardcoded password recovery redirect pointing to:
`https://samarthvmurthy.github.io/smoke-tracker/`
→ Must be changed to: `https://www.smokefreetimer.com/`

---

## Part 3 — Product Landing Page (index.html)

### Sections
1. **Hero** — App name, tagline, CTA buttons (Open App · Get on Google Play · Coming to iOS)
2. **Feature highlights** — 3 cards: Timer / Friends / Leaderboard
3. **Screenshots** — mobile screenshot display
4. **Download section** — platform badges
5. **Footer** — About · Privacy · MIT License

### Behaviour
- If user is already signed in (Supabase session exists), auto-redirect to `app.html`
- Style consistent with the existing app design (dark theme, lime green accent)

---

## Part 4 — Roadmap

### v1.1
- Push notifications (friend beats your streak)
- Milestone badges (24h, 1 week, 1 month, 3 months)
- Username change support

### v1.2
- Session notes (log reason for relapse)
- Weekly stats summary / history chart
- Dark/light theme toggle

### v1.3
- Account merge / social login (Google OAuth)
- Shareable streak card (image export)
- Widgets (Android home screen)

### v2.0
- iOS App Store release
- Microsoft Store release
- Offline support improvements

### Platform Rollout Timeline
| Platform | Status | Target |
|---|---|---|
| Web (smokefreetimer.com) | ✅ Live | — |
| Android (Google Play) | 🔄 Closed beta | Now |
| Android (Production) | ⏳ Pending | +14 days from beta approval |
| Microsoft Store | 📋 Planned | Q3 2026 |
| iOS App Store | 📋 Planned | Q3 2026 |

---

## Part 5 — iOS & Microsoft Store Plans

### iOS — Options

**Option A: PWA via Safari (free)**
- Users add to home screen from Safari browser
- No App Store listing
- No push notifications on older iOS
- Zero cost, zero effort

**Option B: Capacitor (recommended for App Store)**
- Wraps the PWA in a native iOS shell
- Gets a real App Store listing
- Requires: Apple Developer account ($99/year) + Mac with Xcode
- Steps:
  1. `npm install @capacitor/core @capacitor/cli`
  2. `npx cap init`
  3. Point Capacitor at `smokefreetimer.com`
  4. `npx cap add ios`
  5. Build + archive in Xcode
  6. Submit via App Store Connect

### Microsoft Store — PWABuilder (free)

1. Go to pwabuilder.com
2. Enter `https://www.smokefreetimer.com`
3. It scores your PWA and generates an MSIX package
4. Download the package
5. Submit to Microsoft Partner Center (free account)
6. No code changes required — it wraps the live site

---

## Execution Order (when approved)
1. Create `.gitignore` + delete junk files
2. Move files into `android/`, `tools/`, `docs/`, `assets/store/`
3. Fix hardcoded GitHub Pages redirect URL
4. Update all internal links
5. Update `sw.js` cache list
6. Create `login.html` from old auth content
7. Convert `index.html` to product landing page
8. Add SEO meta tags to all pages
9. Create `robots.txt` and `sitemap.xml`
10. Create `docs/ROADMAP.md`
11. Commit and push
