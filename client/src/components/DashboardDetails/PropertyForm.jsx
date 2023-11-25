import React, { useState, useContext, useEffect } from "react";
import FormatNumber from "../FormatNumber/FormatNumber";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import axios from "axios";
import jwtDecode from "jwt-decode";
const PropertyForm = ({ isFormOpen, data, closeForm }) => {
  const { darkMode } = React.useContext(DarkModeContext);
  console.log(data);
  const property = data.property;

  const [title, setTitle] = useState(data.title || "");

  const [civic_address, setCivicAddress] = useState(
    property.civic_address || ""
  );
  const [apt_number, setAptNumber] = useState(property.apt_number || "");
  const [street, setStreet] = useState(property.street || "");
  const [neighbourhood, setNeighbourhood] = useState(
    property.neighbourhood || ""
  );
  const [city, setCity] = useState(property.city || "");
  const [province, setProvince] = useState(property.province || "");
  const [postal_code, setPostalCode] = useState(property.postal_code || "");
  const [country, setCountry] = useState(property.country || "");
  const [listing_type, setListingType] = useState(
    property.listing_type || "sale"
  );
  const [price, setPrice] = useState(property.price || "");
  const [living_area, setLivingArea] = useState(property.living_area || "");
  const [property_area, setPropertyArea] = useState(
    property.property_area || ""
  );
  const [num_bedrooms, setNumBedrooms] = useState(property.num_bedrooms || "");
  const [num_bathrooms, setNumBathrooms] = useState(
    property.num_bathrooms || ""
  );
  const [num_floors, setNumFloors] = useState(property.num_floors || "");
  const [year_built, setYearBuilt] = useState(property.year_built || "");
  const [property_type, setPropertyType] = useState(
    property.property_type || "other"
  );

  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const broker_id = decoded.broker_id;

  const handleSubmit = async (event, action) => {
    event.preventDefault();

    if (action === "delete") {
      try {
        const response2 = await axios.delete(
          `http://127.0.0.1:8080/listing/${data.id}`
        );
        const response1 = await axios.delete(
          `http://127.0.0.1:8080/property/${property.id}`
        );

        if (response1.status === 200 && response2.status === 200) {
          alert("Deleted");
          console.log(response1);
          console.log(response2);
        } else {
          console.log(response1);
          console.log(response2);
          console.log("Failed to delete");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (action === "update") {
      const currDate = new Date();
      const datetime = currDate.toISOString().split("T")[0];

      const propertyData = {
        active: 1,
        civic_address,
        apt_number,
        street,
        neighbourhood,
        city,
        province,
        postal_code,
        country,
        listing_type,
        price,
        living_area,
        property_area,
        num_bedrooms,
        num_bathrooms,
        num_floors,
        year_built,
        listed_date: datetime,
        property_type,
      };

      try {
        const response3 = await axios.put(
          "http://127.0.0.1:8080/property/" + property.id,
          propertyData
        );
        console.log(response3);

        if (response3.status === 200) {
          const dataExtra = {
            broker_id: broker_id,
            title: title,
            property_id: property.id,
            description: "",
          };

          const response4 = await axios.put(
            "http://127.0.0.1:8080/listing/" + data.id,
            dataExtra
          );

          if (response4.status === 200) {
            alert("Property updated");
          } else {
            console.log(response4);
            console.log("Failed to update listing");
            axios.delete(`http://127.0.0.1:8080/${response3.data.id}`);
          }
        } else {
          console.log("Failed to update property");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img
            src={darkMode ? xIconDark : xIcon}
            alt="close"
            className="close-button-x"
          />
        </button>
        <h2>Add Property</h2>

        <div className="form-pair">
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="form-property-listing-type">
            <select
              name="listing-type"
              value={listing_type}
              onChange={(e) => setListingType(e.target.value)}
              required
            >
              <option value="sale">For Sale ▾</option>
              <option value="rent">For Rent ▾</option>
            </select>
          </div>
        </div>

        <div className="form-pair">
          <input
            placeholder="Civic Address"
            id="civic_address"
            value={civic_address}
            onChange={(e) => setCivicAddress(e.target.value)}
          />
          <input
            placeholder="Apt Number"
            id="apt_number"
            value={apt_number}
            onChange={(e) => setAptNumber(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="street"
            type="text"
            value={street}
            placeholder="Street"
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            id="neighbourhood"
            type="text"
            value={neighbourhood}
            placeholder="Neighbourhood"
            onChange={(e) => setNeighbourhood(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            id="province"
            type="text"
            value={province}
            placeholder="Province"
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <input
            id="postal_code"
            type="text"
            value={postal_code}
            placeholder="Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            id="country"
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-pair">
          <div className="form-property-property-type">
            <select
              name="property_type"
              value={property_type}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="other">Other ▾</option>
              <option value="single-family">Family ▾</option>
              <option value="duplex">Duplex ▾</option>
              <option value="triplex">Triplex ▾</option>
              <option value="quadruplex">Quadruplex ▾</option>
              <option value="townhouse">Townhouse ▾</option>
              <option value="studio">Studio ▾</option>
              <option value="condominium">Condominium ▾</option>
            </select>
          </div>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="living_area"
            type="number"
            min="0"
            value={living_area}
            placeholder="Living Area"
            onChange={(e) => setLivingArea(e.target.value)}
          />
          <input
            id="property_area"
            type="number"
            min="0"
            value={property_area}
            placeholder="Property Area"
            onChange={(e) => setPropertyArea(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="num_bedrooms"
            type="number"
            min="0"
            max="10000"
            value={num_bedrooms}
            placeholder="Number of Bedrooms"
            onChange={(e) => setNumBedrooms(e.target.value)}
          />
          <input
            id="num_bathrooms"
            type="number"
            min="1"
            max="10000"
            value={num_bathrooms}
            placeholder="Number of Bathrooms"
            onChange={(e) => setNumBathrooms(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="num_floors"
            type="number"
            min="1"
            max="10000"
            value={num_floors}
            placeholder="Number of Floors"
            onChange={(e) => setNumFloors(e.target.value)}
          />
          <input
            id="year_built"
            type="date"
            min="1900-01-01"
            value={year_built}
            placeholder="Year Built"
            onChange={(e) => setYearBuilt(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="submit edit"
            onClick={(e) => handleSubmit(e, "update")}
          >
            Update
          </button>
          <button
            type="submit"
            className="submit-delete"
            onClick={(e) => handleSubmit(e, "delete")}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
