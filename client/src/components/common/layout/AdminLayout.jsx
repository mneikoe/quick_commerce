import React, { useState } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
// import Sidebar from "../../../admin/Sidebar";
// import Topbar from "../Topbar";
import { Outlet } from "react-router-dom";
import Topbar from "../../ui/Topbar";
import Sidebar from "../../ui/Sidebar";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const userRole = "admin";
  return (
    <Box sx={{ display: "flex" }}>
      {/* Topbar */}
      <Topbar onToggleSidebar={handleToggleSidebar} open={sidebarOpen} />

      {/* Sidebar */}
      <Sidebar
        drawerWidth={drawerWidth}
        open={open}
        onToggleSidebar={handleToggleSidebar}
        isMobile={false}
        userRole={userRole}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMobile ? 0 : sidebarOpen ? `${drawerWidth}px` : 10, // Adjust for sidebar width
          marginTop: "64px", // Offset for Topbar height (64px is the default MUI AppBar height)
          transition: "margin-left 0.3s ease", // Smooth transition for margin change
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
