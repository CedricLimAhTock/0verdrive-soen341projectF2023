import ImageGallery from "react-image-gallery";
import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
const Carousel = ({ images, className, onClick }) => {
  return (
    <ImageGallery
      additionalClass={className}
      items={images}
      infinite={true}
      showThumbnails={false}
      autoPlay={true}
      showPlayButton={images.length > 1 ? true : false}
      showFullscreenButton={false}
      onClick={onClick}
    />
  );
};
export default Carousel;
