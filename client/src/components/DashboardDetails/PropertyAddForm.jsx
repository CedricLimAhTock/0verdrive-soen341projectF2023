import React, { useState } from "react";
import "./styles/PropertyAddForm.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
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
      <form className="popup-form add-property-form">
        <button onClick={closeForm}>Close</button>
        <h2>Add Property</h2>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select a type</option>
          <option value="single-family">Single Family</option>
          <option value="duplex">Duplex</option>
          <option value="triplex">Triplex</option>
          <option value="quadruplex">Quadruplex</option>
          <option value="townhouse">Townhouse</option>
          <option value="studio">Studio</option>
          <option value="condominium">Condominium</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="neighbourhood">Neighbourhood</label>
        <input
          id="neighbourhood"
          type="text"
          value={neighbourhood}
          placeholder="Neighbourhood"
          onChange={(e) => setNeighbourhood(e.target.value)}
          required
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label htmlFor="province">Province</label>
        <input
          id="province"
          type="text"
          value={province}
          placeholder="Province"
          onChange={(e) => setProvince(e.target.value)}
          required
        />

        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <label htmlFor="num_bedrooms">Number of Bedrooms</label>
        <input
          id="num_bedrooms"
          type="text"
          value={num_bedrooms}
          placeholder="Number of Bedrooms"
          onChange={(e) => setNum_bedrooms(e.target.value)}
          required
        />

        <label htmlFor="num_bathrooms">Number of Bathrooms</label>
        <input
          id="num_bathrooms"
          type="text"
          value={num_bathrooms}
          placeholder="Number of Bathrooms"
          onChange={(e) => setNum_bathrooms(e.target.value)}
          required
        />

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
