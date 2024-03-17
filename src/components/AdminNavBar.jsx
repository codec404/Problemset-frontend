import React, { useContext, useEffect, useState } from "react";
import "../styles/HomeNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { Dropdown, Space, message } from "antd";

const AdminNavBar = ({ children }) => {
  const { theme, handleClick } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clientId, setClientId] = useState(null);
  const fetchUser = async () => {
    try {
      if (localStorage.getItem("token") === "demo") {
        const res = await axios.get("http://localhost:8080/login/success", {
          withCredentials: true,
        });
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.token + "demo");
          setUser(res?.data?.user.username.split(" ")[0]);
          setClientId(res?.data?.user._id);
        }
      } else {
        const res = await axios.get("/api/v1/auth/current-user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (res?.data?.success) {
          setUser(res?.data?.user.username);
          setClientId(res?.data?.user._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("token")) {
        if (!localStorage.getItem("token").includes("demo")) {
          localStorage.removeItem("token");
          message.success("Logged Out Successfully");
          navigate("/login");
        } else {
          const res = await axios.get("http://localhost:8080/googleLogout", {
            withCredentials: true,
          });
          if (res?.data?.success) {
            localStorage.removeItem("token");
            message.success("Logged Out Successfully");
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: (
        <Link to={`/profile/${clientId}`}>
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
        <span className="logout" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket dropdown-icon" />
          Logout
        </span>
      ),
      key: "2",
    },
  ];

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
            <li>
              <span className="welcome-user">Welcome, {user}</span>
            </li>
            <li>
              <Link to="/problems" className="problems">
                Problems
              </Link>
            </li>
            <li>
              <Link to="/users-list" className="users_list">
                Users
              </Link>
            </li>
            <li>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
};

export default AdminNavBar;
