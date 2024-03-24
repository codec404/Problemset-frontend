import React, { useState } from "react";
import "../styles/Users.css";
import GetUsers from "./GetUsers";

const Users = () => {
  const [cardItem, setCardItem] = useState("allUsers");
  const handleDockChanger = (e) => {
    const getDock = e.target.id;
    setCardItem(getDock);
  };
  return (
    <>
      <div className="main-users-container">
        <h1 className="users-header">
          <span>Users</span>
        </h1>
        <div className="users-body">
          <div className="users-options">
            <div
              className={`all-users users-option ${
                cardItem === "allUsers" ? "userActive" : ""
              }`}
              id="allUsers"
              onClick={handleDockChanger}
            >
              All Users
            </div>
            <div
              className={`all-users users-option ${
                cardItem === "admins" ? "userActive" : ""
              }`}
              id="admins"
              onClick={handleDockChanger}
            >
              Admins
            </div>
          </div>
          <div className="users-container">
            <GetUsers about={cardItem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
