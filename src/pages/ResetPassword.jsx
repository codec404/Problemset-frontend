import React from 'react'
import NavBar from "../components/NavBar";
import Card from "../components/Card";

const ResetPassword = () => {
  return (
    <>
      <NavBar home="Home" about="About" contact="Contact Us" />
      <Card current="reset-password" />
    </>
  )
}

export default ResetPassword
