# Design backup — "Graphite & Signal Red" (original Phase 1–2 identity)

This is the **original public homepage design** — dark graphite ground, signal-red
accent (`#d63a48` / `#ea4c5a`), mono + sans type, subtle grid background — that
preceded the **"Batik × British Racing Green / Gold"** redesign (shipped 2026-07-09).

## Files
- `Portfolio.tsx` — the public homepage component (client) for this design
- `globals.css` — the full stylesheet for this design

## How to restore
Copy these two files back over the live ones, then restart the dev server:

```bash
cp design-backups/graphite-red/Portfolio.tsx  web/src/components/Portfolio.tsx
cp design-backups/graphite-red/globals.css    web/src/app/globals.css
```

No database / schema / admin changes are involved — the data layer (`content.ts`,
`i18n.ts`, Prisma, the admin panel) is **design-agnostic and shared** by both
designs, so swapping these two files is all it takes.

> This version of `Portfolio.tsx` already includes the later fixes (language-aware
> CV with preview-tab + auto-download, certificate lightbox). Only the *look* differs.

## Why it lives here (outside `web/`)
Kept **outside `web/`** on purpose so Next.js, TypeScript, and ESLint never compile
or lint it — it's inert backup with zero conflict with the current design.
