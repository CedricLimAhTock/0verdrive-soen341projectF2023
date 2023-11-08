import React, { useState } from 'react';

const PropertyAddForm = ({ isFormOpen, closeForm, onAddProperty }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProperty = {
      name,
      type,
      address,
      price,
    };

    onAddProperty(newProperty);
    setName('');
    setType('');
    setAddress('');
    setPrice('');
  };

  return (
    <div className={isFormOpen ? 'show' : 'hide'}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm}>Close</button>
        <h2>Add Property</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="type">Type</label>
        <input
          id="type"
          type="text"
          value={type}
          placeholder="Type"
          onChange={(e) => setType(e.target.value)}
          required
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="button-container">
          <button type="submit" className="submit add">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
