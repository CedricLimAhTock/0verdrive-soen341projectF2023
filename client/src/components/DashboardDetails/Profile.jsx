import React, { useState } from 'react';
import './styles/Profile.css';
import ProfilePicture from '../../assets/profile-picture.png'

const Profile = ({ data }) => {
  // Initialize state variables with data from the prop
  const [name, setName] = useState(data.name || '');
  const [username, setUsername] = useState(data.username || '');
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName || '');
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhoneNumber] = useState(data.phone || '');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='profile'>
      <div className="profile-card">
      <img src={ProfilePicture} alt="profile-pic" className="profile-picture" />
        <p className="name">{name}</p>
        <p className="username">@john.doe</p>
        <div className="seperator"></div>
        <p className="listings">Listings</p>
        {/*<span>{data.listings.length}</span>*/}
      </div>

      <div className="profile-details">
        <form onSubmit={handleSubmit} className="two-column-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                id="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                id="lastName"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(event) => setPhoneNumber(event.target.value)}
                id="phone"
              />
            </div>
          </div>
          <button className='profile-update' type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
