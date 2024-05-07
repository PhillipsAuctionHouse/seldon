import { getLinkVariantClassName, isLinkExternal } from './utils';
import { LinkVariants } from './Link';

describe('getLinkVariantClassName', () => {
  it('should return the correct variant class name', () => {
    const className = getLinkVariantClassName(LinkVariants.email);
    expect(className).toBe('phillips-link--email');
  });
});

describe('isLinkExternal', () => {
  it('should return true for external links', () => {
    const externalLink = 'https://example.com';
    const isExternal = isLinkExternal(externalLink);
    expect(isExternal).toBe(true);
  });

  it('should return false for internal links', () => {
    const internalLink = '/path/to/page';
    const isExternal = isLinkExternal(internalLink);
    expect(isExternal).toBe(false);
  });

  it('should return false for phillips websites', () => {
    const internalLink = 'https://dropshop.phillips.com';
    const isExternal = isLinkExternal(internalLink);
    expect(isExternal).toBe(false);
  });
});
