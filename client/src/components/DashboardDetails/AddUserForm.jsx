import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ isFormOpen, closeForm }) => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState("homebuyer");

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
        phone
      });

      if (response.status === 200) {
        alert('User added');
        console.log(response);
      } else {
        console.log(response);
        console.log('Failed to add user');
      }
    } catch (err) {
      alert(err.message + "\n" + err.response.data.message);
      console.log('Error adding user');
      console.error(err);
    }
  };

  return (
    <div className={isFormOpen ? 'show' : 'hide'}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm}>Close</button>
        <h2>Add New User</h2>

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

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="text"
          value={phone}
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
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
