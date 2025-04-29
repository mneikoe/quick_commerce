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

// Blinkit-inspired color scheme
const BLINKIT_YELLOW = "#f8d521";
const DARK_BG = "#1a1a1a";
// Role-based navigation items
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
    { label: "Menu", path: "/user/menu", icon: <RestaurantMenuIcon /> },
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
    {
      label: "Profile",
      path: "/shopkeeper/profile",
      icon: <User2 />,
    },
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
    {
      label: "Profile",
      path: "/deliveryboy/profile",
      icon: <User2 />,
    },
  ],
};

// Sidebar component
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
          backgroundColor: DARK_BG,
          borderTop: `2px solid ${BLINKIT_YELLOW}`,
        }}
      >
        <BottomNavigation
          showLabels
          sx={{
            bgcolor: DARK_BG,
            "& .Mui-selected": { color: BLINKIT_YELLOW },
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
                minWidth: 80,
                color: "#fff",
                "&.Mui-selected": {
                  color: BLINKIT_YELLOW,
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
          bgcolor: DARK_BG,
          color: "#fff",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: `2px solid ${BLINKIT_YELLOW}`,
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
                    bgcolor: DARK_BG,
                    color: BLINKIT_YELLOW,
                    border: `1px solid ${BLINKIT_YELLOW}`,
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
                    bgcolor: BLINKIT_YELLOW,
                    color: DARK_BG,
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "#fae052",
                    },
                  },
                  "&:hover": {
                    bgcolor: "#333333",
                    color: BLINKIT_YELLOW,
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
                    style: {
                      color:
                        location.pathname === item.path ? DARK_BG : "inherit",
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
            bgcolor: `${BLINKIT_YELLOW}40`,
            width: "80%",
            mx: "auto",
          }}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
