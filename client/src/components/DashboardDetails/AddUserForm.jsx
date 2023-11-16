import React, { useState } from 'react';
import axios from 'axios';
import xIcon from "../../assets/xIcon.svg";

const AddUserForm = ({ isFormOpen, closeForm }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10)); // Initialize createdAt as a formatted date string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      alert(
        `Username: ${username}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nPhone: ${phone}\nEmail: ${email}\nPassword: ${password}\nDate Joined: ${createdAt}`
      );

      const response = await axios.post('http://127.0.0.1:8080/user/', {
        username: username.toString(),
        password: password.toString(),
        firstName: firstName.toString(),
        lastName: lastName.toString(),
        phone: phone.toString(),
        email: email.toString(),
        createdAt, // Send the formatted date to the server
      });

      if (response.status === 200) {
        alert('User added');
        console.log(response);
      } else {
        console.log(response);
        console.log('Failed to add user');
      }
    } catch (err) {
      alert(err.message);
      console.log('Error adding user');
      console.error(err);
    }
  };

  return (
    <div className={isFormOpen ? 'show' : 'hide'}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className="close-button">
          <img src={xIcon} alt="close" className="close-button-x" />
        </button>
        <h2>Add New User</h2>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="firstName"
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          id="lastName"
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
          id="createdAt"
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
        <input
          id="password"
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
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
