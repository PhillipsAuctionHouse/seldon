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

    it('should create an image element if none is provided in props', async () => {
      const imgMock = {
        onload: () => void 0,
        onerror: () => void 0,
        src: '',
        complete: false,
      };
      const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(imgMock as unknown as HTMLImageElement);

      // imitates async load
      setTimeout(() => imgMock.onload && imgMock.onload(), 0);

      await isImageValid({ img: null, src: 'https://example.com/test-image.jpg' });

      expect(createElementSpy).toHaveBeenCalledWith('img');
      createElementSpy.mockRestore();
    });

    it('should set srcSet and sizes when provided', async () => {
      const src = 'https://example.com/test-image.jpg';
      const srcSet = 'https://example.com/test-image-1x.jpg 1x, https://example.com/test-image-2x.jpg 2x';
      const sizes = '(max-width: 600px) 480px, 800px';

      const imgMock = {
        onload: () => void 0,
        onerror: () => void 0,
        src: '',
        srcset: '',
        sizes: '',
        complete: false,
      };

      const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(imgMock as unknown as HTMLImageElement);

      // imitates async load
      setTimeout(() => imgMock.onload && imgMock.onload(), 0);

      await isImageValid({ img: null, src, srcSet, sizes });

      expect(imgMock.srcset).toBe(srcSet);
      expect(imgMock.sizes).toBe(sizes);

      createElementSpy.mockRestore();
    });

    it('should not set srcSet and sizes if not provided', async () => {
      const src = 'https://example.com/test-image.jpg';

      const imgMock = {
        onload: () => void 0,
        onerror: () => void 0,
        src: '',
        srcset: '',
        sizes: '',
        complete: false,
      };

      const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(imgMock as unknown as HTMLImageElement);

      // imitates async load
      setTimeout(() => imgMock.onload && imgMock.onload(), 0);

      await isImageValid({ img: null, src });

      expect(imgMock.srcset).toBe('');
      expect(imgMock.sizes).toBe('');

      createElementSpy.mockRestore();
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

    it('should resolve true immediately if imgElement.complete is true', async () => {
      const img = new Image();
      Object.defineProperty(img, 'complete', { value: true });
      const isValid = await isImageValid({ img, src: 'any-src' });
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
