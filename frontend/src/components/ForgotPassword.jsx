import React, { useState } from "react";
import "./Style.css";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const ForgotPassword = ({ showToast }) => {
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await axios.post(`${baseUrl}/forgot-password`, formData);
      // console.log(response?.data);
      // alert("Password reset email sent!");
      showToast("Password reset email sent!", "success");
      setFormData({
        email: "",
      });
    } catch (error) {
      // console.error(error.response?.data);
      // alert("Failed to reset password. Please try again.");
      showToast("Failed to reset password. Please try again!", "error");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-header">
          <h1>Forgot Password</h1>
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
          <input
            type="button"
            value="Reset Password"
            className="login-button"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
