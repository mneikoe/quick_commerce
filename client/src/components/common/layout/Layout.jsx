import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";

import Sidebar from "../../ui/Sidebar";
import Topbar from "../../ui/Topbar";
import { isRolePath } from "../../../utils/isRolePath";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { currentUser } = useSelector((s) => s.auth);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const userRole = currentUser?.role;
  const location = useLocation();
  const pathname = location.pathname;
  const isRoleRoute = isRolePath(pathname, [
    "admin",
    "shopkeeper",
    "deliveryboy",
    "user",
  ]);

  const sidebarWidth = sidebarOpen ? 162 : 60;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar onToggleSidebar={handleToggleSidebar} open={sidebarOpen} />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar with transition */}
        {isRoleRoute && (
          <Box
            sx={{
              width: isMobile ? "0px" : `${sidebarWidth}px`,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              backgroundColor: "#f5f5f5",
              borderRight: "1px solid #ccc",
            }}
          >
            <Sidebar
              open={sidebarOpen}
              onToggleSidebar={handleToggleSidebar}
              isMobile={isMobile}
              userRole={userRole}
            />
          </Box>
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin 0.3s ease",
            marginTop: "64px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
