import React from "react";
import "../styles/HomeCard.css";

const HomeCard = () => {
  return (
    <>
      <div className="home-main-container">
        <div className="home-main-container-title">
          <div className="main-title">
            <span>Problems</span>
          </div>
          <div className="search-bar">
            <div className="search-icon">
              <i className="fa-solid fa-magnifying-glass" />
            </div>
            <input
              type="text"
              name="searchitem"
              placeholder="Search"
              className="search-container"
            />
            <div className="search-button">
              <button type="submit">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </div>
        <div className="home-main-container-body"></div>
      </div>
    </>
  );
};

export default HomeCard;
