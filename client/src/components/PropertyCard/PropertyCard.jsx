import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyCard.css';
import bedIcon from "../../assets/bed.svg";
import bathIcon from "../../assets/bath.svg";
import rulerIcon from "../../assets/ruler.svg";
import saveIcon from "../../assets/saveIcon.svg";

const PropertyCard = ({ property, onEventClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { images, price, address, bedrooms, bathrooms, size } = property;

  const toggleProperty = () => {
    onEventClick(property);
  };
  

  return (
    <div className='card' onClick={() => toggleProperty(property)}>
    <div className='listing-container-card'>
        <div className='card-img'>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
        <div className='card-save'></div>
        <div className='card-info'>
            <div className='card-price'>
                {price}<img className='save-icon' src={saveIcon} alt='Save Icon' />
            </div>
            <div className='card-address'>{address}</div>
        </div>
        <div className='card-icons'>
            <div className='icon-with-number'>
                <img className='card-icon' src={bedIcon} alt='Bed Icon' />
                <span className='icon-number'>{bedrooms}</span>
            </div>
            <div className='icon-with-number'>
                <img className='card-icon' src={bathIcon} alt='Bath Icon' />
                <span className='icon-number'>{bathrooms}</span>
            </div>
            <div className='icon-with-number'>
                <img className='card-icon' src={rulerIcon} alt='Ruler Icon' />
                <span className='icon-number'>{size} sq ft</span>
            </div>
        </div>
    </div>
    </div>
  );
};

export default PropertyCard;