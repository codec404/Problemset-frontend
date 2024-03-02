import React from "react";
import "../styles/Card.css";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

const Landing = () => {
  const location = useLocation();
  return (
    <>
      <NavBar home="Home" about="About" contact="Contact Us" />
      {location.pathname === "/" ? (
        <Card current="home" />
      ) : location.pathname === "/about" ? (
        <Card current="about" />
      ) : (
        <Card current="contact" />
      )}
    </>
  );
};

export default Landing;
