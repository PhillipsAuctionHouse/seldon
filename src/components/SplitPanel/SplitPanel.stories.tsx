import type { Meta } from '@storybook/react';

import SplitPanel, { SplitPanelProps } from './SplitPanel';

const meta = {
  title: 'Components/SplitPanel',
  component: SplitPanel,
} satisfies Meta<typeof SplitPanel>;

export default meta;

export const Playground = (props: SplitPanelProps) => (
  <div className="split-panel-story">
    <SplitPanel {...props}>
      <div id="child-1">
        <p className="split-panel-story__text">
          Ownership of the company passed through Harry’s son and successors through the 1800s and early 1900s. By the
          1970s, Phillips had expanded its categories to sell fine art, furniture and estate collections.
        </p>
        <p className="split-panel-story__text">
          Bernard Arnault of LVMH Moët Hennessy Louis Vuitton purchased the company in 1999 and shortly thereafter
          merged with esteemed private art dealers Simon de Pury and Daniela Luxembourg. The new team introduced sales
          of watches, jewels and design alongside Impressionist, American, Modern and Contemporary works of art. In
          2002, Simon de Pury acquired a majority stake in the company.
        </p>
        <p className="split-panel-story__text">
          In 2008, a majority stake of the company was acquired by the owners of the luxury retail group, Mercury. By
          the end of 2012, the acquisition was completed, and the business moved uptown from Chelsea in New York.
          October 2014 heralded the opening of a new London headquarters at 30 Berkeley Square in Mayfair.
        </p>
      </div>

      <div id="child-2">
        <p className="split-panel-story__text">
          In July 2014, Chief Executive Officer Edward Dolman joined Phillips after a 27-year career at Christie’s.
          Bringing a wealth of experience, Mr. Dolman attracted highly qualified senior leaders from across the
          industry. Shortly after the start of Mr. Dolman’s tenure, the firm launched Phillips in Association with Bacs
          & Russo in November 2014, which has become the global market leader for the finest collectors’ watches at
          auction, under the leadership of Aurel Bacs and Livia Russo. Phillips expanded to Asia and held its first
          auctions in Hong Kong in 2015, and it currently presents all categories including art, design, jewels and
          watches, in the fast-growing Asian market.
        </p>
        <p className="split-panel-story__text">
          In 2021, Phillips moved its New York headquarters to new state-of-the-art galleries at 432 Park Avenue and, in
          2023, the company opened the first purpose-built auction space in Hong Kong with the opening of its new Asia
          headquarters in West Kowloon. The same year, the company also launched Dropshop, the innovative digital
          platform offering limited-edition releases of primary market art and objects in partnership with the artists,
          collaborators, and brands defining contemporary culture.
        </p>
      </div>
    </SplitPanel>
  </div>
);

Playground.args = {
  id: 'mySplitPanelComponent',
};
