import React, { useState } from 'react'
import template from '../../assets/slideshow-template.jpg'
import './DetailedCard.css'
import bedIcon from "../../assets/bed.svg";
import bathIcon from "../../assets/bath.svg";
import rulerIcon from "../../assets/ruler.svg";


const DetailedCard = ({ property }) => {

    const { images, title, price, address, description, bedrooms, bathrooms, size, broker } = property;
    const [activeTab, setActiveTab] = useState('description');


    return (

        <div className="details">
            <div className="left-side">

                <div className="images"><img src={images} alt="placeholder" className='images' /></div>
                <div className="info">
                    <h2 className='title'>{title}</h2>
                    <p className='address'>{address}</p>
                </div>

                <div className="tabs">
                    <div className="property-tabs">
                        <button
                            className={activeTab === 'description' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={activeTab === 'broker' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('broker')}
                        >
                            Broker
                        </button>
                        <button
                            className={activeTab === 'map' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('map')}
                        >
                            Map
                        </button>
                    </div>
                    <div className="property-details">
                        {activeTab === 'description' && <p>{description}</p>}
                        {activeTab === 'broker' && <p>{broker}</p>}
                        {activeTab === 'map' && <p>{address}</p>}
                    </div>

                </div>



                <b>Features</b>
                <div className="property-features">

                    <div className="feature">
                        <img className="card-icon" src={bedIcon} alt="Bed Icon" />
                        <span className="icon-number">{bedrooms}</span>
                    </div>
                    <div className="feature">
                        <img className="card-icon" src={bathIcon} alt="Bath Icon" />
                        <span className="icon-number">{bathrooms}</span>
                    </div>
                    <div className="feature">
                        <img className="card-icon" src={rulerIcon} alt="Ruler Icon" />
                        <span className="icon-number">{size} sq ft</span>
                    </div>
                </div>
            </div>


            <div className="right-side">
                <h2 className='price'>{price}</h2>
                <button className="offer">Make an offer</button>
                <button className="visit">Request a visit</button>
            </div>
        </div>
    )
}

export default DetailedCard