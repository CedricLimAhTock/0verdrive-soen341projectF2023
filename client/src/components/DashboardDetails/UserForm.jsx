import React, { useState, useEffect } from 'react';

const UserForm = ({ isFormOpen, data, closeForm }) => {

    const [name, setName] = useState(data.name || '');
    const [dateJoined, setDateJoined] = useState(data.dateJoined ||'');
    const [address, setAddress] = useState(data.address ||'');
    const [noOfListings, setNoOfListings] = useState(data.noOfListings ||'');
    const [email, setEmail] = useState(data.email ||'');

    const handleSubmit = async (event, action) => {
        event.preventDefault();

        // if (action === 'edit') {
        //   try {
        //     const response = await axios.put(`http://localhost:5555/events/${id}`, {
        //       title: title.toString(),
        //       description: description.toString(),
        //       date: date,
        //     });

        //     if (response.status === 200) {
        //       alert('Updated');
        //       console.log(response);
        //     } else {
        //       console.log(response);
        //       console.log('Failed to update');
        //     }
        //   } catch (err) {
        //     console.log('Error updating');
        //     console.error(err);
        //   }
        // } else if (action === 'delete') {
        //   try {
        //     const response = await axios.delete(`http://localhost:5555/events/${id}`);

        //     if (response.status === 204) {
        //       alert('Deleted');
        //       console.log(response);
        //     } else {
        //       console.log(response);
        //       console.log('Failed to delete');
        //     }
        //   } catch (err) {
        //     console.log('Error deleting');
        //     console.error(err);
        //   }
        // }
    };




    return (
        <div className={isFormOpen ? 'show' : 'hide'}>
            <form className="popup-form" onSubmit={handleSubmit}>

                <button onClick={closeForm}>Close</button>
                <h2>Selected User Information</h2>

                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='dateJoined'>Date Joined</label>
                <input
                    id='dateJoined'
                    type='text'
                    value={dateJoined}
                    placeholder='Date Joined'
                    onChange={(e) => setDateJoined(e.target.value)}
                />

                <label htmlFor='address'>Address</label>
                <input
                    id='address'
                    type='text'
                    value={address}
                    placeholder='Address'
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor='noOfListings'>Listings</label>
                <input
                    id='noOfListings'
                    type='text'
                    value={noOfListings}
                    placeholder='Listings'
                    onChange={(e) => setNoOfListings(e.target.value)}
                />

                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />


                <div className="button-container">
                    <button
                        type="submit"
                        className="submit edit"
                        onClick={(e) => handleSubmit(e, 'edit')}
                    >
                        Update
                    </button>
                    <button
                        type="submit"
                        className="submit delete"
                        onClick={(e) => handleSubmit(e, 'delete')}
                    >
                        Delete
                    </button>
                </div>
            </form>

        </div>
    )
}

export default UserForm