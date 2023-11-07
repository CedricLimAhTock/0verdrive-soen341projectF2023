import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DashboardDetails/styles/Users.css';
import jwt_decode from 'jwt-decode';
import Carousel from '../Carousel/Carousel';
import './OfferForm.css';
import profileIcon from '../../assets/profile-picture.png';

const VisitForm = ({ isFormOpen, closeForm, property, brokerInfo }) => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [addressUser, setAddressUser] = useState('');
  const [priceOffered, setPriceOffered] = useState('');

  const [decodedToken, setDecodedToken] = React.useState(null);
  const { images, price, street, city, province, country} = property;
  const address = `${street}, ${city}, ${province}, ${country}`;

  const { firstname, lastname, phone, email } = brokerInfo.user;

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }
    console.log(brokerInfo);
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/offer/', {
        parent_id: decodedToken.id.toString(),
        broker_id: brokerInfo.user.id.toString(),
        user_id: decodedToken.id.toString(),
        property_id: property.id.toString(),
        price: priceOffered.toString(),
        status: 'wait',
      });

      if (response.status === 200) {
        alert('Form submitted');
        console.log(response);
      } else {
        console.log(response);
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
      <form className="offer-form popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className='close-button'>Close</button>
        <h2>Make an offer</h2>
        <div className="offer-container">
          <div className="offer-left">
            <Carousel images={images} className="offer-carousel" />
            <div className="property-info">
              <h3>Price: ${price}</h3>
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

            <label htmlFor="phone">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={addressUser}
              placeholder="Address"
              onChange={(e) => setAddressUser(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={userEmail}
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />

            <br />

            <label htmlFor="propertyAddress">Property address</label>
            <input
              id="propertyAddress"
              type="text"
              value={address}
              placeholder="Address"
              readOnly
            />

            <label htmlFor="priceOffered">Price Offered</label>
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
