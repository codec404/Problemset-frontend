import React, { useState } from "react";
import "../styles/AdminProblem.css";
import { useNavigate } from "react-router-dom";
import ProblemList from "./ProblemList";
import { Input } from "antd";

const HomeCard = () => {
  const navigate = useNavigate();
  const handleAddProblem = () => {
    navigate("/add-new-problem");
  };
  return (
    <>
      <div className="home-main-container">
        <div className="home-main-container-title">
          <div className="main-title">
            <span>HUNT Problems</span>
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
        <div className="home-main-container-body">
          <div className="filtertags-container">
            <div className="filter-title">Filter</div>
            <div className="filterBody">
              <div className="filterTags filterOptions">
                <label htmlFor="filterTags">Tags</label>
                <Input />
              </div>
              <div className="filterOptions filterDifficulty">
                <label htmlFor="filterDifficulty">Difficulty</label>
                <Input />
              </div>
            </div>
          </div>
          <div className="add-new-problem">
            <button className="add-new-btn" onClick={handleAddProblem}>
              <span>+</span>Add Problem
            </button>
          </div>
          <ProblemList />
        </div>
      </div>
    </>
  );
};

export default HomeCard;
