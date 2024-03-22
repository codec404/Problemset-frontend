import React, { useContext } from "react";
import HomeNavBar from "./HomeNavBar";
import { UserContext } from "../context/UserContext";

const ProfileCard = ({ ...props }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      {props.description === "userInfo" ? (
        <div className="profile-body">
          <div className="profile-pic-container">
            <i className="fa-solid fa-circle-user" />
          </div>
          <div className="profile-details-container">
            <div className="user-header">USER DETAILS</div>
            <div className="user-detail user-name">
              <i className="fa-solid fa-id-card" />
              &nbsp; Username :{" "}
              <span className="user-data">{currentUser.username}</span>
            </div>
            <div className="user-detail user-email">
              <i className="fa-solid fa-envelope" />
              &nbsp; Email ID:{" "}
              <span className="user-data">{currentUser.email}</span>
            </div>
            <div className="user-detail user-role">
              <i className="fa-solid fa-user-tie" />
              &nbsp; Admin:{" "}
              <span className="user-data">
                {currentUser.isAdmin === true ? "Yes" : "No"}
              </span>
            </div>
            <div className="user-detail user-location">
              <i className="fa-solid fa-location-dot" />
              &nbsp;&nbsp;&nbsp;Location :{" "}
              <span className="user-data">{currentUser.location}</span>
            </div>
            <div className="user-detail user-affiliation">
              <i className="fa-solid fa-graduation-cap" />
              &nbsp; Affiliation :{" "}
              <span className="user-data">{currentUser.affiliation}</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileCard;
