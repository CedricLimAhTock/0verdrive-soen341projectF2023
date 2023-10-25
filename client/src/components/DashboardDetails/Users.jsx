import React, { useState } from 'react';
import UserListingCard from './UserListingCard';
import './styles/Users.css';
import UserForm from './UserForm';

const Users = ({token}) => {
  const data = [
    {
      name: "John Doe",
      dateJoined: "01/01/2021",
      address: "1234 Main St, San Diego, CA 92101",
      noOfListings: "3",
      email: "idk@gmail.com",
    },
    {
      name: "Susmita",
      dateJoined: "99/99/9999",
      address: "New York City, New York, U.S",
      noOfListings: "MILLIONS",
      email: "BRUHHHH@gmail.com",
    }
    // Add more booking data as needed
  ];

  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const toggleExpand = (index) => {
    console.log("expand1");
    setSelectedUserData(data[index]);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div className='listings'>
      <div className="brokers-header">
        <div className="header-name">Name</div>
        <div className="header-join">Date joined</div>
        <div className="header-address">Address</div>
        <div className="header-listings">Listings</div>
        <div className="header-email">Email</div>
      </div>

      <div className="brokers-cards">
        {data.map((userData, index) => (
          <UserListingCard
            key={index}
            data={userData}
            toggleExpand={() => toggleExpand(index)}
          />
        ))}
      </div>

      {isFormOpen && selectedUserData && (
        <UserForm
          isFormOpen={isFormOpen}
          closeForm={closeForm}
          data={selectedUserData}
        />
      )}
    </div>
  );
};

export default Users;
