import React from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";

const Register = () => {
  return (
    <>
      <NavBar home="Home" about="About" contact="Contact Us" />
      <Card current="register" />
    </>
  );
};

export default Register;
