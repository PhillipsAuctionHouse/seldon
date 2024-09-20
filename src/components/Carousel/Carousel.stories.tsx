import { Meta } from '@storybook/react';
import Carousel, { CarouselProps } from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots, { CarouselDotsProps } from './CarouselDots';
import { useState } from 'react';

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
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {} satisfies CarouselProps;

Playground.argTypes = {};

export const CarouselWithDots = (props: CarouselProps & CarouselDotsProps) => (
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
    <CarouselDots maxDots={props.maxDots} position={props.position} />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDots.args = { maxDots: 7 } satisfies CarouselProps & CarouselDotsProps;

CarouselWithDots.argTypes = {};

export const ControlledCarousel = (props: CarouselProps & CarouselDotsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Carousel {...props} startIndex={selectedIndex} onSlideChange={setSelectedIndex}>
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
      <CarouselDots maxDots={props.maxDots} position={props.position} />
    </Carousel>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDots.args = {} satisfies CarouselProps & CarouselDotsProps;

CarouselWithDots.argTypes = {};
