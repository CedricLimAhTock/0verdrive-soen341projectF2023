import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Brokers.css";
import "./styles/BrowseBrokCommon.css";
import BrokerCard from "../components/BrokerCard/BrokerCard";
import Search from "../assets/searchIcon-browse.svg";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Brokers = () => {
  const [brokerData, setBrokerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const brokersPerPage = 8;
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/broker");

        setBrokerData(response.data);
      } catch (error) {
        console.error("Error in Browse.jsx", error);
      }
    };

    fetchData();

    // fetch token from local storage & decode
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.log("No token found");
      null;
    } else {
      const decodedToken = jwt_decode(token);
      setDecodedToken(decodedToken);
    }
  }, []);

  const searchData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/broker/search", {
        fields: {
          firstname,
          lastname,
          email,
          phone,
          agency,
        },
      });

      setBrokerData(response.data);
    } catch (error) {
      console.error("Error in Browse.jsx", error);
    }
  };

  // const [city, setCity] = useState("");
  // const [neighbourhood, setNeighbourhood] = useState("");
  // const [province, setProvince] = useState("");
  // const [country, setCountry] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agency, setAgency] = useState("");

  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(
    startPage + maxVisiblePages - 1,
    Math.ceil(brokerData.length / brokersPerPage)
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const indexOfLastBrokers = currentPage * brokersPerPage;
  const indexOfFirstBrokers = indexOfLastBrokers - brokersPerPage;
  const currentBrokers = brokerData.slice(
    indexOfFirstBrokers,
    indexOfLastBrokers
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(brokerData.length / brokersPerPage));
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(brokerData.length / brokersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onEventClick = (brokerId) => {
    console.log("brokerId", brokerId);
    const selectedBrokers = brokerData.find((broker) => broker.id === brokerId);
    if (selectedBrokers) {
      navigate(`/broker/${brokerId}`, {
        state: { broker: selectedBrokers },
      });
    }
  };

  return (
    <div className="browse-container">
      <div className="filters-container">
        <div className="filters">
          <form className="search">
            <input
              className="search-fname"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
            <input
              className="search-select"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            ></input>
            <input
              className="search-select"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="search-select"
              type="text"
              placeholder="Agency"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
            ></input>
            <input
              className="search-phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>

            <input type="image" src={Search} onClick={searchData}></input>
          </form>
        </div>
      </div>
      <div className="items">
        {brokerData.length > 0 ? (
          <div className="browse-cards">
            {currentBrokers.map((broker, index) => (
              <BrokerCard
                broker={broker}
                key={index}
                className="broker-card"
                decodedToken={decodedToken}
                onEventClick={onEventClick}
              />
            ))}
          </div>
        ) : (
          <p className="search-failed">No Brokers Found</p>
        )}
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

export default Brokers;
