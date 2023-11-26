import React, { useState, useContext } from "react";
import axios from "axios";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import "./styles/AddUserForm.css";
const AddUserForm = ({ isFormOpen, closeForm }) => {
  const { darkMode } = React.useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("homebuyer");
  const [agency, setAgency] = useState("");
  const [license_number, setLicenseNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      alert(
        `Username: ${username}\nFirst Name: ${firstname}\nLast Name: ${lastname}\nPhone: ${phone}\nEmail: ${email}\nPassword: ${password}\n`
      );

      const response = await axios.post("http://127.0.0.1:8080/signup", {
        username,
        password,
        userRole,
        firstname,
        lastname,
        email,
        phone,
        agency,
        license_number,
      });

      if (response.status === 200) {
        alert("User added");
        console.log(response);
      } else {
        console.log(response);
        console.log("Failed to add user");
      }
    } catch (err) {
      alert(err.message + "\n" + err.response.data.message);
      console.log("Error adding user");
      console.error(err);
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form add-user-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img
            src={darkMode ? xIconDark : xIcon}
            alt="close"
            className="close-button-x"
          />
        </button>
        <h2 className="add-new-user">Add New User</h2>

        <div className="form-element-role centered-select">
          <select
            name="userRole"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
            className="roleSelect"
          >
            <option value="homebuyer">Home Buyer</option>
            <option value="renter">Renter</option>
            <option value="broker">Broker</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {userRole === "broker" && (
          <>
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
          </>
        )}
        <div className="button-container">
          <button type="submit" className="submit add">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
