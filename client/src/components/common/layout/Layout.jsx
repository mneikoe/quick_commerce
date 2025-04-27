import React, { useState, useContext } from "react";
import Sidebar from "../../ui/Sidebar";
import { AuthContext } from "../../../context/AuthContext";
import Topbar from "../../ui/Topbar";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { isRolePath } from "../../../utils/isRolePath";
import { useSelector } from "react-redux";

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
  ]);
  // Set widths dynamically
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
            marginTop: "64px", // adjust based on your Topbar height
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
