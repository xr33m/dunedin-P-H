// Copies the static site into dist/ and minifies style.css + script.js.
// Used by `npm run build` (Vercel serves dist/).
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { transformSync, build } from 'esbuild';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');
const SKIP = new Set([
  'dist', 'node_modules', 'scripts', '.git', '.bolt', '.gitignore',
  'package.json', 'package-lock.json', 'vite.config.js', 'README.md', 'api', 'vercel.json',
]);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const entry of readdirSync(ROOT)) {
  if (SKIP.has(entry) || (entry.startsWith('.') && entry !== '.well-known')) continue;
  cpSync(join(ROOT, entry), join(OUT, entry), { recursive: true });
}

// Minify CSS
const cssFile = 'style.css';
const cssSrc = readFileSync(join(ROOT, cssFile), 'utf8');
const { code: cssCode } = transformSync(cssSrc, { loader: 'css', minify: true });
writeFileSync(join(OUT, cssFile), cssCode);
console.log(`Minified ${cssFile}: ${(cssSrc.length / 1024).toFixed(1)} KB → ${(cssCode.length / 1024).toFixed(1)} KB`);

// Bundle and minify JavaScript
const jsFile = 'script.js';
const jsSrcSize = statSync(join(ROOT, jsFile)).size;
await build({
  entryPoints: [join(ROOT, jsFile)],
  bundle: true,
  minify: true,
  target: 'es2019',
  outfile: join(OUT, jsFile),
  format: 'iife',
});
const jsOutSize = statSync(join(OUT, jsFile)).size;
console.log(`Bundled ${jsFile}: ${(jsSrcSize / 1024).toFixed(1)} KB → ${(jsOutSize / 1024).toFixed(1)} KB`);

console.log('Built static site to dist/');
