import { Meta } from '@storybook/react-vite';
import PinchZoom, { PinchZoomProps } from './PinchZoom';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '../Carousel';
import { SpacingTokens } from '../../utils';
import { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';
import { SeldonImage } from '../SeldonImage';

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
        maxHeight: '50vh',
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
        <SeldonImage
          style={{ padding: '20px 0' }}
          src="https://dist.phillips.com/auction-assets/NY030626/228499_002.jpg?fit=cover&optimize=medium&width=1302"
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAtLeftEdge, setIsAtLeftEdge] = useState(false);
  const [isAtRightEdge, setIsAtRightEdge] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleZoomChange = useCallback(
    (zoom: boolean, index: number) => {
      if (index === currentSlide) {
        setIsZoomed(zoom);
      }
    },
    [currentSlide],
  );

  const handleAtLeftEdge = useCallback(
    (atEdge: boolean, index: number) => {
      if (index === currentSlide) {
        setIsAtLeftEdge(atEdge);
      }
    },
    [currentSlide],
  );

  const handleAtRightEdge = useCallback(
    (atEdge: boolean, index: number) => {
      if (index === currentSlide) {
        setIsAtRightEdge(atEdge);
      }
    },
    [currentSlide],
  );

  return (
    <Carousel
      loop
      columnGap={SpacingTokens.md}
      disableDrag={isZoomed && !isAtLeftEdge && !isAtRightEdge}
      onSlideChange={setCurrentSlide}
    >
      <CarouselContent style={{ alignItems: 'center', maxHeight: '90vh' }}>
        <CarouselItem>
          <PinchZoom
            isZoomReset={currentSlide !== 0}
            onZoomChange={(zoom) => handleZoomChange(zoom, 0)}
            onAtLeftEdge={(atLeftEdge) => handleAtLeftEdge(atLeftEdge, 0)}
            onAtRightEdge={(atRightEdge) => handleAtRightEdge(atRightEdge, 0)}
          >
            <SeldonImage
              style={{ borderRadius: '10px' }}
              src="https://dist.phillips.com/content/web/HomePage/slide-2550.jpg?crop=smart&fit=bounds&disable=upscale&width=2000&optimize=low"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
        <CarouselItem>
          <PinchZoom
            isZoomReset={currentSlide !== 1}
            onZoomChange={(zoom) => handleZoomChange(zoom, 1)}
            onAtLeftEdge={(atLeftEdge) => handleAtLeftEdge(atLeftEdge, 1)}
            onAtRightEdge={(atRightEdge) => handleAtRightEdge(atRightEdge, 1)}
          >
            <SeldonImage
              style={{ borderRadius: '10px' }}
              src="https://dist.phillips.com/auction-assets/NY030626/228499_002.jpg?fit=cover&optimize=medium&width=1302"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
        <CarouselItem>
          <PinchZoom
            isZoomReset={currentSlide !== 2}
            onZoomChange={(zoom) => handleZoomChange(zoom, 2)}
            onAtLeftEdge={(atLeftEdge) => handleAtLeftEdge(atLeftEdge, 2)}
            onAtRightEdge={(atRightEdge) => handleAtRightEdge(atRightEdge, 2)}
          >
            <SeldonImage
              style={{ borderRadius: '10px' }}
              src="https://dist.phillips.com/auction-assets/NY030626/228499_008.jpg?fit=cover&optimize=medium&width=1302"
              alt="placeholder"
            />
          </PinchZoom>
        </CarouselItem>
      </CarouselContent>
      <CarouselDots id="zoom-carousel-dots" numberOfSlides={3} />
    </Carousel>
  );
};

const images = [
  'https://images.pexels.com/photos/1762973/pexels-photo-1762973.jpeg',
  'https://whitneymedia.org/assets/artwork/732/50_8_cropped.jpeg',
  'https://whitneymedia.org/assets/image/828142/large_RS18772_MoMA_NY-Movie_ART162191_web.jpg',
];

export const CarouselWithZoomModal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = (zoom: boolean) => {
    setIsZoomed(zoom);
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          style={{
            padding: 0,
            height: '90%',
            width: '90%',
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
                  <PinchZoom onZoomChange={handleZoomChange}>
                    <SeldonImage
                      style={{ height: '100%', objectFit: 'contain', padding: '2rem 0' }}
                      imageStyle={{ height: '100%' }}
                      src={image}
                      alt="placeholder"
                    />
                  </PinchZoom>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots id="carousel-dots-on-content" numberOfSlides={images.length} position="on-content" />
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
              <SeldonImage style={{ borderRadius: '10px' }} src={image} alt="placeholder" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots id="carousel-dots" numberOfSlides={images.length} />
      </Carousel>
    </div>
  );
};
