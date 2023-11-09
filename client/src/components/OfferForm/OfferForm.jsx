import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DashboardDetails/styles/Users.css';
import jwt_decode from 'jwt-decode';
import Carousel from '../Carousel/Carousel';
import './OfferForm.css';
import profileIcon from '../../assets/profile-picture.png';
import xIcon from "../../assets/xIcon.svg"

const VisitForm = ({ isFormOpen, closeForm, property, broker }) => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [addressUser, setAddressUser] = useState('');
  const [priceOffered, setPriceOffered] = useState('');

  const [decodedToken, setDecodedToken] = React.useState(null);
  const { images, price, street, city, province, country} = property;
  const address = `${street}, ${city}, ${province}, ${country}`;

  const { firstname, lastname, phone, email } = broker.user;

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

    const broker = await axios.get(`http://localhost:8080/listing/property/${property.id}`);
    console.log(broker.data[0]);
    console.log(broker.data[0].broker_id);
    try {
      const response = await axios.post('http://127.0.0.1:8080/offer', {
        parent_id: decodedToken.broker_id.toString(),
        broker_id: broker.data[0].broker_id.toString(),
        user_id: decodedToken.id.toString(),
        property_id: property.id.toString(),
        price: priceOffered.toString(),
        status: 'wait',
      });

      if (response.status === 200) {
        alert('Form submitted');
        console.log(response);
      } else {
        alert(response);
        console.log('Failed to submit form');
      }
    } catch (err) {
      alert(err.message);
      console.log('Error submitting form');
      console.error(err);
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img src = {xIcon} alt = "close" className="close-button-x" />
        </button>
        <div className="offer-container">
          <div className="offer-left"> <h2>Make an Offer</h2>
            <Carousel images={images} className="offer-carousel" />
            <div className="property-info">
              <h4>Price: ${price}</h4>
              <p>Address: {address}</p>
            </div>
            <div className="broker-info">
              <img src={profileIcon} className="offer-profilepic" />
              <div className="broker-detail">
                <p>{firstname} {lastname}</p>
                <p>{phone}</p>
                <p>{email}</p>
              </div>
            </div>
          </div>
          <div className="offer-right">
            <h4>Fill in the following information</h4>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              id="address"
              type="text"
              value={addressUser}
              placeholder="Address"
              onChange={(e) => setAddressUser(e.target.value)}
              required
            />
            <input
              id="email"
              type="email"
              value={userEmail}
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <input
              id="propertyAddress"
              type="text"
              value={address}
              placeholder="Address"
              readOnly
            />
            <input
              id="priceOffered"
              type="number"
              value={priceOffered}
              placeholder="Enter a price"
              onChange={(e) => setPriceOffered(e.target.value)}
              required
            />

            <div className="button-container">
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisitForm;
