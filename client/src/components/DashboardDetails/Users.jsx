import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserListingCard from './UserListingCard';
import './styles/Users.css';
import UserForm from './UserForm';

const Users = ({ token }) => {
  const [userData, setUserData] = useState([]); // State to store user data
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const toggleExpand = (userData) => {
    setSelectedUserData(userData);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    // Fetch user info from the API after the component is mounted
    axios
      .get('http://localhost:8080/user/')
      .then((res) => {
        setUserData(res.data); // Assuming the API response is an array of user data
      })
      .catch((error) => {
        console.log('Error in Users.jsx ', error);
      });
  }, []); // Use an empty dependency array to fetch data only once on component mount

  return (
    <div className='listings'>
      <div className="brokers-header">
        <div className="header-name">Name</div>
        <div className="header-join">Date joined</div>
        <div className="header-email">Email</div>
      </div>

      <div className="brokers-cards">
        {userData.map((userData, index) => (
          <UserListingCard
            key={index}
            data={userData}
            toggleExpand={() => toggleExpand(userData)}
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
    </div>
  );
};

export default Users;
