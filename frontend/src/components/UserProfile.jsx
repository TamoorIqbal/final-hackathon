import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../Context/AppContext";
import "./UserProfile.css";
import { baseUrl } from "../utils/constants";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdatePassword from "./UpdatePassword";

const UserProfile = ({ showToast }) => {
  const { user } = useContext(MyContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(
    `${baseUrl}/${user?.profileImage}`
  );

  useEffect(() => {
    setProfileImageURL(`${baseUrl}/${user?.profileImage}`);
  }, [user, setProfileImageURL]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setProfileImageURL(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profileImage", selectedImage);
      const response = await axios.put(
        `${baseUrl}/profile-image/${user?._id}`,
        formData
      );
      showToast(response?.data?.message);
      setSelectedImage(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showToast(error);
    }
  };
  const [isOpen2, setIsOpen2] = useState(false);

  const handleOpen2 = () => {
    setIsOpen2(true);
    // setLoading(true);
  };

  const handleClose2 = () => {
    setIsOpen2(false);
    // dispatch(getUserData());
  };

  return (
    <>
      <div className="profileMain">
        <div className="profile-card">
          <div className="card-header">
            <div className="pic">
              <img src={profileImageURL} alt="profileImage" />
            </div>
            <div className="name">{user?.userName}</div>
            <div className="desc">{user?.email}</div>
            <button className="contact-btn" onClick={handleOpen2}>
              Upadat Password
            </button>
          </div>
          <div className="card-footer">
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profileImageInput"
            />
            <label htmlFor="profileImageInput" className="upload-button">
              <EditIcon className="edit-icon" />
              Choose Image
            </label>
            <button
              className={`update-button ${isLoading ? "loading" : ""}`}
              onClick={handleImageUpload}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Update Image"}
            </button>
          </div>
        </div>
      </div>
      <Box>
        <Dialog open={isOpen2} onClose={handleClose2}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={handleClose2}>
                <CloseIcon sx={{ color: "#e66767" }} />
              </Button>
            </Box>
            <DialogTitle>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#e66767" }}
              >
                Update Password
              </Typography>
            </DialogTitle>
            <DialogContent>
              <UpdatePassword showToast={showToast} />
            </DialogContent>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default UserProfile;
