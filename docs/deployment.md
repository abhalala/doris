# Deployment Guide

## Prerequisites

1. **Cloudflare account** with Workers subscription
2. **GitHub account**
3. **Rust toolchain** with `wasm32-unknown-unknown` target
4. `worker-build` CLI: `cargo install worker-build --locked`

## Local Development

```bash
# Install dependencies
cargo install worker-build --locked --version 0.8.3

# Run locally (requires wrangler)
npx wrangler dev

# Build for production
npx wrangler deploy
```

## One-Click CI/CD Setup

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers & Pages permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `D1_DATABASE_ID` | Your D1 database ID (if using D1) |

### Step-by-Step

1. **Create a D1 database** (if needed):
   ```bash
   npx wrangler d1 create my-db
   ```

2. **Create a Cloudflare API Token**:
   - Go to [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create token with `Workers R2` and `Pages` permissions
   - Copy the token

3. **Set GitHub Secrets**:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN -R <your-org>/<your-repo>
   gh secret set CLOUDFLARE_ACCOUNT_ID -R <your-org>/<your-repo>
   gh secret set D1_DATABASE_ID -R <your-org>/<your-repo>
   ```

4. **Set Worker Secrets** (via Cloudflare Dashboard):
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `ALLOWED_EMAILS`

5. **Push to main branch** → auto-deploys 🚀

## DNS Setup (Custom Domain)

1. Add your domain to Cloudflare (if not already)
2. In Cloudflare Dashboard → Workers → your worker → Triggers → Custom Domain
3. Add `doris.bhalala.org` (or your domain)
4. Ensure DNS is proxied through Cloudflare (orange cloud)

## Branch Deployments

- `main` → Production
- `dev` → Preview deployment (via `deploy-dev.yaml` workflow)

## Backup

The `backup-d1.yaml` workflow runs daily at UTC 04:00 to backup your D1 database to S3/WebDAV.
