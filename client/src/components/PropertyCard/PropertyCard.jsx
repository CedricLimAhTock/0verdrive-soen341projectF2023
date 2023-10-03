import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyCard.css';

const PropertyCard = ({ property, onEventClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { images, price, address, bedrooms, bathrooms, size } = property;

  const toggleProperty = (property) => {
    onEventClick(property);
  };

  return (
    <div className='card' onClick={() => toggleProperty(property)}>
      <div className='slideshow'>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className='info'>
        <h2>{address}</h2>
        <p>Price: {price}</p>
        <p>Bedrooms: {bedrooms}</p>
        <p>Bathrooms: {bathrooms}</p>
        <p>Size: {size} sq ft</p>
      </div>
    </div>
  );
};

export default PropertyCard;
