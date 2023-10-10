import React from "react";
import "./styles/Browse.css";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import { NavLink } from "react-router-dom";
import searchIcon from "../assets/searchIcon.svg";
import homeImg from "../assets/tempHomeImg.svg";
import searchImg from "../assets/search-img.svg";
import Map from "../assets/calgary-mls-1.png";
const Browse = () => {
  const property = {
    images: [homeImg],
    price: "$1,000,000",
    address: "1234 Main St, San Diego, CA 92101",
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
  };
  return (
    <div className="browse-container">
      <div className="filters">
        <form className="search">
          <input type="text" placeholder="City, Neighbourhood, Address"></input>
          <input type="select" placeholder="For Sale"></input>
          <input type="select" placeholder="Min Price"></input>
          <input type="select" placeholder="Beds"></input>
          <input type="select" placeholder="Baths"></input>
        </form>
      </div>
      <div className="items">
        <div className="browse-cards">
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
          <PropertyCard property={property} className="property-card" />
        </div>
        <div className="map">
          <img src={Map} className="map-img" />
        </div>
      </div>
    </div>
  );
};
export default Browse;
