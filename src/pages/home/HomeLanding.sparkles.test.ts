import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(resolve(here, 'HomeLanding.tsx'), 'utf8');

describe('sparkle landing page layering', () => {
  it('keeps the click-through sparkle layer above the logo header and page content', () => {
    expect(source).toContain(
      'sparkleLayer: { position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none" }',
    );
  });
});
