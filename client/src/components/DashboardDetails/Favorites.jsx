import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import "./styles/Favorites.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Favorites = ({ token }) => {
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token1 = localStorage.getItem("jwtToken");
      const decodedToken = jwt_decode(token1);

      try {
        const response = await axios.get(
          `http://localhost:8080/favourite/user/${decodedToken.id}`
        );
        const favoriteProperties = response.data;

        if (favoriteProperties.length === 0) {
          return;
        }

        const propertyIds = favoriteProperties.map(
          (favorite) => favorite.property_id
        );
        const propertyData = await fetchPropertiesWithImages(propertyIds);

        setPropertyData(propertyData);
      } catch (error) {
        console.error("Error in Favorites.jsx", error);
      }
    };

    fetchData();
  }, []);

  const fetchPropertiesWithImages = async (propertyIds) => {
    const propertyDataPromises = propertyIds.map(async (propertyId) => {
      const propertyResponse = await axios.get(
        `http://localhost:8080/property/${propertyId}`
      );
      let property = propertyResponse.data;

      if (!property.images || property.images.length === 0) {
        property.images = [
          {
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
        ];
      }

      return property;
    });

    return Promise.all(propertyDataPromises);
  };

  return (
    <div className="favorites">
      {propertyData.length > 0 ? (
        propertyData.map((property, index) => (
          <div key={index} className="card-fav">
            <PropertyCard property={property} decodedToken={token} />
          </div>
        ))
      ) : (
        <p>There are no favorite properties.</p>
      )}
    </div>
  );
};

export default Favorites;
