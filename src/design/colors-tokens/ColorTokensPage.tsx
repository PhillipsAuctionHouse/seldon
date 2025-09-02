import ColorCard from './ColorCard';

const coreColorSections = [
  {
    sectionTitle: 'Primary',
    sectionDescription: (
      <span className="p">
        Our primary palette is the core of our brand identity. Phillips leads with black and white. The primary palette
        accommodates the practical and functional needs of the brand and the secondary allows for the expressive uses.
      </span>
    ),
    colorBlocks: [
      {
        blockTitle: 'White',
        blockDescription: (
          <span className="p">
            White is used widely to create clarity and simplicity. It provides space for content to stand out and
            supports a clean, minimal experience.
          </span>
        ),
        colors: [
          { label: '$white-100', hex: '#ffffff' },
          { label: '$white-75', hex: 'rgba(255, 255, 255, 0.75)' },
          { label: '$white-50', hex: 'rgba(255, 255, 255, 0.50)' },
          { label: '$white-25', hex: 'rgba(255, 255, 255, 0.25)' },
        ],
      },
      {
        blockTitle: 'Black',
        blockDescription: (
          <span className="p">
            Black is used sparingly to emphasise key actions and important content. Its limited use ensures precision
            and impact when used for text or interactions.
          </span>
        ),
        colors: [
          { label: '$black-100', hex: '#000000' },
          { label: '$black-75', hex: 'rgba(0, 0, 0, 0.75)' },
          { label: '$black-50', hex: 'rgba(0, 0, 0, 0.50)' },
          { label: '$black-25', hex: 'rgba(0, 0, 0, 0.25)' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Secondary',
    sectionDescription: (
      <span className="p">
        Secondary highlight colours are used for accents in components like badges, alerts, and labels. They should be
        used sparingly, with primary colours taking the lead. We also use them for expressive purposes, though their
        roles may evolve as we refine their accessibility and usage.
      </span>
    ),
    colorBlocks: [
      {
        blockTitle: 'Highlight',
        blockDescription: (
          <span className="p">
            The secondary highlight palette adds expression. We use these colours sparingly for wayfinding or special
            brand moments.
          </span>
        ),
        colors: [
          { label: '$highlight-yellow', hex: '#fff90a' },
          { label: '$highlight-green', hex: '#46ea77' },
          { label: '$highlight-blue', hex: '#0065fc' },
          { label: '$highlight-red', hex: '#ff3d0a' },
          { label: '$highlight-purple', hex: '#802dfa' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Functional',
    sectionDescription: (
      <span className="p">
        Our functional palette combines greys with success and warning colours to support clarity and communication
        across the UI. Greys provide the foundation for structure, while status colours highlight positive states,
        alerts, and urgency.
      </span>
    ),
    colorBlocks: [
      {
        blockTitle: 'Greys',
        blockDescription: (
          <span className="p">
            Greys form the functional foundation of our colour system. They provide the base for text, form fields,
            backgrounds, and dividers, ensuring consistency and balance across the UI.
          </span>
        ),
        colors: [
          { label: '$grey-100', hex: '#545454' },
          { label: '$grey-75', hex: '#75716f' },
          { label: '$grey-50', hex: '#eae9e6' },
          { label: '$grey-25', hex: '#f9f8f7' },
        ],
      },
      {
        blockTitle: 'Status',
        blockDescription: (
          <span className="p">
            Success and warning colours are used consistently across UI elements to indicate positive actions, status
            updates, or critical errors. <br /> <br />
            Focus Blue is reserved for keyboard navigation, appearing as the focus state when users move through the
            site with the Tab key.
          </span>
        ),
        colors: [
          { label: '$success-default', hex: '#00cc39' },
          { label: '$warning-default', hex: '#ea0404' },
          { label: '$focus-default', hex: '#0077CC' },
        ],
      },
    ],
  },
];

const semanticColorSections = [
  {
    sectionTitle: 'Semantics',
    sectionDescription: (
      <span className="p">
        Semantic colour tokens are labels used to apply color according to its intended function within the UI, guiding
        how the color should be used.
      </span>
    ),
    colorBlocks: [
      {
        blockTitle: 'Text',
        blockDescription: (
          <span className="p">
            We predominately use black text on white background for headings, titles and labels. Supporting body text
            and labels can use dark grey.
          </span>
        ),
        colors: [
          { label: '$text-default', hex: '#000000' },
          { label: '$text-supporting', hex: '#545454' },
          { label: '$text-inverted', hex: '#ffffff' },
        ],
      },
      {
        blockTitle: 'CTAs',
        blockDescription: (
          <span className="p">
            We use our different neutral colours to convey the states of actions and buttons to guide users on what’s
            happening.
          </span>
        ),
        colors: [
          { label: '$cta-default', hex: '#000000' },
          { label: '$cta-focus', hex: '#545454' },
          { label: '$cta-inactive', hex: '#75716f' },
          { label: '$cta-hover', hex: '#75716f' },
          { label: '$cta-disabled', hex: '#eae9e6' },
        ],
      },
      {
        blockTitle: 'Background',
        blockDescription: (
          <span className="p">
            Background colours are used throughout the product to highlight separation and provide between different
            objects and information. For example the bidding...
          </span>
        ),
        colors: [
          { label: '$bg-inverted', hex: '#000000' },
          { label: '$bg-overlay', hex: 'rgba(0, 0, 0, 50%)' },
          { label: '$bg-border', hex: '#eae9e6' },
          { label: '$bg-soft', hex: '#f9f8f7' },
          { label: '$bg-default', hex: '#ffffff' },
        ],
      },
      {
        blockTitle: 'Status',
        blockDescription: (
          <span className="p">
            Our warning & positive colours are used at a system level to give feedback around bidding notifications and
            status, where user is winning or has been outbid. We use it to help denote to people certain interactions
            they have with the product.
          </span>
        ),
        colors: [
          { label: '$success-default', hex: '#00cc39' },
          { label: '$warning-default', hex: '#ea0404' },
          { label: '$focus-default', hex: '#0077CC' },
          { label: '$status-info', hex: '#0065fc' },
        ],
      },
    ],
  },
];

function renderColorSections(sections: typeof coreColorSections | typeof semanticColorSections) {
  return sections.map(({ sectionTitle, sectionDescription, colorBlocks }) => (
    <section key={sectionTitle}>
      <h2>
        <span className="h2" style={{ color: 'black' }}>
          {sectionTitle}
        </span>
      </h2>
      {sectionDescription}
      {colorBlocks.map(({ blockTitle, blockDescription, colors }) => (
        <div key={blockTitle} className="color-block">
          <h3 className="h3">{blockTitle}</h3>
          {blockDescription}
          <div className="color__list">
            {colors.map(({ label, hex }) => (
              <ColorCard key={label} label={label} hex={hex} className="" />
            ))}
          </div>
        </div>
      ))}
    </section>
  ));
}

export default function ColorTokensPage() {
  return (
    <main className="sb-unstyled doc-wrapper">
      <h1 className="h1">Colour Core</h1>
      <span className="p">
        Colour tokens create a consistent and flexible system. The core palette provides the foundation - reflecting our
        brand identity and supporting hierarchy, states, and themes like dark mode. All usage should meet AA
        accessibility standards and be tested across design and development. <br /> <br /> Our colour system is built
        from <b>core tokens (the foundation)</b> and <b>semantic tokens (the application)</b>. Together they ensure
        clarity, accessibility, and consistency across all experiences.
      </span>
      <br />
      {renderColorSections(coreColorSections)}
      <h1 className="h1">Colour Semantics</h1>
      <span className="p">
        Semantic tokens define how colours are used across our product. They translate the core palette into functional
        roles - such as text, backgrounds, CTAs, or status states - ensuring clarity, accessibility, and consistency
        across all components. <br /> <br />
        Our colour system is built from <b>core tokens (the foundation)</b> and <b>semantic tokens (the application)</b>
        . Together they ensure clarity, accessibility, and consistency across all experiences.
      </span>
      <br />
      {renderColorSections(semanticColorSections)}
      <div className="tip-wrapper">
        <span className="tip">Tip</span>Click on the pallet tiles to copy the token
      </div>
    </main>
  );
}
