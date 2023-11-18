import React, { useState, useContext } from "react";
import FormatNumber from "../FormatNumber/FormatNumber";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
const PropertyForm = ({ isFormOpen, data, closeForm }) => {
  const [name, setName] = useState(data.name || "");
  const [type, setType] = useState(data.type || "");
  const [address, setAddress] = useState(data.address || "");
  const [price, setPrice] = useState(data.price || "");
  const { darkMode } = useContext(DarkModeContext);
  const handleSubmit = async (event, action) => {
    event.preventDefault();

    // if (action === 'edit') {
    //   try {
    //     const response = await axios.put(`http://localhost:5555/events/${id}`, {
    //       title: title.toString(),
    //       description: description.toString(),
    //       date: date,
    //     });

    //     if (response.status === 200) {
    //       alert('Updated');
    //       console.log(response);
    //     } else {
    //       console.log(response);
    //       console.log('Failed to update');
    //     }
    //   } catch (err) {
    //     console.log('Error updating');
    //     console.error(err);
    //   }
    // } else if (action === 'delete') {
    //   try {
    //     const response = await axios.delete(`http://localhost:5555/events/${id}`);

    //     if (response.status === 204) {
    //       alert('Deleted');
    //       console.log(response);
    //     } else {
    //       console.log(response);
    //       console.log('Failed to delete');
    //     }
    //   } catch (err) {
    //     console.log('Error deleting');
    //     console.error(err);
    //   }
    // }
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
        <h2>Property Information</h2>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="type"
          type="text"
          value={type}
          placeholder="Type"
          onChange={(e) => setType(e.target.value)}
        />
        <input
          id="address"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          id="price"
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="button-container">
          <button
            type="submit"
            className="submit edit"
            onClick={(e) => handleSubmit(e, "edit")}
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
