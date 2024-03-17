import React, { useContext, useEffect, useState } from "react";
import "../styles/NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const NavBar = ({ ...props }) => {
  const args = Object.keys(props);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, handleClick } = useContext(ThemeContext);

  const modeChanger = () => {
    handleClick();
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  //Login PAGE
  const redirectLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <nav className="navBar">
        <Link to={`/`}>
          <h1>CodeHUNT</h1>
        </Link>
        <div className="navMenu">
          <ul className="navList">
            <li className="mode-changer" onClick={modeChanger}>
              <i className="fa-solid fa-circle-half-stroke" />
            </li>
            {args.map((prop) => (
              <li
                key={prop}
                className={`menuItem ${
                  ((location.pathname === "/" && props[prop] === "Home") ||
                    location.pathname === "/" + props[prop].toLowerCase() ||
                    (location.pathname === "/contact" &&
                      props[prop] === "Contact Us")) &&
                  "active"
                }`}
              >
                <Link
                  to={
                    `/` +
                    (props[prop] === "Contact Us"
                      ? "contact"
                      : props[prop] === "Home"
                      ? ""
                      : props[prop].toLowerCase())
                  }
                >
                  {props[prop]}
                </Link>
              </li>
            ))}
          </ul>
          {location.pathname === "/login" ? (
            <></>
          ) : location.pathname === "/register" ? (
            <></>
          ) : (
            <button className="btn" onClick={redirectLogin}>
              Get Started <i className="fa-solid fa-right-to-bracket" />
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
