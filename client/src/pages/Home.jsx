import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Home.css";
import searchIcon from "../assets/searchIcon.svg";
import homeImg from "../assets/tempHomeImg.svg";
import searchImg from "../../public/assets/search-img.svg";
import PropertyCard from "../components/PropertyCard/PropertyCard";

const Home = () => {
  // COMMENTED FOR TESTING
  const property = {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
      },
    ],

    id: 1,
    active: true,
    civicAddress: "4",
    aptNumber: "801",
    street: "Heffernan",
    neighbourhood: "Conception Bay South",
    city: "Montreal",
    province: "Quebec",
    postal_code: "I6Y 1M6",
    country: "Canada",
    listing_type: "rent",
    price: 9256,
    living_area: 3122,
    property_area: 8996,
    num_bedrooms: 3,
    num_bathrooms: 8,
    num_floors: 4,
    year_built: "1923-01-01",
    listed_date: "2022-12-15",
  };

  return (
    <div className="main-content">
      <div className="search-container">
        <img className="search-container-img" src={searchImg}></img>
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
        <PropertyCard property={property} />
        <PropertyCard property={property} />
        <PropertyCard property={property} />
      </div>
    </div>
  );
};

export default Home;
