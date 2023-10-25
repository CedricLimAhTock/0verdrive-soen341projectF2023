import React from 'react'
import './styles/Users.css'

const UserListingCard = ({ data, expanded, toggleExpand }) => {

    const { firstName, lastName, createdAt, address, noOfListings, email} = data;

    const expand = () => {
        toggleExpand();
        console.log('expand')
    }
    

    return (
        <div className="whole-card" onClick={() => expand(event)}>
            <div className="broker-detail-card">
                <div className="broker-name">{firstName}</div>
                <div className="broker-join">{createdAt}</div>
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