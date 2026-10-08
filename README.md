# SnapEarn (Next.js, frontend only)

Next.js 14 (App Router) + TypeScript + Tailwind. All data is mocked; no backend.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run typecheck
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

## Deploy to Vercel
1. Import this GitHub repository in Vercel and select the `main` production branch.
2. Keep the detected Next.js framework preset and default build settings (`npm run build`).
3. No environment variables are required for the current frontend-only demo.
4. Deploy. Vercel will create preview deployments for pull requests and production deployments for pushes to `main`.

GitHub Actions runs lint, TypeScript checks, and a production build on pushes to `main` and pull requests.

This MVP uses mock data and browser-local demo authentication. It does not provide production authentication, a database, or real payment processing; do not use it to handle real accounts or payments.
