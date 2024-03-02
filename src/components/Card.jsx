import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import video from "../assets/videos/stockvideo.mp4";
import image from "../assets/images/stockimage.svg";
import image2 from "../assets/images/10332256_4412010.svg";
import loginImg from "../assets/images/Code typing2.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Card = ({ ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  //GOOGLE SIGN IN HANDLER

  const googleSignHandler = () => {};

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
                    navigate("/auth");
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
          {(props.current === "login" || props.current === "register") && (
            <>
              <div className="stock-image">
                <img src={loginImg} alt="loginImg" />
              </div>
              <div className="get-started-login">
                <h1 className="loginHead">Login</h1>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
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
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
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
                {location.pathname === "/auth" ? (
                  <span className="redirect">
                    New User? <Link to={"/register"}>Sign Up</Link>
                  </span>
                ) : (
                  <span className="redirect">
                    Already a user? <Link to={"/auth"}>Sign In</Link>
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
