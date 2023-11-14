import React, { useState } from "react";
import axios from "axios";

const PropertyForm = ({ isFormOpen, data, closeForm }) => {
  const [title, setTitle] = useState(data.title || "");
  const [type, setType] = useState(data.type || "");
  const [address, setAddress] = useState(data.property.address || "");
  const [price, setPrice] = useState(data.property.price || "");

  const handleSubmit = async (event, action) => {
    event.preventDefault();

    let listingData = {};
    try {
      const propID = data.id;
      listingData = await axios.get(`http://localhost:8080/listing/property/${encodeURIComponent(propID)}`);
      console.log(listingData.data);
    } catch (err) {
      console.log('Error getting listing data');
      console.error(err);
      return; // Stop execution if there's an error
    }

    const property = {
      price,
      address,
      property_type: type,
    };

    const requestData = {
      id: data.id,
      broker_id: listingData.data.broker_id,
      title,
      property,

    };


    if (action === 'edit') {
      try {
        const response = await axios.put(`http://localhost:8080/listing/${data.id}`, requestData);

        if (response.status === 200) {
          alert('Updated');
          console.log(response);
        } else {
          console.log(response);
          console.log('Failed to update');
        }
      } catch (err) {
        console.log('Error updating');
        console.error(err);
      }
    } else if (action === 'delete') {
      try {
        const response = await axios.delete(`http://localhost:8080/property/${data.id}`);

        if (response.status === 200) {
          alert('Deleted');
          console.log(response);
        } else {
          console.log(response);
          console.log('Failed to delete');
        }
      } catch (err) {
        console.log('Error deleting');
        console.error(err);
      }
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={(e) => handleSubmit(e, "edit")}>
        <button type="button" onClick={closeForm}>Close</button>
        <h2>Property Information</h2>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="type">Listing Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Listing Type</option>
          <option value="single-family">Single Family</option>
          <option value="duplex">Duplex</option>
          <option value="triplex">Triplex</option>
          <option value="quadruplex">Quadruplex</option>
          <option value="townhouse">Townhouse</option>
          <option value="studio">Studio</option>
          <option value="condominium">Condominium</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="button-container">
          <button type="submit" className="submit edit">Update</button>
          <button type="button" className="submit delete" onClick={(e) => handleSubmit(e, "delete")}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
