import React, { useContext, useState } from "react";
import HomeNavBar from "../components/HomeNavBar";
import "../styles/Profile.css";
import ProfileCard from "../components/ProfileCard";
import { UserContext } from "../context/UserContext";

import AdminNavBar from "../components/AdminNavBar";

const Profile = () => {
  const [cardItem, setCardItem] = useState("userInfo");
  const handleDockChanger = (e) => {
    let str = e.target.innerText.toLowerCase();
    if (str === "user info") str = "userInfo";
    setCardItem(str);
  };
  const { currentUser } = useContext(UserContext);

  return localStorage.getItem("role") ? (
    <AdminNavBar>
      <div className="main-profile-container">
        <ul className="changer-dock">
          <li
            className={`dock-items ${
              cardItem === "userInfo" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            User Info
          </li>
          <li
            className={`dock-items ${
              cardItem === "contests" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            Contests
          </li>
          <li
            className={`dock-items ${
              cardItem === "problems" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            Problems
          </li>
        </ul>
        <ProfileCard description={cardItem} />
      </div>
    </AdminNavBar>
  ) : (
    <HomeNavBar>
      <div className="main-profile-container">
        <ul className="changer-dock">
          <li
            className={`dock-items ${
              cardItem === "userInfo" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            User Info
          </li>
          <li
            className={`dock-items ${
              cardItem === "contests" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            Contests
          </li>
          <li
            className={`dock-items ${
              cardItem === "problems" ? "dock-active" : ""
            }`}
            onClick={handleDockChanger}
          >
            Problems
          </li>
        </ul>
        <ProfileCard description={cardItem} />
      </div>
    </HomeNavBar>
  );
};

export default Profile;
