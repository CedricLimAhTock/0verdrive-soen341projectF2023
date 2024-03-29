import React, { useState, useContext } from "react";
import axios from "axios";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
const UserForm = ({ isFormOpen, data, closeForm }) => {
  const { darkMode } = useContext(DarkModeContext);
  console.log(data);

  const [firstname, setFirstName] = useState(data.user.firstname || "");
  const [lastname, setLastName] = useState(data.user.lastname || "");
  const [phone, setPhone] = useState(data.user.phone || "");
  const [email, setEmail] = useState(data.user.email || "");
  const [agency, setAgency] = useState(data.agency || "");
  const [license_number, setLicenseNumber] = useState(
    data.license_number || ""
  );

  const handleSubmit = async (event, action) => {
    event.preventDefault();

    console.log(data);

    if (action === "edit") {
      try {
        console.log(firstname);
        console.log(lastname);
        console.log(phone);
        console.log(email);
        console.log(agency);
        console.log(license_number);

        const response = await axios.put(
          `http://127.0.0.1:8080/user/${data.user_id}`,
          {
            username: data.user.username,
            firstname: firstname.toString(),
            lastname: lastname.toString(),
            email: email.toString(),
            phone: phone.toString(),
          }
        );
        const response2 = await axios.put(
          `http://127.0.0.1:8080/broker/${data.id}`,
          {
            agency: agency.toString(),
            license_number: license_number.toString(),
            email: email.toString(),
            phone: phone,
            user: {
              username: data.user.username,
              firstname: firstname.toString(),
              lastname: lastname.toString(),
              email: email.toString(),
              phone: phone.toString(),
            },
          }
        );

        if (response.status === 200 && response2.status === 200) {
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
        await axios.delete(`http://127.0.0.1:8080/broker/${data.id}`);
        let response = await axios.delete(
          `http://127.0.0.1:8080/user/${data.user_id}`
        );

        // delete associated broker when user is deleted. should then also delete all properties :/
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
          <img
            src={darkMode ? xIconDark : xIcon}
            alt="close"
            className="close-button-x"
          />
        </button>
        <h2>Selected User Information</h2>
        <div className="form-pair">
          <input
            id="firstname"
            type="text"
            value={firstname}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            id="lastname"
            type="text"
            value={lastname}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-pair">
          <input
            id="phone"
            type="text"
            value={phone}
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <input
          id="agency"
          type="text"
          value={agency}
          placeholder="Agency"
          onChange={(e) => setAgency(e.target.value)}
        />
        <input
          id="license_number"
          type="text"
          value={license_number}
          placeholder="License Number"
          onChange={(e) => setLicenseNumber(e.target.value)}
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
