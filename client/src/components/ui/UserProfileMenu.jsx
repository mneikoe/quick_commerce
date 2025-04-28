import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Constants from "../../constants/Constants";
import Loader from "./Loader";
import NoData from "./NoData";

const UserProfileMenu = ({ logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, loading, error } = useSelector((s) => s.auth);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    logout();
  };
  const navigate = useNavigate();
  const handleProfile = () => {
    switch (currentUser?.role) {
      case Constants.USER_ROLE.ADMIN:
        navigate("/admin/profile");
        break;
      case Constants.USER_ROLE.SHOPKEEPER:
        navigate("/shopkeeper/profile");
        break;
      case Constants.USER_ROLE.DELIVERYBOY:
        navigate("/deliveryboy/profile");
        break;
      case Constants.USER_ROLE.USER:
        navigate("/user/profile");
        break;
      default:
        navigate("/");
    }
    handleClose();
  };
  if (loading) {
    <Loader />;
  }
  if (error) {
    <NoData message={error} />;
  }
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar alt="User" sx={{ width: 40, height: 40 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: "8px",
          },
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
