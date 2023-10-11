import ImageGallery from "react-image-gallery";
import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";

const Carousel = ({ images }) => {
  return (
    <ImageGallery
      additionalClass="carousel"
      items={images}
      infinite={true}
      showThumbnails={false}
      autoPlay={true}
      showFullscreenButton={false}
    />
  );
};
export default Carousel;
