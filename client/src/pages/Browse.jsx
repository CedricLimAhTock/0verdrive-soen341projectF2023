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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/property/');
        const dataWithImages = response.data.map((property) => {
          if (!property.images || property.images.length === 0) {
            property.images = [{
              original: "https://picsum.photos/id/1018/1000/600/",
            }];
          }
          return property;
        });
        setPropertyData(dataWithImages);
      } catch (error) {
        console.error('Error in Browse.jsx', error);
      }
    };

    fetchData();
  }, []);

  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(
    startPage + maxVisiblePages - 1,
    Math.ceil(propertyData.length / propertiesPerPage)
  );
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = propertyData.slice(indexOfFirstProperty, indexOfLastProperty);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onEventClick = (propertyId) => {

    console.log('propertyId', propertyId);
    const selectedProperty = propertyData.find(property => property.id === propertyId);
    if (selectedProperty) {
      navigate(`/property/${propertyId}`, { state: { property: selectedProperty } });
    }
  };

  return (
    <div className="browse-container">
      <div className="filters-container">
        <div className="filters">
          <form className="search">
            <input className="search-area" type="text" placeholder="City, Neighbourhood, Address..."></input>
            <input className="search-select" type="select" placeholder="For Sale"></input>
            <input className="search-select" type="select" placeholder="Min Price"></input>
            <input className="search-select" type="select" placeholder="Max Price"></input>
            <input className="search-select" type="select" placeholder="Beds"></input>
            <input className="search-select-baths" type="select" placeholder="Baths"></input>
            <input type="image" src={Search}></input>
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
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {pageNumbers.map((number, index) => (
              <li
                className={`page-item ${currentPage === number ? 'active-page' : ''}`}
                key={index}
              >
                <a href="#" className="page-link" onClick={() => changePage(number)}>
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  );
};

export default Browse;
