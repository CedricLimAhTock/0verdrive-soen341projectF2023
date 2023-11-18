import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";

{/*const [decodedToken, setDecodedToken] = React.useState(null);
const { darkMode } = useContext(DarkModeContext);*/}

const UserForm = ({ isFormOpen, data, closeForm }) => {
  const [firstName, setFirstName] = useState(data.user.firstname || "");
  const [lastName, setLastName] = useState(data.user.lastname || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [createdAt, setCreatedAt] = useState(data.createdAt || "");
  const [email, setEmail] = useState(data.email || "");

  const handleSubmit = async (event, action) => {
    event.preventDefault();

    if (action === "edit") {
      try {
        console.log(data.id);

        const response = await axios.put(
          `http://127.0.0.1:8080/user/${data.id}`,
          {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            email: email.toString(),
            phone: phone.toString(),
          }
        );

        if (response.status === 200) {
          alert("Updated");
          console.log(response);
        } else {
          console.log(response);
          console.log("Failed to update");
        }
      } catch (err) {
        console.log("Error updating");
        console.error(err);
      }
    } else if (action === "delete") {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8080/user/${data.id}`
        );

        if (response.status === 200) {
          alert("Deleted");
          console.log(response);
        } else {
          console.log(response);
          console.log("Failed to delete");
        }
      } catch (err) {
        console.log("Error deleting");
        console.error(err);
      }
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button"> 
          {/*<img
            src={darkMode ? xIconDark : xIcon}
            alt="close"
            className="close-button-x"
            />*/}
        </button>
        <h2>Selected User Information</h2>
        <input
          id="firstName"
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          id="Last Name"
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          id="phone"
          type="text"
          value={phone}
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          id="dateJoined"
          type="text"
          value={createdAt}
          placeholder="Date Joined"
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <input
          id="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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

export default UserForm;
