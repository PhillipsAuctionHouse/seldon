/**
 * Post-build smoke test for the published artifacts in dist/.
 *
 * `vite build` exits 0 even when dist/ cannot actually be loaded, so these checks load
 * the output the way consumers do. This exists because a bundled CJS dependency emitted
 * a runtime `__require('react')` that threw for every ESM consumer while the build
 * itself stayed green.
 *
 * Run with `npm run smoke` after `npm run build`.
 */
import { createRequire } from 'node:module';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const failures = [];

async function check(name, fn) {
  try {
    const detail = await fn();
    console.log(`  ✓ ${name}${detail ? ` — ${detail}` : ''}`);
  } catch (error) {
    const message = error.message.split('\n')[0];
    failures.push(name);
    console.log(`  ✗ ${name} — ${message}`);
  }
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

if (!existsSync(dist)) {
  console.error('dist/ not found — run "npm run build" first.');
  process.exit(1);
}

console.log(`Smoke testing ${dist}`);

// The ESM entry is what bundlers and Vite's SSR module runner load. Importing it here in
// pure ESM (no `require` in scope) is what catches unresolvable runtime requires.
await check('ESM entry (dist/index.js) evaluates', async () => {
  const mod = await import(path.join(dist, 'index.js'));
  const exports = Object.keys(mod);
  assert(exports.length > 0, 'no exports');
  return `${exports.length} exports`;
});

await check('CJS entry (dist/index.cjs) evaluates', () => {
  const mod = createRequire(import.meta.url)(path.join(dist, 'index.cjs'));
  const exports = Object.keys(mod);
  assert(exports.length > 0, 'no exports');
  return `${exports.length} exports`;
});

// A runtime require in the ESM output cannot resolve in an ESM consumer. Rolldown emits
// one when it bundles a CJS dependency that requires an external module, so the fix is
// to externalize that dependency rather than to bundle it.
await check('no runtime __require() in ESM output', () => {
  const offenders = walk(dist)
    .filter((file) => file.endsWith('.js'))
    .filter((file) => readFileSync(file, 'utf8').includes('__require'))
    .map((file) => path.relative(dist, file));
  assert(offenders.length === 0, `found in ${offenders.length} file(s): ${offenders.slice(0, 5).join(', ')}`);
});

// Bundling a peer dependency gives consumers a second copy of React, which breaks hooks
// and every context-based component.
await check('peer dependencies are not bundled', () => {
  const bundled = ['react', 'react-dom'].filter((dep) => existsSync(path.join(dist, 'node_modules', dep)));
  assert(bundled.length === 0, `bundled: ${bundled.join(', ')}`);
});

if (failures.length > 0) {
  console.error(`\n${failures.length} smoke check(s) failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log('\nAll smoke checks passed.');
