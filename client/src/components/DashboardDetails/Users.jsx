import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserListingCard from './UserListingCard';
import './styles/Users.css';
import UserForm from './UserForm';
import AddUserForm from './AddUserForm';

const Users = ({ token }) => {
  const [userData, setUserData] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const toggleExpand = (userData) => {
    setSelectedUserData(userData);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/broker')
      .then((res) => {
        setUserData(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log('Error in Users.jsx ', error);
      });
  }, []); // Use an empty dependency array to fetch data only once on component mount

  return (
    <div className='listings'>
      <div className="user-count">
        <h2>All users</h2>
        <div className="users-right">
          <p>{userData.length} users</p>
          <button className="add-user" onClick={() => setAddFormOpen(true)}>
            Add User
          </button>
        </div>
      </div>
      <div className="brokers-header">
        <div className="header-name">Name</div>
        <div className="header-join">Username</div>
        <div className="header-email">Email</div>
      </div>

      <div className="brokers-cards">
        {userData.map((user, index) => (
          <UserListingCard
            key={index}
            data={user}
            toggleExpand={() => toggleExpand(user)}
          />
        ))}
      </div>

      {isFormOpen && selectedUserData && (
        <UserForm
          username={selectedUserData.username}
          isFormOpen={isFormOpen}
          closeForm={closeForm}
          data={selectedUserData}
        />
      )}

      {isAddFormOpen && (
        <AddUserForm
          isFormOpen={isAddFormOpen}
          closeForm={() => setAddFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Users;
