import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const landingSource = readFileSync(resolve(here, 'HomeLanding.tsx'), 'utf8');
const sparkleSource = readFileSync(resolve(here, '../../components/SparklesOverlay.tsx'), 'utf8');

describe('sparkle landing page', () => {
  it('keeps the click-through sparkle layer above the logo header and page content', () => {
    expect(landingSource).toContain(
      'sparkleLayer: { position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none" }',
    );
  });

  it('uses silver starlight for the dense sparkle field at the top', () => {
    expect(sparkleSource).toContain('const topColors = [');
    expect(sparkleSource).toContain('const palette = isTopDense ? topColors : lowerColors;');
  });
});
