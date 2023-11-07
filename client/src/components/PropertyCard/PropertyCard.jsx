import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PropertyCard.css";
import bedIcon from "../../../public/assets/bed.svg";
import bathIcon from "../../../public/assets/bath.svg";
import rulerIcon from "../../../public/assets/ruler.svg";
// import saveIcon from "../../assets/saveIcon.svg";
import SaveIcon from "../SaveIcon/SaveIcon";
import Carousel from "../Carousel/Carousel";
import axios from "axios";


const PropertyCard = ({ property, onEventClick, decodedToken }) => {
  const { images, price, street, city, province, country, numOfBedrooms, numOfBathrooms, propertyArea, id} = property;
  const address = `${street}, ${city}, ${province}, ${country}`;
  let [isSaved, setIsSaved] = useState(false);

  const handleIsSaved = async (e) => {
    e.stopPropagation();
    console.log("clicked");

    if (!decodedToken) {
      return;
    }
    try {
      await axios.post("http://localhost:8080/favourite", {
        property_id: id,
        user_id: decodedToken.id,
      })
    } catch (error) {
      console.error("Error in PropertyCard.jsx", error);
    }

    setIsSaved(!isSaved);
  };
  const toggleProperty = () => {
    onEventClick(property.id);
  };

  return (
    <div className="card" onClick={() => toggleProperty(property)}>
      <div className="listing-container-card">
        <div className="card-img">
          <Carousel images={images} className={"card-carousel"} />
        </div>
        <div className="card-save"></div>
        <div className="card-info">
          <div className="card-price-container">
            <div className="card-price">{price}</div>
            {/* <img className="save-icon" src={saveIcon} alt="Save Icon" /> */}
            <SaveIcon
              onClick={handleIsSaved}
              fill={isSaved ? "rgba(255, 153, 0, 1)" : "rgba(0, 0, 0, 0)"}
              stroke={isSaved ? "rgba(255, 153, 0, 1)" : "rgba(0, 0, 0, 1)"}
              className="card-save-icon"
            />
          </div>
          <div className="card-address">{address}</div>
        </div>
        <div className="card-icons">
          <div className="icon-with-number">
            <img className="card-icon" src={bedIcon} alt="Bed Icon" />
            <span className="icon-number">{numOfBedrooms}</span>
          </div>
          <div className="icon-with-number">
            <img className="card-icon" src={bathIcon} alt="Bath Icon" />
            <span className="icon-number">{numOfBathrooms}</span>
          </div>
          <div className="icon-with-number">
            <img className="card-icon" src={rulerIcon} alt="Ruler Icon" />
            <span className="icon-number">{propertyArea} ft<sup>2</sup></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
