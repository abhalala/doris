# AGENTS

This file is for AI agents (Hermes, Claude Code, Codex) working in this project.

## Project Overview

D.O.R.I.S. — Durable Offloaded Rust Isomorphic Stack. A Cloudflare-native architecture pattern and documentation site.

## Build Commands

```bash
npm run dev      # dev server
npm run build    # production build (outputs to out/)
npm run typecheck
```

## Architecture

This repo serves two purposes:
1. **Documentation site** at doris.bhalala.org (Cloudflare Pages)
2. **Architecture reference** for the D.O.R.I.S. pattern

The site is built with **[Fumadocs](https://fumadocs.dev)** — a Next.js-powered documentation framework using MDX.

Source files:
- `content/docs/*.mdx` — documentation pages (MDX with frontmatter)
- `app/` — Next.js app router pages
- `components/` — shared React components (MDX component registrations)
- `lib/` — source loader and shared layout config
- `public/` — legacy static site (no longer deployed)

When the D.O.R.I.S. pattern is used for an actual app (Rust Worker), source files go in `src/`.

## Deploy

Cloudflare Pages auto-deploys from `main` branch. Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Secrets.

### Current Deployments

- **Pages project:** `doris` (ID: 9997285a-09c4-413e-81f7-274bc74f4eb8)
- **Production URL:** https://doris-4cn.pages.dev
- **Custom domain (pending DNS):** https://doris.bhalala.org
- **Account ID:** `e964e7338c7bd53c84a54679fbefa48a`

### Manual Deploy

```bash
npm run build && npx wrangler pages deploy out --project-name=doris
```

## Security

- Public docs site — no sensitive data
- No credentials in source
- Cloudflare handles edge security

## Engine Guidance

- Content changes → direct commit
- Architecture changes → plan first
