import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, decodedToken }) => {
  const navigate = useNavigate();
  const {
    images,
    price,
    street,
    city,
    province,
    country,
    num_bedrooms,
    num_bathrooms,
    property_area,
    id,
  } = property;
  const address = `${street}, ${city}, ${province}, ${country}`;
  let [isSaved, setIsSaved] = useState(false);

  const fetchIsSaved = async () => {
    if (!decodedToken) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/favourite/property/${property.id}`
      );
      const foundFavorite = response.data.find(
        (property) => property.user_id === decodedToken.id
      );

      if (!foundFavorite) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error in PropertyCard.jsx", error);
    }
  };
  fetchIsSaved();

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
      });
    } catch (error) {
      console.error("Error in PropertyCard.jsx", error);
    }

    setIsSaved(!isSaved);
  };

  const onEventClick = async (propertyId) => {
    console.log("propertyId", propertyId);
    const selectedProperty = async () => {
      const response = await axios.get(
        `http://localhost:8080/property/${propertyId}`
      );
      if (!response.data.images || response.data.images.length === 0) {
        response.data.images = [
          {
            original: "https://picsum.photos/id/1018/1000/600/",
          },
        ];
      }
      return response.data;
    };
    const propertyData = await selectedProperty();
    if (propertyData) {
      window.scrollTo(0, 0);
      navigate(`/property/${propertyId}`, {
        state: { property: propertyData },
      });
    }
  };

  return (
    <div className="card">
      <div className="listing-container-card">
        <div className="card-img">
          <Carousel images={images} className={"card-carousel"} />
        </div>
        <div onClick={() => onEventClick(property.id)}>
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
              <span className="icon-number">{num_bedrooms}</span>
            </div>
            <div className="icon-with-number">
              <img className="card-icon" src={bathIcon} alt="Bath Icon" />
              <span className="icon-number">{num_bathrooms}</span>
            </div>
            <div className="icon-with-number">
              <img className="card-icon" src={rulerIcon} alt="Ruler Icon" />
              <span className="icon-number">
                {property_area} ft<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
