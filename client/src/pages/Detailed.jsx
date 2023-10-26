import React from 'react'
import DetailedCard from '../components/DetailedCard/DetailedCard'
import homeImg from '../assets/slideshow-template.jpg'
import { useLocation } from "react-router-dom";

const Detailed = (decodedToken) => {
  const location = useLocation();
  const property = location.state.property;

  return (
    <div>
        <DetailedCard property={property} token={decodedToken}/>
    </div>
  )
}

export default Detailed