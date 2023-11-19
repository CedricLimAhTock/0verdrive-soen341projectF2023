import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../DashboardDetails/styles/Users.css";
import "./VisitForm.css";
import jwt_decode from "jwt-decode";
import xIcon from "../../assets/xIcon.svg";
import xIconDark from "../../assets/xIcon_darkMode.svg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
const VisitForm = ({ isFormOpen, closeForm, property }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { images, price, address, broker } = property;
  const [decodedToken, setDecodedToken] = React.useState(null);
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const broker = await axios.get(
        `http://localhost:8080/listing/property/${property.id}`
      );
      console.log(broker.data[0].broker_id);

      alert(`Email: ${email}\nPhone: ${phone}\nMessage: ${message}`);
      const response = await axios.post("http://127.0.0.1:8080/visit/", {
        property_id: property.id.toString(),
        client_id: decodedToken.id.toString(),
        broker_id: broker.data[0].broker_id.toString(),
        status: "requested",
        message: message.toString(),
      });

      if (response.status === 200) {
        alert("Form submitted");
        console.log(response);
      } else {
        console.log(response);
        console.log("Failed to submit form");
      }
    } catch (err) {
      alert(err.message);
      console.log("Error submitting form");
      console.error(err);
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
        <h2>Visit Form</h2>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="phone"
          type="tel"
          value={phone}
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          id="message"
          value={message}
          placeholder="Enter your message here"
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <div className="button-container">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitForm;
