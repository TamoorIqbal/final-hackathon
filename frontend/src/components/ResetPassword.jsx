import React, { useState } from "react";
import "./Style.css";
import axios from "axios";
import Loading from "../utils/Loading";

import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/constants";

const ResetPassword = ({ showToast }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setloading(true);
    try {
      const response = await axios.put(
        `${baseUrl}/resest-password/${token}`,
        formData
      );
      // console.log(response?.data);
      showToast("Password reset successful!", "success");
      // alert("Password reset successful!");
      setloading(false);
      navigate("/login");
    } catch (error) {
      // console.error(error.response?.data);
      // alert("Failed to reset password. Please try again.");
      showToast("Failed to reset password. Please try again!", "error");
    }
  };

  return (
    <>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <div className="login">
          <div className="login-header">
            <h1>Reset Password</h1>
          </div>

          <div className="login-form">
            <h3>New Password:</h3>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <h3>Confirm Password:</h3>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
      )}
    </>
  );
};

export default ResetPassword;
