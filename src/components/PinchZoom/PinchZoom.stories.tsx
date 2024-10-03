import { Meta } from '@storybook/react';
import PinchZoom, { PinchZoomProps } from './PinchZoom';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '../Carousel';
import { SpacingTokens } from '../../utils';
import { useState } from 'react';
import Modal from '../Modal/Modal';

const meta = {
  title: 'Components/PinchZoom',
  component: PinchZoom,
} satisfies Meta<typeof PinchZoom>;

export default meta;
export const Playground = (props: PinchZoomProps) => {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: '#ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <PinchZoom {...props}>
        <img
          style={{ padding: '20px 0' }}
          src="https://whitneymedia.org/assets/artwork/10980/96_175_cropped.jpeg"
          alt="placeholder"
        />
      </PinchZoom>
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {};

Playground.argTypes = {};

export const ZoomCarousel = () => {
  return (
    <Carousel loop columnGap={SpacingTokens.md}>
      <CarouselContent style={{ alignItems: 'center' }}>
        <CarouselItem>
          <PinchZoom>
            <img
              style={{ borderRadius: '10px' }}
              src="https://whitneymedia.org/assets/artwork/6896/70_1164_cropped.jpeg"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
        <CarouselItem>
          <PinchZoom>
            <img
              style={{ borderRadius: '10px' }}
              src="https://whitneymedia.org/assets/artwork/732/50_8_cropped.jpeg"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
        <CarouselItem>
          <PinchZoom>
            <img
              style={{ borderRadius: '10px' }}
              src="https://whitneymedia.org/assets/image/828142/large_RS18772_MoMA_NY-Movie_ART162191_web.jpg"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
      </CarouselContent>
      <CarouselDots numberOfSlides={3} />
    </Carousel>
  );
};

const images = [
  'https://whitneymedia.org/assets/artwork/6896/70_1164_cropped.jpeg',
  'https://whitneymedia.org/assets/artwork/732/50_8_cropped.jpeg',
  'https://whitneymedia.org/assets/image/828142/large_RS18772_MoMA_NY-Movie_ART162191_web.jpg',
];

export const CarouselWithZoomModal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          appElementSelector="body"
          style={{
            content: {
              padding: 0,
              height: '90%',
              width: '90%',
            },
          }}
        >
          <Carousel
            loop
            columnGap={SpacingTokens.md}
            startIndex={currentSlide}
            onSlideChange={setCurrentSlide}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            disableDrag={isZoomed}
          >
            <CarouselContent containerStyles={{ display: 'flex', flex: 1 }} style={{ display: 'flex', flex: 1 }}>
              {images.map((image, index) => (
                <CarouselItem key={index} style={{ display: 'flex', height: '100%' }}>
                  <PinchZoom onZoomChange={setIsZoomed}>
                    <img
                      style={{ height: '100%', objectFit: 'contain', padding: '2rem 0' }}
                      src={image}
                      alt="placeholder"
                    />
                  </PinchZoom>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots numberOfSlides={3} position="on-content" />
          </Carousel>
        </Modal>
      )}
      <Carousel
        loop
        columnGap={SpacingTokens.md}
        startIndex={currentSlide}
        onSlideChange={setCurrentSlide}
        style={{ maxWidth: '50%' }}
      >
        <CarouselContent style={{ alignItems: 'center' }}>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentSlide(index);
                setModalOpen(true);
              }}
            >
              <img style={{ borderRadius: '10px' }} src={image} alt="placeholder" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots numberOfSlides={3} />
      </Carousel>
    </div>
  );
};
