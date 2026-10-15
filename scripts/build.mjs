// Copies the static site into dist/ and minifies style.css + script.js.
// Used by `npm run build` (Bolt / Netlify deploys publish dist/).
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { transformSync } from 'esbuild';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');
const SKIP = new Set([
  'dist', 'node_modules', 'scripts', '.git', '.bolt', '.gitignore',
  'package.json', 'package-lock.json', 'vite.config.js', 'README.md',
]);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const entry of readdirSync(ROOT)) {
  if (SKIP.has(entry) || (entry.startsWith('.') && entry !== '.well-known')) continue;
  cpSync(join(ROOT, entry), join(OUT, entry), { recursive: true });
}

for (const [file, loader] of [['style.css', 'css'], ['script.js', 'js']]) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  const { code } = transformSync(src, { loader, minify: true, target: loader === 'js' ? 'es2019' : undefined });
  writeFileSync(join(OUT, file), code);
  console.log(`Minified ${file}: ${(src.length / 1024).toFixed(1)} KB → ${(code.length / 1024).toFixed(1)} KB`);
}
console.log('Built static site to dist/');
