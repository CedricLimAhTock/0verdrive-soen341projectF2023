import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ isFormOpen, data, closeForm }) => {
  const [firstname, setFirstName] = useState(data.user.firstname || "");
  const [lastname, setLastName] = useState(data.user.lastname || "");
  const [phone, setPhone] = useState(data.user.phone || "");
  const [email, setEmail] = useState(data.user.email || "");

  const handleSubmit = async (event, action) => {
    event.preventDefault();

    console.log(data);

    if (action === "edit") {
      try {
        console.log(firstname);
        console.log(lastname);
        console.log(phone);
        console.log(email);
        
        const response = await axios.put(
          `http://127.0.0.1:8080/user/${data.user_id}`,
          {
            username: data.user.username,
            fistname: firstname.toString(),
            lastname: lastname.toString(),
            email: email.toString(),
            phone: phone.toString(),
          }
        );

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
    } else if (action === "delete") {
      try {
        let response = await axios.delete(`http://127.0.0.1:8080/user/${data.user_id}`);

        // delete associated broker when user is deleted. should then also delete all properties :/
        await axios.delete(`http://127.0.0.1:8080/broker/${data.id}`);

        if (response.status === 200) {
          alert("Deleted");
          console.log(response);
        } else {
          console.log(response);
          console.log("Failed to delete");
        }
      } catch (err) {
        console.log("Error deleting");
        console.error(err);
      }
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm}>Close</button>
        <h2>Selected User Information</h2>

        <label htmlFor="name">First Name</label>
        <input
          id="firstname"
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="name">Last Name</label>
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

        <div className="button-container">
          <button
            type="submit"
            className="submit edit"
            onClick={(e) => handleSubmit(e, "edit")}
          >
            Update
          </button>
          <button
            type="submit"
            className="submit delete"
            onClick={(e) => handleSubmit(e, "delete")}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
