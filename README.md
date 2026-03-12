# Smoke Tracker

A minimal, real-time web app for tracking cigarette resistance streaks — with friends and a leaderboard to keep you accountable.

Built with vanilla HTML/CSS/JS and [Supabase](https://supabase.com) for backend storage and auth.

---

## Features

### Tracker
- Real-time resistance timer showing time since your last cigarette
- Start, stop, or log a relapse (smoke) in one tap
- Full session history with personal stats
- Personal best (longest streak) tracking

### Friends
- Add friends by username
- Accept or decline incoming friend requests
- See your friends' live resistance timers in real time

### Leaderboard
- Global ranking across you and your friends
- Live timers for active sessions
- Medal system for the top 3

### Auth
- Email/password sign-up and sign-in
- Password recovery via email
- Persistent sessions across browser reloads

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, JavaScript |
| Backend | [Supabase](https://supabase.com) (PostgreSQL + Auth) |
| Icons | [Font Awesome](https://fontawesome.com) 6.5.2 |
| Fonts | Google Fonts — Bebas Neue, DM Mono |

No build tools, no frameworks, no dependencies to install.

---

## Project Structure

```
smoke-tracker/
├── index.html      # Auth page (sign in / sign up / password recovery)
├── app.html        # Main app (tracker, friends, leaderboard)
└── favicon.svg     # App icon
```

---

## Database Schema

```
profiles
  id          UUID  (FK → auth.users)
  username    TEXT  unique, lowercase

sessions
  id          UUID
  user_id     UUID  (FK → profiles)
  start_time  BIGINT  (ms timestamp)
  end_time    BIGINT  (ms timestamp, nullable — null = active session)

friendships
  id          UUID
  user_id     UUID  (FK → profiles)
  friend_id   UUID  (FK → profiles)
  status      TEXT  ('pending' | 'accepted')
  created_at  TIMESTAMP
```

---

## Getting Started

The app runs as a static site — no build step required.

1. Clone or download this repository
2. Set up a [Supabase](https://supabase.com) project and create the tables above
3. Replace the Supabase URL and anon key in `app.html` and `index.html` with your project's credentials
4. Deploy the two HTML files to any static host (Vercel, Netlify, GitHub Pages, etc.)

---

## Design

- Dark theme with a cyberpunk-inspired lime green accent (`#c8f560`)
- All state is stored in Supabase — JavaScript only drives the live timer display
- Timer ticks every second client-side; no polling or websockets needed

---

## License

MIT
