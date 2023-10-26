import React from 'react'
import PropertyCard from '../PropertyCard/PropertyCard'
import './styles/Favorites.css'

const Favorites = ({token}) => {

  const property = {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
      },
    ],
    price: "$1,000,000",
    address: "1234 Main St, San Diego, CA 92101",
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
  };

  return (
    <div className='favorites'>
      <div className="card-fav">
        <PropertyCard property={property} />
      </div>
      <div className="card-fav">
        <PropertyCard property={property} />
      </div>
      <div className="card-fav">
        <PropertyCard property={property} />
      </div>
      <div className="card-fav">
        <PropertyCard property={property} />
      </div>
      <div className="card-fav">
        <PropertyCard property={property} />
      </div>
    </div>
  )
}

export default Favorites