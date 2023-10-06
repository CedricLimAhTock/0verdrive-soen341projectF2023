import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Home.css";
import searchIcon from "../assets/searchIcon.svg";
import homeImg from "../assets/tempHomeImg.svg";
import searchImg from "../assets/search-img.svg";
import PropertyCard from "../components/PropertyCard/PropertyCard";

const Home = () => {

  // COMMENTED FOR TESTING
  const property = {
    images: [homeImg],
    price: "$1,000,000",
    address: "1234 Main St, San Diego, CA 92101",
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
  };

  return (
    <div className="main-content">
      <div className="search-container">
        <img className = "search-container-img" src = {searchImg}></img>
        <div className="search-container-text">We lorem your home!</div>
        <div className="search-container-searchbox">
          <input
            className="searchbar"
            type="text"
            placeholder="Search for an IDK..."
          />
          <img className="search-icon" src={searchIcon}></img>
        </div>
      </div>
      <div className="explore-container">
        <div className="explore-conatiner-text1">
          <h1>Recent Listings</h1>
        </div>
        <div className="explore-conatiner-text2">
          Explore our newest listing below!
        </div>
        <div className="explore-container-buttons">
          <NavLink className="button">Buy</NavLink>
          <NavLink className="button">Rent</NavLink>
        </div>
      </div>
      <div className="listing-container">
        <PropertyCard property={property}/>
        <PropertyCard property={property}/>
        <PropertyCard property={property}/>
      </div>
    </div>
  );
};

export default Home;
