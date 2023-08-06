import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import Loading from "../utils/Loading";

const UpdatePassword = ({ showToast }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // console.log("Old Password:", oldPassword);
    // console.log("New Password:", newPassword);
    // console.log("Confirm Password:", confirmPassword);
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}/update-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast(response?.data?.message, "success");

      setLoading(false);
    } catch (error) {
      setLoading(false);

      showToast(error.response?.data?.error, "error");
    }
  };

  return (
    <>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 15,
            padding: "12px 0px",
          }}
        >
          <TextField
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="contact-btn">Upadat Password</button>
        </form>
      )}
    </>
  );
};

export default UpdatePassword;
