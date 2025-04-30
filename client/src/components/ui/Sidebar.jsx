import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ListOrdered, ListOrderedIcon, Menu, User2 } from "lucide-react";
import { Category } from "@mui/icons-material";

// Updated color scheme to match Admin Menu
const SIDEBAR_COLORS = {
  primary: "#F0B6A1",
  secondary: "#e0fbfc",
  background: "#ffffff",
  textPrimary: "#293241",
  textSecondary: "#F0B6A1",
  divider: "#eaeff4",
  hoverBg: "#f5f8fa",
};

// Role-based navigation items (keep original structure)
const navItems = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "Users", path: "/admin/users", icon: <PeopleIcon /> },
    { label: "Menu", path: "/admin/menu", icon: <Menu /> },
    { label: "Category", path: "/admin/category", icon: <Category /> },
    { label: "Order", path: "/admin/order", icon: <ListOrdered /> },
    { label: "Profile", path: "/admin/profile", icon: <User2 /> },
  ],
  user: [
    { label: "Dashboard", path: "/user/dashboard", icon: <DashboardIcon /> },
    { label: "Profile", path: "/user/profile", icon: <User2 /> },
    { label: "Order", path: "/user/order", icon: <ListOrderedIcon /> },
  ],
  shopkeeper: [
    {
      label: "Dashboard",
      path: "/shopkeeper/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Orders",
      path: "/shopkeeper/myOrders",
      icon: <ShoppingCartIcon />,
    },
    { label: "Profile", path: "/shopkeeper/profile", icon: <User2 /> },
  ],
  deliveryboy: [
    {
      label: "Dashboard",
      path: "/deliveryboy/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Orders",
      path: "/deliveryboy/myOrders",
      icon: <ShoppingCartIcon />,
    },
    { label: "Profile", path: "/deliveryboy/profile", icon: <User2 /> },
  ],
};

const Sidebar = ({
  drawerWidth,
  open,
  onToggleSidebar,
  isMobile,
  userRole,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const roleNavItems = navItems[userRole] || navItems["user"];

  // Mobile bottom navigation
  if (isSmallScreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: SIDEBAR_COLORS.background,
          borderTop: `2px solid ${SIDEBAR_COLORS.primary}`,
        }}
      >
        <BottomNavigation
          showLabels
          sx={{
            bgcolor: SIDEBAR_COLORS.background,
            "& .Mui-selected": { color: SIDEBAR_COLORS.primary },
            height: 64,
          }}
        >
          {roleNavItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              component={Link}
              to={item.path}
              label={item.label}
              icon={item.icon}
              selected={location.pathname === item.path}
              sx={{
                minWidth: 60,
                color: SIDEBAR_COLORS.textSecondary,
                "&.Mui-selected": {
                  color: SIDEBAR_COLORS.primary,
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
    );
  }

  // Desktop sidebar
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onToggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 60,
          bgcolor: SIDEBAR_COLORS.background,
          color: SIDEBAR_COLORS.textPrimary,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: `1px solid ${SIDEBAR_COLORS.divider}`,
        },
      }}
    >
      <Box sx={{ mt: 8, width: drawerWidth }}>
        <List>
          {roleNavItems.map((item) => (
            <Tooltip
              title={open ? "" : item.label}
              placement="right"
              key={item.path}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: SIDEBAR_COLORS.primary,
                    color: SIDEBAR_COLORS.background,
                    fontSize: "0.8rem",
                  },
                },
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  py: 1.5,
                  margin: 1,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: SIDEBAR_COLORS.primary,
                    color: SIDEBAR_COLORS.background,
                    fontWeight: "600",
                    "&:hover": {
                      bgcolor: SIDEBAR_COLORS.primary,
                    },
                  },
                  "&:hover": {
                    bgcolor: SIDEBAR_COLORS.hoverBg,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      color:
                        location.pathname === item.path
                          ? SIDEBAR_COLORS.background
                          : SIDEBAR_COLORS.textPrimary,
                    },
                  })}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Divider
          sx={{
            my: 1,
            bgcolor: SIDEBAR_COLORS.divider,
            width: "80%",
            mx: "auto",
          }}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
