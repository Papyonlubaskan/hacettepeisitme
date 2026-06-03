import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const routeSeo = readFileSync('src/lib/routeSeo.ts', 'utf8');

test('routeSeo ana sayfa meta tanımı içerir', () => {
  assert.match(routeSeo, /'\/':\s*\{/);
  assert.match(routeSeo, /title:\s*'/);
});

test('routeSeo blog listesi meta tanımı içerir', () => {
  assert.match(routeSeo, /'\/blog':\s*\{/);
});
