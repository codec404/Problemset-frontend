import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Modal, message } from "antd";

const GetUsers = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState({});
  const [toBeDeletedUname, setToBeDeletedUname] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleUserDelete();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [allUser, setAllUser] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const { currentUser } = useContext(UserContext);
  const fetchAllUsers = async () => {
    const res = await axios.get("/api/v1/auth/get-all-users");
    if (res?.data?.success) {
      setAllUser(res?.data?.allUsers);
    }
  };
  const fetchAdmins = async () => {
    const res = await axios.get("/api/v1/auth/get-admins-only");
    if (res?.data?.success) {
      setAllAdmin(res?.data?.allAdmins);
    }
  };

  const handleUserDelete = async () => {
    try {
      console.log(toBeDeleted._id);
      const res = await axios.delete(
        `/api/v1/auth/delete-user/${toBeDeleted._id}`
      );
      if (res?.data?.success) {
        message.success(`${toBeDeletedUname} removed successfully`);
      }
    } catch (error) {
      console.log(error);
      message.error("Couldn't delete user");
    }
  };
  const handleAdminDelete = () => {};
  useEffect(() => {
    fetchAllUsers();
    fetchAdmins();
  }, []);
  return props.about === "allUsers" ? (
    <>
      <div className="container-header">
        <div className="user-icon-holder"></div>
        <div className="username-holder">Username</div>
        <div className="userLocation-holder">Location</div>
        <div className="userAffiliation-holder">Affiliation</div>
      </div>
      {allUser.map((item, index) => (
        <div
          className={`user-brief-container ${index % 2 === 0 ? "odd" : ""}`}
          key={index}
        >
          <div className="user-icon">
            <i className="fa-solid fa-circle-user" />
          </div>
          <div className="user-userName">{item.username}</div>
          <div className="user-userLocation">{item.location || "-"}</div>
          <div className="user-userAffiliation">{item.affiliation || "-"}</div>
          {currentUser._id === item._id ? (
            <></>
          ) : (
            <div className="removeUser">
              <button
                className="remove-btn"
                onClick={() => {
                  showModal();
                  setToBeDeleted(item);
                  setToBeDeletedUname(item.username);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      <Modal
        title="Confirm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to remove {toBeDeletedUname}?</p>
      </Modal>
    </>
  ) : (
    <>
      <div className="container-header">
        <div className="user-icon-holder"></div>
        <div className="username-holder">Username</div>
        <div className="userLocation-holder">Location</div>
        <div className="userAffiliation-holder">Affiliation</div>
      </div>
      {allAdmin.map((item, index) => (
        <div
          className={`user-brief-container ${index % 2 === 0 ? "odd" : ""}`}
          key={index}
        >
          <div className="user-icon">
            <i className="fa-solid fa-user-lock" />
          </div>
          <div className="user-userName">{item.username}</div>
          <div className="user-userLocation">{item.location || "-"}</div>
          <div className="user-userAffiliation">{item.affiliation || "-"}</div>
          {currentUser._id === item._id ? (
            <></>
          ) : (
            <div className="removeUser">
              <button className="remove-btn" onClick={handleAdminDelete}>
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default GetUsers;
