import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";

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
          marginLeft: isMobile ? 0 : sidebarOpen ? `${drawerWidth}px` : 10,
          marginTop: "64px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
