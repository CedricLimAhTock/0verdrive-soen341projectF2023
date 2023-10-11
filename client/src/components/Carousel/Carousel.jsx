import ImageGallery from "react-image-gallery";
import React, { Component } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
// import "./Carousel.css";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const Carousel = () => {
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
