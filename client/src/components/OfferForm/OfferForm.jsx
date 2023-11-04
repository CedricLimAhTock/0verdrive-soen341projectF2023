import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DashboardDetails/styles/Users.css';
import jwt_decode from 'jwt-decode';
import Carousel from '../Carousel/Carousel';
import './OfferForm.css';

const VisitForm = ({ isFormOpen, closeForm, property, address }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brokerInfo, setBrokerInfo] = useState(null);
  const [priceOffered, setPriceOffered] = useState('');

  const deed = Date.now();
  const occupancy = Date.now();




  const { images, price, broker, id } = property;
  const [decodedToken, setDecodedToken] = React.useState(null);

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }

    fetchData();

    axios.get(`http://127.0.0.1:8080/broker/property/${id}`)
      .then((response) => {
        setBrokerInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching broker information:', error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/offer/', {
        user_id: decodedToken.id.toString(),
        property_id: id.toString(),
        price_offered: priceOffered.toString(),
        deed: deed.toString(),
        occupancy: occupancy.toString(),
        status: 'requested',
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
      <form className="visit-form popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className='close-button'>Close</button>
        <h2>Offer Form</h2>
        <div className="left-right-offer">
          <div className="left-offer">
            <Carousel images={images} className="carousel-offer" />
            <div className="property-info-offer">
              <h3>Price: ${price}</h3>
              <h4>Address: {address}</h4>
              <p>BrokerID: {brokerInfo.id}</p>
              <p>ID: {id}</p>
            </div>
          </div>
          <div className="right-offer">
            
          <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              id="address"
              value={address}
              placeholder="Adress of property"
              readOnly
            />

            <label htmlFor="priceOffered">Price offered</label>
            <input
              id="priceOffered"
              type="number"
              value={priceOffered}
              placeholder="Price offered"
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
