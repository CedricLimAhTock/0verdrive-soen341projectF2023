import React, { useState, useRef, useEffect } from "react";
import "./styles/Profile.css";
import ProfilePicture from "../../assets/profile-picture.png";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Profile = ({ data, token }) => {
  const userToken = localStorage.getItem("jwtToken");
  const decodedToken = userToken ? jwt_decode(userToken) : null;

  const [userID, setUserID] = useState(decodedToken.id || "");
  const [username, setUsername] = useState(decodedToken.username || "");
  const [firstName, setFirstName] = useState(decodedToken.firstname || "");
  const [lastName, setLastName] = useState(decodedToken.lastname || "");
  const [email, setEmail] = useState(decodedToken.email || "");
  const [phone, setPhoneNumber] = useState(decodedToken.phone || "");
  const [address, setAddress] = useState(decodedToken.address || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/user/${userID}`, {
        firstname: firstName.toString(),
        lastname: lastName.toString(),
        email: email.toString(),
        phone: phone.toString(),
        address: address.toString(),
      });
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
  };

  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState();

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    // Fetch user info from the database after the component is mounted
    if (username) {
      axios
        .get(`http://localhost:8080/user/username/${username}`)
        .then((res) => {
          setFirstName(res.data.firstname);
          setLastName(res.data.lastname);
          setUsername(res.data.username);
          setEmail(res.data.email);
          setPhoneNumber(res.data.phone);
          setAddress(res.data.address);
        })
        .catch((error) => {
          console.log("Error in profile.jsx: ", error);
        });
    }
  }, [username]); // Add username as a dependency to run this effect when it changes

  return (
    <div className="profile">
      <div className="profile-card">
        <div onClick={handleImageClick}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            style={{ display: "none" }}
          />
          <img
            src={profilePic ? URL.createObjectURL(profilePic) : ProfilePicture}
            alt="profile-pic"
            className="profile-picture"
          />
        </div>
        <p className="username">{username}</p>
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                id="address"
              />
            </div>
          </div>
          <button className="profile-update" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
