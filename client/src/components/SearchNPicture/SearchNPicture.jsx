import React from "react";
import background from "./assets/background.png";
import "./SearchNPicture.css";
export default function SearchNPicture() {
  return (
    <div className="searchNPicture">
      <div className="pic">
        <img src={background} />
      </div>
      <div className="stuff">
        <h1>We lorem your home!</h1>
        <input
          type="search"
          placeholder="Search for an IDK"
          className="search"
        />
      </div>
    </div>
  );
}
