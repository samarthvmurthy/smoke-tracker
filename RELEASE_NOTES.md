# Release Notes

## beta-v1.0.0 — 2026-03-12

First public beta release of Smoke Tracker.

---

### What's Included

#### Core App
- Real-time resistance timer that tracks time since your last cigarette
- Session management: start a session, stop cleanly, or log a relapse
- Full session history with total session count and personal best streak
- Clear all sessions option

#### Social Features
- Add friends by username
- Send, accept, and decline friend requests
- Notification badge on incoming requests
- Friends list showing each friend's live resistance timer or last session time

#### Leaderboard
- Ranked view across yourself and all accepted friends
- Live elapsed timers for active sessions
- Gold / silver / bronze medals for top 3 positions
- Current user highlighted for quick reference

#### Authentication
- Email/password sign-up with username validation
- Sign-in with persistent session across page reloads
- Password recovery via email link
- Clean sign-out

---

### Bug Fixes & Polish (pre-release)

| Fix | Details |
|---|---|
| Leaderboard timer accuracy | Corrected elapsed time calculation for active sessions on the leaderboard |
| Password recovery redirect | Fixed redirect URL after clicking the recovery email link |
| Bootstrap loading state | Resolved a race condition where the app could render before the session was loaded |
| App icon | Iterated and finalized the favicon (cigarette with ban-slash) across all contexts |
| Header layout | Fixed header alignment and spacing on mobile and desktop |

---

### Known Limitations

- No mobile app — web only
- Timers sync every second client-side; friends' timers are not pushed in real time (requires a manual refresh to resync after extended idle)
- Username cannot be changed after account creation
- No account deletion flow in the UI

---

### Tech

- Vanilla HTML/CSS/JS — no framework, no build step
- Supabase (PostgreSQL + Auth) for all persistent state
- Font Awesome 6.5.2, Google Fonts (Bebas Neue, DM Mono)
