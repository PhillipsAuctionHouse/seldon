import ColorCard from './ColorCard';

const colorSections = [
  {
    section: 'Primary',
    description: (
      <>
        <h3 className="h3">Black & white</h3>
        <span className="p">
          Our primary palette is the core of our brand identity. Phillips leads with black and white. The primary
          palette accommodates the practical and functional needs of the brand and the secondary allows for the
          expressive uses.
        </span>
        <span className="p">
          White is used widely for clarity and simplicity. Black is used sparingly to emphasise key actions or content.
          The proportion let’s us be more precise with how we use black to accent actions and text.
        </span>
      </>
    ),
    colors: [
      { label: '$black', hex: '#000000' },
      { label: '$black75', hex: 'rgba(0, 0, 0, 0.75)' },
      { label: '$black50', hex: 'rgba(0, 0, 0, 0.50)' },
      { label: '$black25', hex: 'rgba(0, 0, 0, 0.25)' },
      { label: '$white', hex: '#ffffff' },
      { label: '$white75', hex: 'rgba(255, 255, 255, 0.75)' },
      { label: '$white50', hex: 'rgba(255, 255, 255, 0.50)' },
      { label: '$white25', hex: 'rgba(255, 255, 255, 0.25)' },
    ],
  },
  {
    section: 'Secondary',
    description: (
      <>
        <h3 className="h3">Secondary</h3>
        <span className="p">
          Secondary colours are used for accents in components like badges, alerts, and labels. They should be used
          sparingly, with primary colours taking the lead. We also use them for expressive purposes, though their roles
          may evolve as we refine their accessibility and usage.
        </span>
        <span className="p">
          The secondary palette adds expression. We use the secondary colours sparingly for wayfinding or special brand
          moments
        </span>
      </>
    ),
    colors: [
      { label: '$secondary-yellow', hex: '#fff90a' },
      { label: '$secondary-green', hex: '#46ea77' },
      { label: '$secondary-blue', hex: '#0065fc' },
      { label: '$secondary-red', hex: '#ff3d0a' },
      { label: '$secondary-purple', hex: '#802dfa' },
    ],
  },
  {
    section: 'Neutral',
    description: (
      <>
        <h3 className="h3">Greys</h3>
        <span className="p">
          Our neutral palette supports the primary colours by offering softer alternatives for UI elements like
          backgrounds, outlines, dividers, and key-lines - especially in cases where pure black may feel too harsh or
          dominant.
        </span>
        <span className="p">
          Grey is a neutral colour and is the foundation of the colour system. Many elements in UI design use different
          shades of grey - text, form fields, backgrounds, dividers - are usually grey.
        </span>
      </>
    ),
    colors: [
      { label: '$grey-darkest', hex: '#545454' },
      { label: '$grey-dark', hex: '#75716f' },
      { label: '$grey-light', hex: '#eae9e6' },
      { label: '$grey-lightest', hex: '#f9f8f7' },
    ],
  },
  {
    section: 'Functional',
    description: (
      <>
        <h3 className="h3">Success, warning & status</h3>
        <span className="p">
          Our functional palette should be applied consistently across UI elements to convey important messages to our
          clients. In this context, colour is used to emphasize urgency
        </span>
        <span className="p">
          Success and warning colours are used consistently across UI elements to indicate positive actions, status
          updates, or critical errors.
        </span>
      </>
    ),
    colors: [
      { label: '$positive-green', hex: '#00cc39' },
      { label: '$negative-red', hex: '#ea0404' },
    ],
  },
  {
    section: 'Semantic',
    description: (
      <>
        <span className="p">
          Semantic colour tokens are labels used to apply color according to its intended function within the UI,
          guiding how the color should be used.
        </span>
        <h3 className="h3">Text</h3>
        <span className="p">
          We predominately use black text on white background for headings, titles and labels. Supporting body text and
          labels can use dark grey.
        </span>
      </>
    ),
    colors: [
      { label: '$text-default', hex: '#000000' },
      { label: '$text-inverted', hex: '#ffffff' },
      { label: '$text-supporting', hex: '#545454' },
    ],
  },
  {
    description: (
      <>
        <h3 className="h3">CTAs</h3>
        <span className="p">
          Semantic colour tokens are labels used to apply color according to its intended function within the UI, We use
          our different neutral colours to convey the states of actions and buttons to guide users on what’s happening.
        </span>
      </>
    ),
    colors: [
      { label: '$CTA-default', hex: '#000' },
      { label: '$CTA-disabled', hex: '#eae9e6' },
      { label: '$CTA-hover', hex: '#75716f' },
      { label: '$CTA-focus', hex: '#75716f' },
    ],
  },
  {
    description: (
      <>
        <h3 className="h3">Background</h3>
        <span className="p">
          Background colours are used throughout the product to highlight separation and provide between different
          objects and information. For example the bidding...
        </span>
      </>
    ),
    colors: [
      { label: '$BG-default', hex: '#fff' },
      { label: '$BG-soft', hex: '#f9f8f7' },
      { label: '$keylines', hex: '#eae9e6' },
      { label: '$BG-inverted', hex: '#000' },
      { label: '$BG-overlay', hex: 'rgba(0, 0, 0, 50%)' },
    ],
  },
  {
    description: (
      <>
        <h3 className="h3">Success, warning & status</h3>
        <span className="p">
          Our warning & positive colours are used at a system level to give feedback around bidding notifications and
          status, where user is winning or has been outbid. We use it to help denote to people certain interactions they
          have with the product.
        </span>
      </>
    ),
    colors: [
      { label: '$win-notification', hex: '#00cc39' },
      { label: '$outbid-notification', hex: '#ea0404' },
      { label: '$event-status', hex: '#0065fc' },
    ],
  },
];

export default function ColorTokensPage() {
  return (
    <main className="sb-unstyled doc-wrapper">
      <h1 className="h1">Colors</h1>
      {colorSections.map(({ section, description, colors }) => (
        <section key={section}>
          <h2>
            <span className="h2" style={{ color: 'black' }}>
              {section}
            </span>
          </h2>
          {description}
          <div className="color__list">
            {colors.map(({ label, hex }) => (
              <ColorCard key={label} label={label} hex={hex} className="" />
            ))}
          </div>
        </section>
      ))}
      <div className="tip-wrapper">
        <span className="tip">Tip</span>Click on the pallet tiles to copy the token
      </div>
    </main>
  );
}
