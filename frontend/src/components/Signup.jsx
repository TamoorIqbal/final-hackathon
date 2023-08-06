import React, { useState } from "react";
import "./Style.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const Signup = ({ showToast }) => {
  const navigate = useNavigate();
  // const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    profileImage: null,
  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setProfileImage(file);
  // };

  const handleSubmit = async () => {
    // console.log(formData, "fromData");
    // const data = new FormData();
    // data.append("userName", formData.userName);
    // data.append("email", formData.email);
    // data.append("password", formData.password);
    // data.append("profileImage", formData.profileImage);
    // console.log("formData", formData);
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response?.data);
      // alert("Registration successful!");
      showToast("Registration successful!", "success");
      setLoading(false);

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      setLoading(false);

      // alert("Registration failed!");
      // showToast("Registration failed!", "error");
      showToast(error.response?.data.error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="login">
          <div className="login-header">
            <h1>Sign Up</h1>
          </div>

          <div className="login-form">
            {/* <h3>Profile Image:</h3>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            /> */}

            <h3>Username:</h3>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
            />
            <br />
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
            <div className="profile-image-container">
              <h3 className="profile-image-label">Profile Image:</h3>
              {formData.profileImage && (
                <img
                  className="profile-image-preview"
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Preview"
                />
              )}
              <br />
              <label
                htmlFor="profileImage"
                className="profile-image-upload-btn"
              >
                Upload Image
              </label>
              <input
                id="profileImage"
                className="profile-image-input"
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <input
              type="button"
              value="Sign Up"
              className="login-button"
              onClick={handleSubmit}
            />
            <br />

            <Link to="/login" className="sign-up">
              Log In!
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
