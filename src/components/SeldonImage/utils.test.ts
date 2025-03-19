import { isImageValid } from './utils';
import { vi } from 'vitest';

describe('utils', () => {
  describe('isImageValid', () => {
    beforeEach(() => {
      global.Image = vi.fn().mockImplementation(() => {
        return {
          onload: null,
          onerror: null,
          src: null,
        };
      });
    });

    it('should return a promise that resolves to true if the image is valid', async () => {
      const validImageUrl = 'https://example.com/valid-image.jpg';

      // Mock the Image instance to trigger onload when src is set
      global.Image = vi.fn().mockImplementation(() => {
        const image = {
          onload: null,
          onerror: null,
          src: null,
        };

        // Use setTimeout to simulate async behavior
        Object.defineProperty(image, 'src', {
          set(value) {
            this._src = value;
            setTimeout(() => this.onload());
          },
          get() {
            return this._src;
          },
        });

        return image;
      });

      const isValid = await isImageValid({ img: new Image(), src: validImageUrl });
      expect(isValid).toBe(true);
    });

    it('should return a promise that resolves to false if the image is invalid', async () => {
      const invalidImageUrl = 'https://example.com/invalid-image.jpg';

      // Mock the Image instance to trigger onerror when src is set
      global.Image = vi.fn().mockImplementation(() => {
        const image = {
          onload: null,
          onerror: null,
          src: null,
        };

        // Use setTimeout to simulate async behavior
        Object.defineProperty(image, 'src', {
          set(value) {
            this._src = value;
            setTimeout(() => this.onerror());
          },
          get() {
            return this._src;
          },
        });

        return image;
      });

      const isValid = await isImageValid({ img: new Image(), src: invalidImageUrl });
      expect(isValid).toBe(false);
    });
  });
});
