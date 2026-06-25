/*
 * D.O.R.I.S. — Durable Offloaded Rust Isomorphic Stack
 *
 * src/entry.js — JS Wrapper
 *
 * Routes WebSocket connections to NotifyDo, CPU-heavy endpoints to HeavyDo,
 * and falls through all other requests to the Rust WASM Worker.
 */

import { HeavyDo } from './durable/heavy_do';
import { NotifyDo } from './durable/notify_do';

// Endpoints that should be offloaded to HeavyDo (CPU-intensive)
const HEAVY_ENDPOINTS = [
  '/api/accounts/register',
  '/api/accounts/profile',
  '/api/accounts/password',
  '/api/accounts/delete',
  '/identity/connect/token',
  '/api/two-factor/',
  '/api/import/',
];

function shouldOffloadToHeavyDo(request, url) {
  return HEAVY_ENDPOINTS.some(path => url.pathname.startsWith(path));
}

function getShardKey(request) {
  // Shard by authenticated user ID when available
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    // Extract user ID from JWT or use a hash
    return `user:${authHeader.length}`;
  }
  return `anon:${request.cf?.colo || 'unknown'}`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. WebSocket → NotifyDo
    if (request.headers.get('Upgrade') === 'websocket') {
      const stub = env.NOTIFY_DO.get(env.NOTIFY_DO.idFromName('global'));
      return stub.fetch(request);
    }

    // 2. CPU-heavy → HeavyDo
    if (env.HEAVY_DO && shouldOffloadToHeavyDo(request, url)) {
      const shardKey = getShardKey(request);
      const stub = env.HEAVY_DO.get(env.HEAVY_DO.idFromName(shardKey));
      return stub.fetch(request);
    }

    // 3. Everything else → Rust WASM Worker
    const worker = new RustWorker(ctx, env);
    return worker.fetch(request);
  },
};
