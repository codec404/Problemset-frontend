import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import countries from "../assets/Data/Countries";
import video from "../assets/videos/stockvideo.mp4";
import image from "../assets/images/stockimage.svg";
import image2 from "../assets/images/10332256_4412010.svg";
import loginImg from "../assets/images/Code typing2.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const Card = ({ ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [changeContent, setChangeContent] = useState(null);

  // REGISTER
  const handleRegister = async (values) => {
    try {
      if (checked) values.isAdmin = true;
      else values.isAdmin = false;
      // console.log(values);
      const res = await axios.post("/api/v1/auth/register", values);
      if (res?.data?.success) {
        message.success("Successfully Registered");
        navigate("/login");
      } else {
        message.error(res?.data?.message);
      }
    } catch (error) {
      console.log("Error in React-Register");
      message.error("Something went wrong!!!");
    }
  };

  const handleLogin = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post("/api/v1/auth/login", values);
      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.token);
        message.success("Logged in successfully");
        navigate("/");
      } else {
        message.error(res?.data?.message);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        message.error("Wrong credentials");
      }
      console.log("Error in React-Login");
    }
  };

  const handleForgotPassword = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", values);
      if (res?.data?.success) {
        message.success(res?.data?.message);
        setChangeContent(
          "You have been sent a password reset link in the provided email"
        );
      } else {
        message.error(res?.data?.message);
        setChangeContent(res?.data?.message);
      }
    } catch (error) {
      if (error.response.status === 404) {
        message.error("User Not Found");
        setChangeContent("User Not Found");
      }
      console.log("Error in React Forgot Password");
    }
  };

  const checkAdmin = (e) => {
    if (!checked) {
      message.warning("You are registering as an admin!!!");
    }
    setChecked(e.target.checked);
  };

  //GOOGLE SIGN IN HANDLER

  const googleSignHandler = () => {};
  const loginSwitch = () => {
    if (location.pathname === "/register") {
      navigate("/login");
    }
  };
  const registerSwitch = () => {
    if (location.pathname === "/login") {
      navigate("/register");
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="landing-container">
          {props.current === "home" && (
            <>
              <div className="get-started">
                <h1>CodeHUNT</h1>
                <h3>Problemset</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Impedit dolor soluta perspiciatis omnis, sunt eos, molestias
                  delectus asperiores aspernatur quisquam temporibus tempore
                  tenetur voluptatem voluptate laboriosam vitae! Aut,
                  repudiandae adipisci.
                </p>
                <button
                  className="get-started-btn"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Get Started <i className="fa-solid fa-right-to-bracket" />
                </button>
              </div>
              <div className="stock-video">
                <video autoPlay muted loop src={video} />
              </div>
            </>
          )}
          {props.current === "about" && (
            <>
              <div className="get-started about">
                <h1>About Us</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  vero quisquam officiis necessitatibus alias distinctio,
                  explicabo impedit atque cumque possimus commodi est
                  praesentium molestiae facere quaerat eligendi nam ut!
                  Perspiciatis aperiam explicabo, sunt id cumque omnis
                  voluptate, accusamus amet reiciendis doloremque error
                  pariatur. Quod totam, cupiditate aliquid eaque tempora impedit
                  ut in placeat iste voluptatibus?
                </p>
                <button className="back" onClick={() => navigate("/")}>
                  <i className="fa-solid fa-arrow-left" />
                  <span className="back-txt">Back to home</span>
                </button>
              </div>
              <div className="stock-image">
                <img src={image} alt="banner" />
              </div>
            </>
          )}
          {props.current === "contact" && (
            <>
              <div className="get-started get-started-contact">
                <h1>Contact Us</h1>
                <ul>
                  <li>
                    <i className="fa-solid fa-phone" />
                    Mobile: <a href="tel:abc@hotmail.com">(+91)-0123456789</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope" />
                    E-Mail:{" "}
                    <a href="mailto:codehunt@gmail.com">codehunt@gmail.com</a>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin" />
                    LinkedIN: <a href="linkedin.com/abc">CodeHUNT-official</a>
                  </li>
                </ul>
                <button className="back" onClick={() => navigate("/")}>
                  <i className="fa-solid fa-arrow-left" />
                  <span className="back-txt">Back to home</span>
                </button>
              </div>
              <div className="stock-image-contact">
                <img src={image2} alt="banner" />
              </div>
            </>
          )}
          {props.current === "login" && (
            <>
              <div className="stock-image">
                <img src={loginImg} alt="loginImg" />
              </div>
              <div className="get-started-login">
                <div className="switch-buttons">
                  <div
                    className={`login-btn ${
                      location.pathname === "/login" ? "btn-active" : ""
                    }`}
                    onClick={loginSwitch}
                  >
                    <span>Login</span>
                  </div>
                  <div
                    className={`register-btn ${
                      location.pathname === "/register" ? "btn-active" : ""
                    }`}
                    onClick={registerSwitch}
                  >
                    <span>Register</span>
                  </div>
                </div>
                <Form
                  name="basic"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  onFinish={handleLogin}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username/Email"
                    name="usernameOrEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  {checked && (
                    <Form.Item
                      label="Pin"
                      name="pin"
                      rules={[
                        {
                          required: true,
                          message: "Please input your 6-digit pin!",
                        },
                      ]}
                    >
                      <Input.Password minLength={6} maxLength={6} />
                    </Form.Item>
                  )}
                  <span className="admin-forgot-password">
                    <Checkbox checked={checked} onChange={checkAdmin}>
                      Admin
                    </Checkbox>

                    <Link className="forgot-password" to={"/forgot-password"}>
                      Forgot Password
                    </Link>
                  </span>

                  <Form.Item
                    wrapperCol={{
                      offset: 2,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <div className="separator">
                  <span className="line line-left"></span>
                  <span className="separator-text">or</span>
                  <span className="line line-right"></span>
                </div>
                <button className="oauths" onClick={googleSignHandler}>
                  <div className="authIcon">
                    <img src={googleIcon} alt="googleIcon" />
                  </div>
                  <div className="auth-text">Sign In</div>
                </button>
                {location.pathname === "/login" ? (
                  <span className="redirect">
                    New User? <Link to={"/register"}>Sign Up</Link>
                  </span>
                ) : (
                  <span className="redirect">
                    Already a user? <Link to={"/login"}>Sign In</Link>
                  </span>
                )}
              </div>
            </>
          )}
          {props.current === "forgot-password" && (
            <>
              <div className="stock-image">
                <img src={loginImg} alt="loginImg" />
              </div>
              <div className="get-started-login">
                {!changeContent ? (
                  <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleForgotPassword}
                    autoComplete="off"
                  >
                    <div className="forgot-pass-title">
                      <span>Enter the registered email</span>
                    </div>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input className="forgot-pass-email" type="email" />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 2,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="forgot-pass-submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <div className="forgot-pass-confirmation">
                    <span>{changeContent}</span>
                  </div>
                )}
              </div>
            </>
          )}
          {props.current === "reset-password" && (
            <>
              <div className="stock-image">
                <img src={loginImg} alt="loginImg" />
              </div>
              <div className="get-started-login">
                <Form
                  name="basic"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  onFinish={handleLogin}
                  autoComplete="off"
                >
                  <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirm-password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 2,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          )}
          {props.current === "register" && (
            <>
              <div className="stock-image">
                <img src={loginImg} alt="loginImg" />
              </div>
              <div className="get-started-login">
                <div className="switch-buttons">
                  <div
                    className={`login-btn ${
                      location.pathname === "/login" ? "btn-active" : ""
                    }`}
                    onClick={loginSwitch}
                  >
                    <span>Login</span>
                  </div>
                  <div
                    className={`register-btn ${
                      location.pathname === "/register" ? "btn-active" : ""
                    }`}
                    onClick={registerSwitch}
                  >
                    <span>Register</span>
                  </div>
                </div>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  onFinish={handleRegister}
                  autoComplete="off"
                  className="reg-form"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email ID"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input type="email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Location"
                    name="location"
                    className="non-compulsory"
                  >
                    <Select
                      showSearch
                      placeholder="Select Location"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.value.toLowerCase() ?? "").includes(
                          input.toLowerCase()
                        )
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.value ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.value ?? "").toLowerCase())
                      }
                    >
                      {countries.map((items) => (
                        <Option value={items.name} key={items.code}></Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Affiliation"
                    name="affiliation"
                    className="non-compulsory"
                  >
                    <Input />
                  </Form.Item>
                  <span className="reg-admin-submit">
                    <Checkbox
                      checked={checked}
                      onChange={checkAdmin}
                      className="checkbox"
                    >
                      Admin
                    </Checkbox>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="reg-btn"
                      >
                        Register
                      </Button>
                    </Form.Item>
                  </span>
                </Form>
                <div className="separator">
                  <span className="line line-left"></span>
                  <span className="separator-text">or</span>
                  <span className="line line-right"></span>
                </div>
                <button className="oauths" onClick={googleSignHandler}>
                  <div className="authIcon">
                    <img src={googleIcon} alt="googleIcon" />
                  </div>
                  <div className="auth-text">Sign In</div>
                </button>
                {location.pathname === "/login" ? (
                  <span className="redirect">
                    New User? <Link to={"/register"}>Sign Up</Link>
                  </span>
                ) : (
                  <span className="redirect">
                    Already a user? <Link to={"/login"}>Sign In</Link>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
