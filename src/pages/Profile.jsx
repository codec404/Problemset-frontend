import React from "react";
import HomeNavBar from "../components/HomeNavBar";

const Profile = () => {
  return (
    <HomeNavBar>
      <div className="profile-pic-container">Image</div>
      <div className="profile-details-container">Content</div>
    </HomeNavBar>
  );
};

export default Profile;
