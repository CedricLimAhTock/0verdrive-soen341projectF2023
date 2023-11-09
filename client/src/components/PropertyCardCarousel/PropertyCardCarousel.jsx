import React from "react";
import Slider from "react-slick";
import PropertyCard from "../PropertyCard/PropertyCard";

const PropertyCardCarousel = ({ properties }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 8000,
    cssEase: "ease",
    swipe: false,
  };

  return (
    <div>
      {properties.length > 0 ? (
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </Slider>
      ) : (
        <h1>No properties</h1>
      )}
    </div>
  );
};

export default PropertyCardCarousel;
