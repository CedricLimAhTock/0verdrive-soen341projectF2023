import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles/Home.css";
import searchIcon from "../assets/searchIcon.svg";
import homeImg from "../assets/tempHomeImg.svg";
import searchImg from "../assets/search-img.svg";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import axios from "axios";
const Home = () => {
  // COMMENTED FOR TESTING
  // const property = {
  //   images: [
  //     {
  //       original:
  //         "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1015/1000/600/",
  //     },
  //     {
  //       original: "https://picsum.photos/id/1019/1000/600/",
  //     },
  //   ],

  //   id: 1,
  //   active: true,
  //   civicAddress: "4",
  //   aptNumber: "801",
  //   street: "Heffernan",
  //   neighbourhood: "Conception Bay South",
  //   city: "Montreal",
  //   province: "Quebec",
  //   postal_code: "I6Y 1M6",
  //   country: "Canada",
  //   listing_type: "rent",
  //   price: 9256,
  //   living_area: 3122,
  //   property_area: 8996,
  //   num_bedrooms: 3,
  //   num_bathrooms: 8,
  //   num_floors: 4,
  //   year_built: "1923-01-01",
  //   listed_date: "2022-12-15",
  // };

  const [property1, setProperty1] = useState();
  const [property2, setProperty2] = useState();
  const [property3, setProperty3] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/property")
      .then((res) => {
        const properties = res.data.reverse();
        console.log(properties);
        properties[0].images = [
          {
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
          {
            original: "https://picsum.photos/id/1015/1000/600/",
          },
          {
            original: "https://picsum.photos/id/1019/1000/600/",
          },
        ];
        properties[1].images = [
          {
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
          {
            original: "https://picsum.photos/id/1015/1000/600/",
          },
          {
            original: "https://picsum.photos/id/1019/1000/600/",
          },
        ];
        properties[2].images = [
          {
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
          {
            original: "https://picsum.photos/id/1015/1000/600/",
          },
        ];
        setProperty1(properties[0]);
        setProperty2(properties[1]);
        setProperty3(properties[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          Explore our newest listings below!
        </div>
        <div className="explore-container-buttons">
          <NavLink to="/Browse" className="button">
            Buy
          </NavLink>
          <NavLink to="/Browse" className="button">
            Rent
          </NavLink>
        </div>
      </div>
      <div className="listing-container">
        {property1 && property2 && property3 && (
          <PropertyCard property={property1} />
        )}
        {property1 && property2 && property3 && (
          <PropertyCard property={property2} />
        )}
        {property1 && property2 && property3 && (
          <PropertyCard property={property3} />
        )}
      </div>
    </div>
  );
};

export default Home;
