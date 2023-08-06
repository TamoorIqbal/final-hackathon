import React, { useContext, useState } from "react";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../Context/AppContext";
import Loading from "../utils/Loading";
import { baseUrl } from "../utils/constants";

const Login = ({ showToast }) => {
  const { setUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // console.log(formData);
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/login`, formData);
      showToast("Login successful!", "success");
      // console.log(response?.data);
      localStorage.setItem("token", response?.data?.token);
      setUser(response?.data?.user);
      setLoading(false);
      // alert("Login successful!");

      navigate("/");
    } catch (error) {
      // console.error(error.response?.data);
      setLoading(false);

      // alert("Login failed!");
      showToast(error.response?.data?.error, "error");
    }
  };

  return (
    <>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <div className="login">
          <div className="login-header">
            <h1>Login</h1>
          </div>

          <div className="login-form">
            <h3>Email:</h3>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <h3>Password:</h3>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <input
              type="button"
              value="Login"
              className="login-button"
              onClick={handleSubmit}
            />
            <br />
            <Link to="/signup" className="sign-up">
              Sign Up!
            </Link>
            <br />
            <br />
            <Link to="/forgot-password" className="sign-up">
              Forgot Password?
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
