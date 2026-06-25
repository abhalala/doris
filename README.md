# D.O.R.I.S.

**Durable Offloaded Rust Isomorphic Stack**

A Cloudflare-native architecture pattern: Rust WASM Workers + Axum router + Durable Objects for CPU offload + WebSocket push + D1 database — all deployed with one click.

> Extracted from [warden-worker](https://github.com/abhalala/warden-worker), a Bitwarden-compatible server written in Rust compiled to WASM on Cloudflare Workers.

## The 7 Pillars

| Pillar | Description |
|--------|-------------|
| **1. Rust → WASM** | Rust code to WebAssembly via `worker-build`. Axum runs inside the Worker |
| **2. JS Entry Wrapper** | Thin JS layer routes WebSocket / CPU-heavy ops to Durable Objects |
| **3. HeavyDo CPU Offload** | DO gets 30s CPU budget — reuses same Axum router for heavy ops |
| **4. NotifyDo WebSocket Push** | Tags-based fan-out for live sync |
| **5. D1 Database** | SQLite-compatible, serverless, auto-scaling with unified `Db` enum |
| **6. Rate Limiting + Assets** | Cloudflare-native rate limits, static asset serving, env config |
| **7. One-Click CI/CD** | Push to main → builds → deploys. 3 workflows for prod, dev, backups |

## Site

This repo is also a documentation site live at **[doris.bhalala.org](https://doris.bhalala.org)** — built as a Cloudflare Pages static site explaining the architecture.

## Reference Implementation

- [warden-worker](https://github.com/abhalala/warden-worker) — Bitwarden-compatible server (the reference implementation of D.O.R.I.S.)

## License

MIT
