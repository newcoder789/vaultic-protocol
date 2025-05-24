import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, width, height, quantity, reverse = false, aosAnimation = 'fade-up' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  console.log('Rendering images:', images);

  return (
    <div
      className="slider"
      style={{
        '--width': width,
        '--height': height,
        '--quantity': quantity,
      }}
      reverse={reverse.toString()}
      data-aos={aosAnimation}
      data-aos-duration="1500"
      data-aos-once="true"
      role="region"
      aria-label="Image carousel"
    >
      <div className="list">
        {images.map((image, index) => (
          <div
            key={index}
            className={`item ${hoveredIndex === index ? 'hovered' : hoveredIndex !== null ? 'not-hovered' : ''}`}
            style={{ '--position': index + 1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;