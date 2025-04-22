import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../App.css";

//Login Function
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div
        className="register-page"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6393017/pexels-photo-6393017.jpeg?auto=compress&cs=tinysrgb&w=600')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        {" "}
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler} className="ff">
          <h1 className="hh">Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="justify-content-between">
            <div>
              <button>
                <Link to="/register">Not a user ? Cleck Here to regsiter</Link>
              </button>
            </div>
            <div className="btnn">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
