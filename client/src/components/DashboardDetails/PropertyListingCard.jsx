import React from 'react'

const PropertyListingCard = ({ data, expanded, toggleExpand }) => {

    const { type, name, address, price, image } = data;

    const expand = () => {
        toggleExpand();
        console.log('expand')
    }

    return (
        <div className="property-listing-card" onClick={() => expand(event)}>
            <div className="property-detail-card">
                <div className="property-type">{type}</div>
                <div className="property-name">{name}</div>
                <div className="property-address">{address}</div>
                <div className="property-price">{price}</div>
                {/* <div className="property-image">{image}</div> */}

            </div>
        </div>
    )
}

export default PropertyListingCard