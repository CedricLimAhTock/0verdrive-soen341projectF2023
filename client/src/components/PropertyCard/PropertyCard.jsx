import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PropertyCard.css";
import bedIcon from "../../assets/bed.svg";
import bedIconDark from "../../assets/bed_darkMode.svg";
import bathIcon from "../../assets/bath.svg";
import bathIconDark from "../../assets/bath_darkMode.svg";
import rulerIcon from "../../assets/ruler.svg";
import rulerIconDark from "../../assets/ruler_darkMode.svg";
// import saveIcon from "../../assets/saveIcon.svg";
import SaveIcon from "../SaveIcon/SaveIcon";
import Carousel from "../Carousel/Carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormatNumber from "../FormatNumber/FormatNumber";

const PropertyCard = ({ property, decodedToken }) => {
  const { darkMode } = useContext(DarkModeContext);
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
        `http://localhost:8080/favourite/user/${decodedToken.id}/property/${property.id}`
      );
      console.log(response.data);

      if (response.data.length === 0) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error in PropertyCard.jsx", error);
    }
  };
  useEffect(() => {
    fetchIsSaved();
  }, [decodedToken, property]);
  const handleIsSaved = async (e) => {
    e.stopPropagation();
    console.log("clicked");

    if (!decodedToken) {
      alert("Please login to save property");
      return;
    }
    try {
      if (!isSaved) {
        await axios.post("http://localhost:8080/favourite", {
          property_id: id,
          user_id: decodedToken.id,
        });
      } else {
        await axios.delete(
          `http://localhost:8080/favourite/user/${decodedToken.id}/property/${property.id}`
        );
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error in PropertyCard.jsx", error);
    }
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
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
          {
            original:
              "https://www.rismedia.com/wp-content/uploads/2021/03/luxury_real_estate_1150278000-1-750x435.jpg",
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
          <Carousel
            images={images}
            className={"card-carousel"}
            onClick={() => onEventClick(property.id)}
          />
        </div>
        <div onClick={() => onEventClick(property.id)}>
          <div className="card-info">
            <div className="card-price-container">
              <div className="card-price">${FormatNumber(price)}</div>
              {/* <img className="save-icon" src={saveIcon} alt="Save Icon" /> */}
              <SaveIcon
                onClick={handleIsSaved}
                fill={isSaved ? "rgba(255, 153, 0, 1)" : "rgba(0, 0, 0, 0)"}
                stroke={
                  isSaved
                    ? "rgba(255, 153, 0, 1)"
                    : darkMode
                    ? "rgba(255, 255, 255, 0.714)"
                    : "rgba(0, 0, 0, 1)"
                }
                className="card-save-icon"
              />
            </div>
            <div className="card-address">{address}</div>
          </div>
          <div className="card-icons">
            <div className="icon-with-number">
              <img
                className="card-icon"
                src={darkMode ? bedIconDark : bedIcon}
                alt="Bed Icon"
              />
              <span className="icon-number">{num_bedrooms}</span>
            </div>
            <div className="icon-with-number">
              <img
                className="card-icon"
                src={darkMode ? bathIconDark : bathIcon}
                alt="Bath Icon"
              />
              <span className="icon-number">{num_bathrooms}</span>
            </div>
            <div className="icon-with-number">
              <img
                className="card-icon"
                src={darkMode ? rulerIconDark : rulerIcon}
                alt="Ruler Icon"
              />
              <span className="icon-number">
                {FormatNumber(property_area)} ft<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
