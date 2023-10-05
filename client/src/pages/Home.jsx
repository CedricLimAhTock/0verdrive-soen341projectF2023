import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles/Home.css'
import searchIcon from "./assets/🦆 icon _search_.svg";
import bedIcon from "./assets/bed.svg";
import bathIcon from "./assets/bath.svg";
import rulerIcon from "./assets/ruler.svg";
import saveIcon from "./assets/🦆 icon _bookmark_.svg";
import homeImg from "./assets/pexels-fomstock-com-1115804 1.svg"

const Home = () => {
  return (
    <div className = "main-content">
      <div className = "search-container">
        <div className = "search-container-text">We lorem your home!</div>
        <div className = "search-container-searchbox">
          <input className = "searchbar" type = "text" placeholder = "Search for an IDK..."/>
          <img className = "search-icon" src = {searchIcon}></img>
        </div>
      </div>
      <div className = "explore-container">
        <div className = "explore-conatiner-text1"><h1>Recent Listings</h1></div>
        <div className = "explore-conatiner-text2">Explore our newest listing below!</div>
        <div className = "explore-container-buttons">
          <NavLink className = "button">Buy</NavLink>
          <NavLink className = "button">Rent</NavLink>
        </div>
      </div>
      <div className = "listing-container">
          <div className = "listing-container-card">
            <div className = "card-img"><img className = "card-img" src = {homeImg}></img></div>
            <div className = "card-save"></div>
            <div className = "card-info">
              <div className = "card-price">$ 100,000<img className = "save-icon" src = {saveIcon}></img></div>
              <div className = "card-adress">1849 Avenue Lincoln</div>
            </div>
            <div className="card-icons">
              <div className="icon-with-number">
                <img className="card-icon" src={bedIcon} alt="Bed Icon"></img>
                <span className="icon-number">3</span>
              </div>
              <div className="icon-with-number">
                <img className="card-icon" src={bathIcon} alt="Bath Icon"></img>
                <span className="icon-number">2</span>
              </div>
              <div className="icon-with-number">
                 <img className="card-icon" src={rulerIcon} alt="Ruler Icon"></img>
                 <span className="icon-number">14,500 m&sup2;</span>
              </div>
            </div>
          </div>
          <div className = "listing-container-card">
            <div className = "card-img"><img className = "card-img" src = {homeImg}></img></div>
            <div className = "card-save"></div>
            <div className = "card-info">
              <div className = "card-price">$ 100,000<img className = "save-icon" src = {saveIcon}></img></div>
              <div className = "card-adress">1849 Avenue Lincoln</div>
            </div>
            <div className="card-icons">
              <div className="icon-with-number">
                <img className="card-icon" src={bedIcon} alt="Bed Icon"></img>
                <span className="icon-number">3</span>
              </div>
              <div className="icon-with-number">
                <img className="card-icon" src={bathIcon} alt="Bath Icon"></img>
                <span className="icon-number">2</span>
              </div>
              <div className="icon-with-number">
                 <img className="card-icon" src={rulerIcon} alt="Ruler Icon"></img>
                 <span className="icon-number">14,500 m&sup2;</span>
              </div>
            </div>
          </div>
          <div className = "listing-container-card">
            <div className = "card-img"><img className = "card-img" src = {homeImg}></img></div>
            <div className = "card-save"></div>
            <div className = "card-info">
              <div className = "card-price">$ 100,000<img className = "save-icon" src = {saveIcon}></img></div>
              <div className = "card-adress">1849 Avenue Lincoln</div>
            </div>
            <div className="card-icons">
              <div className="icon-with-number">
                <img className="card-icon" src={bedIcon} alt="Bed Icon"></img>
                <span className="icon-number">3</span>
              </div>
              <div className="icon-with-number">
                <img className="card-icon" src={bathIcon} alt="Bath Icon"></img>
                <span className="icon-number">2</span>
              </div>
              <div className="icon-with-number">
                 <img className="card-icon" src={rulerIcon} alt="Ruler Icon"></img>
                 <span className="icon-number">14,500 m&sup2;</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home

