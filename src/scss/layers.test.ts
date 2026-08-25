import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(dirname, '..');
const layersUrl = pathToFileURL(`${dirname}/`);

const LAYER_ORDER = '@layer vendor, seldon.foundation, seldon.components, seldon.patterns, seldon.site';

const compile = (relativePath: string): string =>
  sass.compile(path.join(srcRoot, relativePath), {
    loadPaths: [path.resolve(srcRoot, '../node_modules')],
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
    expect(css).toContain('.seldon-button:not(.seldon-link):not(.seldon-button--link)');
    expect(css).not.toMatch(/\.seldon-button--primary\.seldon-link\s*\{[^}]*font-variation-settings/);
  });

  it('lets Button own color on destructive-as-link', () => {
    const css = compile('components/Button/_button.scss');
    expect(css).toMatch(/\.seldon-button--destructive\.seldon-link\s*\{[^}]*color:/);
  });

  it('keeps Footer from stacking Social icon lists', () => {
    const css = compile('site-furniture/Footer/_footer.scss');
    expect(css).toMatch(/\.seldon-social\s+ul\s*\{[^}]*flex-direction:\s*row/);
  });

  it('lets IconButton own box and paint when composed with Button', () => {
    const css = compile('components/IconButton/_iconButton.scss');
    expect(css).toContain('.seldon-icon-button.seldon-button');
    expect(css).toContain('.seldon-icon-button--primary.seldon-button');
  });

  it('keeps select-specific input rules in Select, not Input', () => {
    const selectCss = compile('components/Select/_select.scss');
    const inputCss = compile('components/Input/_input.scss');
    expect(selectCss).toContain('.seldon-select-input.seldon-input');
    expect(inputCss).not.toContain('.seldon-select-input.seldon-input');
  });

  it('inlines flatpickr into vendor so DatePicker overrides in seldon.components can win', () => {
    const css = compile('components/DatePicker/_datePicker.scss');
    expect(css).toContain(LAYER_ORDER);
    expect(css).not.toMatch(/@import/);
    expect(css).toMatch(/@layer vendor\s*\{[\s\S]*\.flatpickr-calendar/);
    expect(css).toContain('@layer seldon.components');
    expect(css).toContain('.flatpickr-calendar .flatpickr-day');
  });

  it('lets Button --link own labelMedium type (not inherited button size)', () => {
    const css = compile('components/Button/_button.scss');
    expect(css).toMatch(/\.seldon-button--link\s*\{[^}]*font-size:/);
    expect(css).toMatch(/\.seldon-button--link\s*\{[^}]*font-variation-settings:\s*['"]wght['"] 400/);
  });

  it('keeps AddToCalendar glyph at 30px when composed with IconButton', () => {
    const css = compile('components/AddToCalendar/_addToCalendar.scss');
    expect(css).toMatch(/\.seldon-icon-button\.seldon-button\s*\{[^}]*padding:\s*0/);
    expect(css).toMatch(/\.seldon-icon-button\.seldon-button svg\s*\{[^}]*width:\s*30px/);
  });

  it('keeps ViewingDetails session labels at wght 600', () => {
    const css = compile('patterns/ViewingDetails/_viewingDetails.scss');
    expect(css).toMatch(/viewing-details__label\s*\{[^}]*font-variation-settings:\s*['"]wght['"] 600/);
  });

  it('keeps FavoritesCollectionTile title at wght 600', () => {
    const css = compile('patterns/FavoritesCollectionTile/_favoritesCollectionTile.scss');
    expect(css).toMatch(
      /favorites-collection-tile__title\.seldon-text\s*\{[^}]*font-variation-settings:\s*['"]wght['"] 600/,
    );
  });

  it('right-aligns FiltersInline sort at md+', () => {
    const css = compile('patterns/FiltersInline/_filtersInline.scss');
    expect(css).toMatch(/filters-inline__sort\s*\{[^}]*margin-left:\s*auto/);
  });
});
