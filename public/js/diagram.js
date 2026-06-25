/**
 * D.O.R.I.S. — Architecture Diagram
 * Renders an SVG flow diagram in the browser
 */

(function() {
  const container = document.getElementById('arch-diagram');
  if (!container) return;

  const isDark = true;

  const colors = {
    bg: '#16161f',
    border: '#2a2a3e',
    text: '#9090b0',
    textBright: '#e2e2f0',
    orange: '#f97316',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    green: '#10b981',
    yellow: '#f59e0b',
    pink: '#ec4899',
    indigo: '#6366f1',
  };

  const arrowDefs = `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.border}"/>
      </marker>
      <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1c1c28;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#16161f;stop-opacity:1"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  `;

  const box = (x, y, w, h, label, sub, color) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${colors.bg}" stroke="${color || colors.border}" stroke-width="1.5"/>
    <text x="${x + w/2}" y="${y + h/2 - 4}" text-anchor="middle" fill="${colors.textBright}" font-size="13" font-weight="600">${label}</text>
    ${sub ? `<text x="${x + w/2}" y="${y + h/2 + 14}" text-anchor="middle" fill="${colors.text}" font-size="10">${sub}</text>` : ''}
  `;

  const arrow = (x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const padding = 8;
    return `<line x1="${x1 + ux * padding}" y1="${y1 + uy * padding}" x2="${x2 - ux * padding}" y2="${y2 - uy * padding}" stroke="${colors.border}" stroke-width="1.5" marker-end="url(#arrow)"/>`;
  };

  const label = (x, y, text, color) =>
    `<text x="${x}" y="${y}" text-anchor="middle" fill="${color || colors.text}" font-size="11">${text}</text>`;

  const svgWidth = 840;
  const svgHeight = 520;

  let svg = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">`;
  svg += arrowDefs;

  // === Entry flow ===
  const entryX = 370, entryY = 20;
  svg += box(entryX, entryY, 100, 40, 'Request', 'HTTP/S', colors.cyan);

  // === entry.js ===
  const jsX = 320, jsY = 85;
  svg += box(jsX, jsY, 200, 50, 'entry.js', 'JS Wrapper — DO routing', colors.purple);
  svg += arrow(entryX + 50, entryY + 40, jsX + 100, jsY);

  // === HeavyDo (CPU offload) ===
  const heavyX = 80, heavyY = 170;
  svg += box(heavyX, heavyY, 180, 60, 'HeavyDo', 'CPU Offload (30s budget)', colors.orange);
  svg += arrow(jsX + 80, jsY + 50, heavyX + 90, heavyY);

  // === NotifyDo (WebSocket) ===
  const notifyX = 580, notifyY = 170;
  svg += box(notifyX, notifyY, 180, 60, 'NotifyDo', 'WebSocket Push Hub', colors.green);
  svg += arrow(jsX + 160, jsY + 50, notifyX + 90, notifyY);

  // === Rust WASM Worker ===
  const rustX = 280, rustY = 170;
  svg += box(rustX, rustY, 280, 60, 'Rust WASM Worker', 'Axum Router — all other routes', colors.indigo);
  svg += label(rustX + 140, rustY + 85, '(fallthrough from entry.js)', colors.text);

  // arrow from entry.js down to Rust Worker
  svg += arrow(jsX + 100, jsY + 50, rustX + 140, rustY);

  // === HeavyDo reuses same router ===
  svg += label(heavyX + 90, heavyY + 90, '↻ reuses same Axum router', colors.orange);

  // === D1 Database ===
  const d1X = 280, d1Y = 310;
  svg += box(d1X, d1Y, 180, 55, 'D1 Database', 'SQLite · Serverless', colors.yellow);
  svg += arrow(rustX + 140, rustY + 60, d1X + 90, d1Y);

  // === R2 / KV ===
  const r2X = 510, r2Y = 310;
  svg += box(r2X, r2Y, 180, 55, 'R2 / KV', 'File Storage', colors.pink);
  svg += arrow(rustX + 250, rustY + 60, r2X + 90, r2Y);

  // === Rate Limiter ===
  const rateX = 80, rateY = 310;
  svg += box(rateX, rateY, 150, 55, 'Rate Limiting', 'Cloudflare Native', colors.cyan);

  // === Static Assets ===
  const assetsX = 280, assetsY = 410;
  svg += box(assetsX, assetsY, 280, 50, 'Static Assets', 'Cloudflare Edge Cache', colors.green);

  // === Response flow ===
  const respX = 650, respY = 470;
  svg += box(respX, respY, 100, 35, 'Response', 'To Client', colors.green);

  // Response lines from key nodes
  svg += arrow(heavyX + 180, heavyY + 60, respX, respY);
  svg += arrow(rustX + 280, rustY + 60, respX, respY);
  svg += arrow(d1X + 180, d1Y + 55, respX, respY);
  svg += arrow(r2X + 180, r2Y + 55, respX, respY);
  svg += arrow(assetsX + 280, assetsY + 50, respX, respY);

  // === CI/CD box at bottom ===
  const cicdX = 320, cicdY = 475;
  svg += `<rect x="${cicdX}" y="${cicdY}" width="200" height="32" rx="6" fill="none" stroke="${colors.text}" stroke-width="1" stroke-dasharray="4,3"/>`;
  svg += `<text x="${cicdX + 100}" y="${cicdY + 21}" text-anchor="middle" fill="${colors.text}" font-size="11">GitHub → Action → Cloudflare 🚀</text>`;

  // === Legend ===
  svg += `<text x="20" y="${svgHeight - 12}" fill="${colors.textMuted || colors.text}" font-size="10">D.O.R.I.S. — Durable Offloaded Rust Isomorphic Stack</text>`;

  svg += '</svg>';
  container.innerHTML = svg;
})();
