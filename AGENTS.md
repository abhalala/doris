# AGENTS

This file is for AI agents (Hermes, Claude Code, Codex) working in this project.

## Project Overview

D.O.R.I.S. — Durable Offloaded Rust Isomorphic Stack. A Cloudflare-native architecture pattern and documentation site.

## Build Commands

Static site (currently deployed):
```bash
# No build step needed - pure HTML/CSS/JS
# Lives in /public directory
```

## Architecture

This repo serves two purposes:
1. **Documentation site** at doris.bhalala.org (Cloudflare Pages)
2. **Architecture reference** for the D.O.R.I.S. pattern

Source files live in `public/`. When the D.O.R.I.S. pattern is used for an actual app (Rust Worker), source files go in `src/`.

## Deploy

Cloudflare Pages auto-deploys from `main` branch. Set `CLOUDFLARE_API_TOKEN` in GitHub Secrets.

## Security

- Public docs site — no sensitive data
- No credentials in source
- Cloudflare handles edge security

## Engine Guidance

- Content changes → direct commit
- Architecture changes → plan first
