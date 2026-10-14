// Copies the static site into dist/ unchanged — no bundling, no rewriting.
// Used by `npm run build` (Bolt / Netlify deploys publish dist/).
import { cpSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');
const SKIP = new Set([
  'dist', 'node_modules', 'scripts', '.git', '.bolt', '.gitignore',
  'package.json', 'package-lock.json', 'vite.config.js', 'README.md',
]);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const entry of readdirSync(ROOT)) {
  if (SKIP.has(entry) || entry.startsWith('.')) continue;
  cpSync(join(ROOT, entry), join(OUT, entry), { recursive: true });
}
console.log('Built static site to dist/');
