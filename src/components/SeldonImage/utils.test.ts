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
  });
});
