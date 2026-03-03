import { afterEach, describe, expect, it } from 'vitest';

import { isImageValid } from './utils';

const originalImage = typeof globalThis.Image !== 'undefined' ? globalThis.Image : undefined;

describe('utils', () => {
  describe('isImageValid', () => {
    afterEach(() => {
      if (originalImage !== undefined) {
        (globalThis as typeof globalThis & { Image: typeof originalImage }).Image = originalImage;
      }
    });

    function createImageMock(onSrcSet: () => void): HTMLImageElement {
      const image = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        _src: null as string | null,
      };
      Object.defineProperty(image, 'src', {
        set(value: string) {
          image._src = value;
          setTimeout(() => onSrcSet());
        },
        get() {
          return image._src;
        },
        configurable: true,
      });
      return image as unknown as HTMLImageElement;
    }

    it('should return a promise that resolves to true if the image is valid', async () => {
      const validImageUrl = 'https://example.com/valid-image.jpg';
      const img = createImageMock(() => (img.onload as (() => void) | null)?.());

      const isValid = await isImageValid({ img, src: validImageUrl });
      expect(isValid).toBe(true);
    });

    it('should return a promise that resolves to false if the image is invalid', async () => {
      const invalidImageUrl = 'https://example.com/invalid-image.jpg';
      const img = createImageMock(() => (img.onerror as (() => void) | null)?.());

      const isValid = await isImageValid({ img, src: invalidImageUrl });
      expect(isValid).toBe(false);
    });

    it('creates img element when img is null', async () => {
      const validImageUrl = 'https://example.com/valid.jpg';
      const originalCreateElement = document.createElement.bind(document);
      const createElementSpy = vitest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        const el = originalCreateElement(tagName);
        if (tagName === 'img') {
          Object.defineProperty(el, 'complete', { value: true, configurable: true });
        }
        return el;
      });
      const isValid = await isImageValid({ img: null, src: validImageUrl });
      expect(isValid).toBe(true);
      createElementSpy.mockRestore();
    });

    it('sets srcSet and sizes on the image element when provided', async () => {
      const img = document.createElement('img');
      const setSrcSet = vitest.fn();
      const setSizes = vitest.fn();
      Object.defineProperty(img, 'srcset', { set: setSrcSet, configurable: true });
      Object.defineProperty(img, 'sizes', { set: setSizes, configurable: true });
      Object.defineProperty(img, 'src', {
        set() {
          setTimeout(() => (img.onload as (() => void) | null)?.());
        },
        configurable: true,
      });

      const promise = isImageValid({
        img,
        src: 'https://example.com/a.jpg',
        srcSet: 'a.jpg 1x, b.jpg 2x',
        sizes: '100px',
      });
      await promise;

      expect(setSrcSet).toHaveBeenCalledWith('a.jpg 1x, b.jpg 2x');
      expect(setSizes).toHaveBeenCalledWith('100px');
    });

    it('resolves true immediately when image is already complete (cached)', async () => {
      const img = document.createElement('img');
      Object.defineProperty(img, 'complete', { value: true, configurable: true });
      Object.defineProperty(img, 'src', {
        get: () => '',
        set: () => {
          /* empty */
        },
        configurable: true,
      });

      const isValid = await isImageValid({ img, src: 'https://example.com/cached.jpg' });
      expect(isValid).toBe(true);
    });
  });
});
