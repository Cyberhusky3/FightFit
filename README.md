# FightFit AI

FightFit AI is a production-ready MVP concept for beginners who want to get fit and learn how to fight safely. It now includes a standalone HTML/CSS/JavaScript version (`index.html`) that can be opened directly in a browser without a Node.js build step, plus the original Next.js scaffold.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn-inspired local UI primitives
- Framer Motion-ready dependency
- LocalStorage assessment persistence
- Mock seed data in `lib/data.ts`

## Run locally

### Standalone HTML version

Open `index.html` directly in any modern browser, or serve the folder with a static server:

```bash
python3 -m http.server 3000
```

Then open http://localhost:3000.

### Next.js version

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## HTML-compatible MVP

The standalone version includes the full journey in one responsive document: discovery, assessment, results, roadmap, dashboard, skill trees, training plans, gym finder, gear store, premium, and profile. Assessment state is persisted with `localStorage`.

## Pages

- `/` Home
- `/assessment` Assessment quiz
- `/results` Style matching results and roadmap
- `/dashboard` XP, streaks, achievements, goals
- `/skill-trees` Visual skill trees
- `/training-plans` Weekly plan and workout blocks
- `/gym-finder` Affiliate-ready gym finder placeholder with realistic mock listings
- `/gear-store` Affiliate-ready starter gear recommendations
- `/premium` AI Coach Premium and upgrade surface
- `/profile` User profile and progress
