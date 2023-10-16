import React from 'react'
import './styles/Users.css'

const UserListingCard = ({ data, expanded, toggleExpand }) => {

    const { name, dateJoined, address, noOfListings, email} = data;

    const expand = () => {
        toggleExpand();
        console.log('expand')
    }
    

    return (
        <div className="whole-card" onClick={() => expand(event)}>
            <div className="broker-detail-card">
                <div className="broker-name">{name}</div>
                <div className="broker-join">{dateJoined}</div>
                <div className="broker-address">{address}</div>
                <div className="broker-listings">{noOfListings}</div>
                <div className="broker-email">{email}</div>

            </div>
            {expanded && (
                <div className="expanded-content">
                    <h1>Expanded Content</h1>
                </div>
            )}
        </div>
    );
}

export default UserListingCard