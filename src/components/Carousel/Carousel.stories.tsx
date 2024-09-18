import { Meta } from '@storybook/react';
import Carousel, { CarouselProps } from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots from './CarouselDots';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
export const Playground = (props: CarouselProps) => (
  <Carousel {...props}>
    <CarouselContent>
      {Array.from({ length: 9 }).map((_, index) => (
        <CarouselItem key={index}>
          <div
            style={{
              display: 'flex',
              aspectRatio: '4 / 1',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              backgroundColor: '#66BF3B',
              borderRadius: '0.5rem',
            }}
          >
            <span style={{ fontSize: '2.25rem', fontWeight: '600', color: 'white' }}>{index + 1}</span>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselDots maxDots={7} />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {} satisfies CarouselProps;

Playground.argTypes = {};
