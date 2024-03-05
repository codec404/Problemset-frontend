import React, { useContext, useEffect, useState } from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: (
      <Link to="/profile">
        <i className="fa-regular fa-user dropdown-icon" />
        Profile
      </Link>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <span className="logout">
        <i className="fa-solid fa-arrow-right-from-bracket dropdown-icon" />
        Logout
      </span>
    ),
    key: "2",
  },
];
const Homepage = () => {
  const { theme, handleClick } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/auth/current-user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res?.data?.success) {
        setUser(res?.data?.user.username);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const modeChanger = () => {
    handleClick();
  };
  useEffect(() => {
    document.body.className = theme;
    fetchUser();
  }, [theme]);
  return (
    <>
      <nav className="home-nav">
        <Link to="/">
          <h1>CodeHUNT</h1>
        </Link>
        <div className="home-nav-menu">
          <ul className="navListHome">
            <li className="mode-changer" onClick={modeChanger}>
              <i className="fa-solid fa-circle-half-stroke" />
            </li>
            <li className="notify">
              <i className="fa-solid fa-bell" />
            </li>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="profile-container"
              >
                <li className="profile">
                  <i className="fa-regular fa-circle-user" />
                </li>
                <span className="username">{user}</span>
              </Link>
            </Dropdown>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Homepage;
