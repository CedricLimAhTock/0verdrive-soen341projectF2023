import React from "react";
import Slider from "react-slick";
import PropertyCard from "../PropertyCard/PropertyCard";

const PropertyCardCarousel = ({ properties }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div>
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertyCardCarousel;
