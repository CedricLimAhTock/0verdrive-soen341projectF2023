import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PropertyForm = ({ isFormOpen, data, closeForm }) => {

    const [title, setTitle] = useState(data.title || '');
    const [type, setType] = useState(data.property.property_type || '');
    const [address, setAddress] = useState(data.property.address || '');
    const [price, setPrice] = useState(data.property.price || '');

    const handleSubmit = async (event, action) => {
        event.preventDefault();

        if (action === 'edit') {
          try {
            const response = await axios.put(`http://127.0.0.1:8080/listing/${data.id}`, {
              title: title.toString(),
            });

            if (response.status === 200) {
              alert('Updated');
              console.log(response);
            } else {
            alert(response);
              console.log(response);
              console.log('Failed to update');
            }
          } catch (err) {
            alert(err);
            console.log('Error updating');
            console.error(err);
          }
        } else if (action === 'delete') {
          try {
            const response = await axios.delete(`http://127.0.0.1:8080/listing/${data.id}`);

            if (response.status === 200) {
              alert('Deleted');
              console.log(response);
            } else {
              alert(response);
              console.log('Failed to delete');
            }
          } catch (err) {
            alert(err);
            console.log('Error deleting');
            console.error(err);
          }
        }
    };




    return (
        <div className={isFormOpen ? 'show' : 'hide'}>
            <form className="popup-form" onSubmit={handleSubmit}>

                <button onClick={closeForm}>Close</button>
                <h2>Property Information</h2>


                <label htmlFor='type'>Title</label>
                <input
                    id='type'
                    type='text'
                    value={title}
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor='type'>Type</label>
                <input
                    id='type'
                    type='text'
                    value={type}
                    placeholder='Type'
                    onChange={(e) => setType(e.target.value)}
                />

                <label htmlFor='address'>Address</label>
                <input
                    id='address'
                    type='text'
                    value={address}
                    placeholder='Address'
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor='price'>Price</label>
                <input
                    id='price'
                    type='text'
                    value={`$ ${price}`}
                    placeholder='Price'
                    onChange={(e) => setPrice(e.target.value)}
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

export default PropertyForm