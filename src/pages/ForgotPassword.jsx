import React from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";

const ForgotPassword = () => {
  return (
    <>
      <NavBar home="Home" about="About" contact="Contact Us" />
      <Card current="forgot-password" />
    </>
  );
};

export default ForgotPassword;
