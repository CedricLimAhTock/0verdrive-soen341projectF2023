import React, { useState } from "react";
import "./styles/PropertyAddForm.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import xIcon from "../../assets/xIcon.svg";

const PropertyAddForm = ({ isFormOpen, closeForm }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const [price, setPrice] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [num_bedrooms, setNum_bedrooms] = useState("");
  const [num_bathrooms, setNum_bathrooms] = useState("");
  const [property_area, setProperty_area] = useState("");
  const [civic_address, setCivic_address] = useState("");
  const [street, setStreet] = useState("");
  const [apt_number, setApt_number] = useState("");
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const broker_id = decoded.broker_id;
  const handleSubmit = (event) => {
    event.preventDefault();

    const property = {
      price,
      neighbourhood,
      city,
      province,
      country,
      num_bedrooms,
      num_bathrooms,
      property_area,
    };

    const data = {
      broker_id,
      title,
      property,
    };
    try {
      axios.post("http://localhost:8080/listing/property", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form">
        <button onClick={closeForm} className="close-button">
          <img src={xIcon} alt="close" className="close-button-x" />
        </button>
        <h2>Add Property</h2>
        <input
          id="title"
          type="text"
          value={title}
          className="form-property-title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="form-pair">
          <input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <input
            id="price"
            type="text"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="neighbourhood"
            type="text"
            value={neighbourhood}
            placeholder="Neighbourhood"
            onChange={(e) => setNeighbourhood(e.target.value)}
            required
          />
          <input
            id="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="province"
            type="text"
            value={province}
            placeholder="Province"
            onChange={(e) => setProvince(e.target.value)}
            required
          />
          <input
            id="country"
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-pair">
          <input
            id="num_bedrooms"
            type="text"
            value={num_bedrooms}
            placeholder="Number of Bedrooms"
            onChange={(e) => setNum_bedrooms(e.target.value)}
            required
          />
          <input
            id="num_bathrooms"
            type="text"
            value={num_bathrooms}
            placeholder="Number of Bathrooms"
            onChange={(e) => setNum_bathrooms(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="submit add"
            onClick={handleSubmit && closeForm}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
