import React from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";

const Login = () => {
  return (
    <>
      <NavBar home="Home" about="About" contact="Contact Us" />
      <Card current="login" />
    </>
  );
};

export default Login;
