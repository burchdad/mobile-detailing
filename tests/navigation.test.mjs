import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('shared chrome appears exactly once in the root layout and not the home page', () => {
  const layout = read('app/layout.tsx'); const home = read('app/page.tsx');
  for (const component of ['Navbar', 'Footer', 'MobileCtaBar']) assert.equal(layout.split(`<${component} />`).length - 1, 1);
  assert.doesNotMatch(home, /<Navbar|<Footer/);
});
test('service links and membership fragments resolve to the intended routes and IDs', () => {
  for (const path of ['app/mobile-detailing/page.tsx', 'app/mobile-detailing/[city]/page.tsx']) {
    assert.doesNotMatch(read(path), /href="\/#services"/); assert.match(read(path), /href="\/services"/);
  }
  for (const id of ['silver', 'gold', 'black-label']) assert.match(read('app/membership/page.tsx'), new RegExp(`id: "${id}"`));
  assert.match(read('components/BrandPlatform.tsx'), /id=\{block.id\}/);
});
test('mobile CTA cannot dial placeholder numbers', () => {
  const source = read('components/MobileCtaBar.tsx');
  assert.doesNotMatch(source, /19035550000/); assert.match(source, /href="\/contact"/); assert.match(source, /safe-area-inset-bottom/);
});
