import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Browse.css";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import Search from "../assets/searchIcon-browse.svg";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [minBathrooms, setMinBathrooms] = useState("");
  const [maxBathrooms, setMaxBathrooms] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/property/");
        const dataWithImages = response.data.map((property) => {
          if (!property.images || property.images.length === 0) {
            property.images = [
              {
                original: "https://picsum.photos/id/1018/1000/600/",
              },
            ];
          }
          return property;
        });
        setPropertyData(dataWithImages);
      } catch (error) {
        console.error("Error in Browse.jsx", error);
      }
    };

    fetchData();
  }, []);

  const searchData = async () => {
    try {
      const searchTerms = {
        street,
        city,
        province,
        country,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
      };
      const response = await axios.get(
        "http://localhost:8080/propert/search/",
        { searchTerms }
      );
      const dataWithImages = response.data.map((property) => {
        if (!property.images || property.images.length === 0) {
          property.images = [
            {
              original: "https://picsum.photos/id/1018/1000/600/",
            },
          ];
        }
        return property;
      });
      setPropertyData(dataWithImages);
    } catch (error) {
      console.error("Error in Browse.jsx", error);
    }
  };

  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(
    startPage + maxVisiblePages - 1,
    Math.ceil(propertyData.length / propertiesPerPage)
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = propertyData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(propertyData.length / propertiesPerPage));
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(propertyData.length / propertiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onEventClick = (propertyId) => {
    console.log("propertyId", propertyId);
    const selectedProperty = propertyData.find(
      (property) => property.id === propertyId
    );
    if (selectedProperty) {
      navigate(`/property/${propertyId}`, {
        state: { property: selectedProperty },
      });
    }
  };

  return (
    <div className="browse-container">
      <div className="filters-container">
        <div className="filters">
          <form className="search">
            <input
              className="search-area"
              type="text"
              placeholder="City, Neighbourhood, Address..."
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            ></input>
            <select className="search-select">
              <option className="sale-text" value="Sale">
                Sale
              </option>
              <option className="sale-text" value="Rent">
                Rent
              </option>
            </select>
            <input
              className="search-select"
              type="select"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            ></input>
            <input
              className="search-select"
              type="select"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            ></input>
            <input
              className="search-select"
              type="select"
              placeholder="Beds"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            ></input>
            <input
              className="search-select-baths"
              type="select"
              placeholder="Baths"
              value={minBathrooms}
              onChange={(e) => setMinBathrooms(e.target.value)}
            ></input>
            <input type="image" src={Search}></input>
            onClick{searchData()}
          </form>
        </div>
      </div>
      <div className="items">
        <div className="browse-cards">
          {currentProperties.map((property, index) => (
            <PropertyCard
              property={property}
              key={index}
              className="property-card"
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
      <div className="pagination">
        <nav>
          <ul className="pagination-list">
            <li className="page-item">
              <a href="#" className="page-link" onClick={firstPage}>
                First
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {pageNumbers.map((number, index) => (
              <li
                className={`page-item ${
                  currentPage === number ? "active-page" : ""
                }`}
                key={index}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changePage(number)}
                >
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link" onClick={lastPage}>
                Last
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Browse;
