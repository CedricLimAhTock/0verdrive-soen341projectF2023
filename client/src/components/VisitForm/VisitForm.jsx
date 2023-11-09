import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DashboardDetails/styles/Users.css";
import "./VisitForm.css";
import jwt_decode from "jwt-decode";
import xIcon from "../../assets/xIcon.svg";

const VisitForm = ({ isFormOpen, closeForm, property }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const password = "Wvu#YVZ5YKZPMd";

  const { images, price, address, broker } = property;
  const [decodedToken, setDecodedToken] = React.useState(null);

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
      alert(`Email: ${email}\nPhone: ${phone}\nMessage: ${message}`);
      const response = await axios.post("http://127.0.0.1:5173/visit/", {
        property_id: 2,
        client_id: 1,
        broker_id: 1,
        time: "2023-11-03T10:30:00",
        status: "requested",
        message: "Testing",
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
          <img src={xIcon} alt="close" className="close-button-x" />
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
