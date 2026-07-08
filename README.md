# Muhammad Endar Darmawan — Personal Portfolio

An interactive, bilingual (EN/ID), fully responsive portfolio website with a web-based admin
panel for editing content — no code changes needed to update it.

- **Design:** "Graphite & Signal Red" — a technical / blueprint aesthetic (mono labels, signal-red accent).
- **Stack:** Next.js 16 (App Router, TypeScript) · React 19 · Prisma + SQLite · custom auth (jose + bcrypt) · hand-written CSS.

## Folder layout

```
endarmawan/
├─ web/                 # the Next.js application (the real project)
│  ├─ src/app/          # pages + layout + global CSS
│  ├─ src/components/   # Portfolio, Reveal, CountUp
│  ├─ src/lib/          # prisma client, content loader, i18n strings
│  └─ prisma/           # schema, migrations, seed (CV content, bilingual)
├─ assets/              # source media (profile photo, CV PDF/DOCX)
├─ index.html           # phase-1 self-contained static preview (reference)
├─ build/               # base64 build intermediates (git-ignored)
└─ archive/             # earlier attempt, superseded (git-ignored)
```

## Run locally

```bash
cd web
npm install
npm run db:migrate      # create the SQLite DB + apply schema
npm run db:seed         # load the portfolio content
npm run dev             # http://localhost:3000
```

### Required env (`web/.env`)

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<random-32-byte-base64>"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="change-me"
PRISMA_CLIENT_ENGINE_TYPE=binary      # only needed on 32-bit Node
PRISMA_CLI_QUERY_ENGINE_TYPE=binary   # only needed on 32-bit Node
```

## Note on 32-bit Node (ia32)

This machine currently runs 32-bit Node, which the modern toolchain doesn't fully support.
Workarounds already applied: Prisma pinned to v6 with `engineType = "binary"`, dev/build use
`--webpack` (Turbopack has no ia32 build), Tailwind removed (its `lightningcss` has no ia32
binary — the project uses hand-written CSS anyway), and the webpack dev cache is disabled.
**Recommended:** install 64-bit Node 22 LTS before production build/deploy to remove all of this.

## Roadmap

- [x] Phase 1 — static design preview
- [x] Phase 2 — public site, DB-driven, bilingual, interactive
- [ ] Phase 3 — admin panel (login + CRUD + image upload)
- [ ] Phase 4 — polish + deployment
