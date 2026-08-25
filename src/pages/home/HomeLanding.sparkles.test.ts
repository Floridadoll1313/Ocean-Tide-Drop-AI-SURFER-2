import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const landingSource = readFileSync(resolve(here, 'HomeLanding.tsx'), 'utf8');
const sparkleSource = readFileSync(resolve(here, '../../components/SparklesOverlay.tsx'), 'utf8');
const headerSource = readFileSync(resolve(here, '../../components/SiteLogoHeader.tsx'), 'utf8');
const routerSource = readFileSync(resolve(here, '../../RouterApp.tsx'), 'utf8');

function readLayerZIndex(source: string, layerName: string) {
  const match = source.match(new RegExp(`${layerName}:\\s*\\{[^}]*zIndex:\\s*(\\d+)`, 's'));
  if (!match) throw new Error(`Missing ${layerName} z-index`);
  return Number(match[1]);
}

describe('sparkle landing page', () => {
  it('keeps the click-through sparkle layer above the logo header and page content', () => {
    const sparkleZIndex = readLayerZIndex(landingSource, 'sparkleLayer');
    const contentZIndex = readLayerZIndex(landingSource, 'contentLayer');
    const headerZIndex = readLayerZIndex(headerSource, 'header');

    expect(sparkleZIndex).toBeGreaterThan(contentZIndex);
    expect(sparkleZIndex).toBeGreaterThan(headerZIndex);
    expect(landingSource).toContain('pointerEvents: "none"');
  });

  it('uses silver starlight for the dense sparkle field at the top', () => {
    expect(sparkleSource).toContain('const topColors = [');
    expect(sparkleSource).toContain('const palette = isTopDense ? topColors : lowerColors;');
  });

  it('restores the 20% launch banner above the logo header', () => {
    const offerIndex = routerSource.indexOf('LAUNCH WEEK SPECIAL: Get 20% OFF');
    const logoIndex = routerSource.indexOf('<SiteLogoHeader />');

    expect(offerIndex).toBeGreaterThanOrEqual(0);
    expect(routerSource).toContain('OCEANTIDE20');
    expect(offerIndex).toBeLessThan(logoIndex);
  });
});
