# SnapEarn (Next.js, frontend only)

Next.js 14 (App Router) + TypeScript + Tailwind. All data is mocked; no backend.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
Log in with any email/password (demo session is kept in localStorage).

## Routes
| Route | Screen |
|---|---|
| `/login`, `/signup` | Auth |
| `/` | Feed |
| `/explore` | Search / Explore (Figma) |
| `/challenges` | Challenges list |
| `/challenges/[id]/join` | Payment method (Figma) |
| `/challenges/[id]/payment` | Card entry (Figma) |
| `/challenges/[id]/success` | Payment done (Figma) |
| `/dashboard` | Earnings + withdrawals |
| `/profile`, `/profile/edit` | Profile, Edit profile (Figma) |
| `/settings` | Settings (Figma) |

Tab screens live in `src/app/(main)` (header + bottom nav); full-screen flows in `src/app/(sub)`.
Deploy: push to GitHub and import in Vercel (framework auto-detected).
