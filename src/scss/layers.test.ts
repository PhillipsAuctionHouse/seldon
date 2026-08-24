import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(dirname, '..');
const layersUrl = pathToFileURL(`${dirname}/`);

const LAYER_ORDER = '@layer seldon.foundation, seldon.components, seldon.patterns, seldon.site';

const compile = (relativePath: string): string =>
  sass.compile(path.join(srcRoot, relativePath), {
    importers: [
      {
        findFileUrl(url) {
          if (url.startsWith('~scss')) {
            const rest = url.replace(/^~scss\/?/, '');
            return new URL(rest, layersUrl);
          }
          return null;
        },
      },
    ],
  }).css;

describe('cascade layers', () => {
  it('declares the full layer order from _layers.scss', () => {
    expect(compile('scss/_layers.scss')).toContain(LAYER_ORDER);
  });

  it('emits the order statement from a component sheet so first-evaluated CSS still wins', () => {
    const css = compile('components/Button/_button.scss');
    expect(css).toContain(LAYER_ORDER);
    expect(css).toContain('@layer seldon.components');
  });

  it('puts foundation CSS in seldon.foundation', () => {
    const css = compile('scss/_foundation.scss');
    expect(css).toContain(LAYER_ORDER);
    expect(css).toContain('@layer seldon.foundation');
    expect(css).toContain('--desktop-max-width');
  });

  it('does not set button font tokens on a composed .seldon-link node', () => {
    const css = compile('components/Button/_button.scss');
    expect(css).toContain('.seldon-button:not(.seldon-link)');
    expect(css).not.toMatch(/\.seldon-button--primary\.seldon-link\s*\{[^}]*font-variation-settings/);
  });

  it('keeps select-specific input rules in Select, not Input', () => {
    const selectCss = compile('components/Select/_select.scss');
    const inputCss = compile('components/Input/_input.scss');
    expect(selectCss).toContain('.seldon-select-input.seldon-input');
    expect(inputCss).not.toContain('.seldon-select-input.seldon-input');
  });
});
