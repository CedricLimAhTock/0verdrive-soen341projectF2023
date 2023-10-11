import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PropertyCard.css";
import bedIcon from "../../assets/bed.svg";
import bathIcon from "../../assets/bath.svg";
import rulerIcon from "../../assets/ruler.svg";
// import saveIcon from "../../assets/saveIcon.svg";
import SaveIcon from "../SaveIcon/SaveIcon";

import Carousel from "../Carousel/Carousel";
const PropertyCard = ({ property, onEventClick, pictures }) => {
  const { images, price, address, bedrooms, bathrooms, size } = property;

  let [isSaved, setIsSaved] = useState(false);

  const handleIsSaved = () => {
    setIsSaved(!isSaved);
  };
  const toggleProperty = () => {
    onEventClick(property);
  };

  return (
    <div className="card" onClick={() => toggleProperty(property)}>
      <div className="listing-container-card">
        <div className="card-img">
          <Carousel images={pictures} />
        </div>
        <div className="card-save"></div>
        <div className="card-info">
          <div className="card-price">
            {price}
            {/* <img className="save-icon" src={saveIcon} alt="Save Icon" /> */}
            <SaveIcon
              onClick={handleIsSaved}
              fill={isSaved ? "rgba(255, 153, 0, 1)" : "rgba(0, 0, 0, 0)"}
              stroke={isSaved ? "rgba(255, 153, 0, 1)" : "rgba(0, 0, 0, 1)"}
              className="SaveIcon"
            />
          </div>
          <div className="card-address">{address}</div>
        </div>
        <div className="card-icons">
          <div className="icon-with-number">
            <img className="card-icon" src={bedIcon} alt="Bed Icon" />
            <span className="icon-number">{bedrooms}</span>
          </div>
          <div className="icon-with-number">
            <img className="card-icon" src={bathIcon} alt="Bath Icon" />
            <span className="icon-number">{bathrooms}</span>
          </div>
          <div className="icon-with-number">
            <img className="card-icon" src={rulerIcon} alt="Ruler Icon" />
            <span className="icon-number">{size} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
