import { Meta } from '@storybook/react';
import Carousel, { CarouselProps } from './Carousel';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselDots, { CarouselDotsProps } from './CarouselDots';
import { useState } from 'react';
import CarouselArrows from './CarouselArrows';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
export const Playground = (props: CarouselProps) => (
  <Carousel {...props} useWheelGestures>
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

export const CarouselWithArrows = (props: CarouselProps) => (
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
    <CarouselArrows />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithArrows.args = { disableNavigationDrag: 'desktop' } satisfies CarouselProps;

CarouselWithArrows.argTypes = {};

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
    <CarouselDots maxDots={props.maxDots} position={props.position} numberOfSlides={9} id={props.id} />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDots.args = { maxDots: 9, id: 'carousel-dots' } satisfies CarouselProps & CarouselDotsProps;

CarouselWithDots.argTypes = {};

export const CarouselWithDotsAndArrows = (props: CarouselProps & CarouselDotsProps) => (
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
    <CarouselDots maxDots={props.maxDots} position={props.position} numberOfSlides={9} id={props.id} />
    <CarouselArrows />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDotsAndArrows.args = { maxDots: 9, id: 'carousel-dots-arrows' } satisfies CarouselProps & CarouselDotsProps;

CarouselWithDotsAndArrows.argTypes = {};

export const CarouselWithDotsOverflow = (props: CarouselProps & CarouselDotsProps) => (
  <Carousel {...props}>
    <CarouselContent>
      {Array.from({ length: 20 }).map((_, index) => (
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
    <CarouselDots maxDots={props.maxDots} position={props.position} numberOfSlides={20} id={props.id} />
  </Carousel>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDotsOverflow.args = { maxDots: 9, id: 'carousel-dots-overflow' } satisfies CarouselProps &
  CarouselDotsProps;

CarouselWithDotsOverflow.argTypes = {};

export const ControlledCarousel = (props: CarouselProps & CarouselDotsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(selectedIndex);
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
      <CarouselDots maxDots={props.maxDots} position={props.position} numberOfSlides={9} id={props.id} />
    </Carousel>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CarouselWithDots.args = { id: 'carousel-dots' } satisfies CarouselProps & CarouselDotsProps;

CarouselWithDots.argTypes = {};

export const CarouselWithMultipleItems = (props: CarouselProps) => {
  const [array, setArray] = useState(
    Array.from({ length: 12 })
      .fill(0)
      .map((_, i) => i),
  );

  return (
    <div>
      <Carousel {...{ ...props }}>
        <CarouselContent>
          {array.map((el) => (
            <CarouselItem
              onClick={() => alert(el)}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  alert(el);
                }
              }}
              style={{
                maxWidth: `18%`,
                minWidth: 0,
                flex: '0 0 100%',
                border: array[0] === el ? '1px solid blue' : '1px solid #eee',
                display: 'flex',
                gap: '16px',
                paddingRight: '8px',
                marginRight: '16px',
              }}
              key={el}
              tabIndex={0}
            >
              <img style={{ width: '60px', height: '60px' }} src={`https://picsum.photos/60/60?random=${el}`} alt="" />
              <div>
                <h2>Item {el + 1}</h2>
                <p>lorem ipsum dolor sit amet</p>
                <em>Additional information about Item {el} and its features</em>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselArrows />
      </Carousel>

      <div style={{ marginTop: '16px' }}>
        <button onClick={() => setArray((prev) => prev.slice(1))}>Remove first item</button>
      </div>
    </div>
  );
};

CarouselWithMultipleItems.args = { disableNavigationDrag: 'desktop' } satisfies CarouselProps;
CarouselWithMultipleItems.argTypes = {
  slidesToScroll: {
    control: {
      type: 'number',
    },
    defaultValue: 4,
  },
};
