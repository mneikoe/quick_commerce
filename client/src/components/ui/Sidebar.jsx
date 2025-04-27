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
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ListOrdered, Menu } from "lucide-react";
import { Category } from "@mui/icons-material";

// Role-based navigation items
const navItems = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "Users", path: "/admin/users", icon: <PeopleIcon /> },
    { label: "Menu", path: "/admin/menu", icon: <Menu /> },
    { label: "Category", path: "/admin/category", icon: <Category /> },
    { label: "Order", path: "/admin/order", icon: <ListOrdered /> },
    // { label: "Menu", path: "/admin/menu", icon: <RestaurantMenuIcon /> },
    // { label: "Shipping", path: "/admin/shipping", icon: <LocalShippingIcon /> },
  ],
  user: [
    { label: "Dashboard", path: "/user/dashboard", icon: <DashboardIcon /> },
    { label: "Menu", path: "/user/menu", icon: <RestaurantMenuIcon /> },
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
  ],
  deliveryboy: [
    {
      label: "Dashboard",
      path: "/delivery/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Deliveries",
      path: "/delivery/orders",
      icon: <ShoppingCartIcon />,
    },
  ],
};

// Get the navigation items based on user role

// Sidebar component
const Sidebar = ({
  drawerWidth,
  open,
  onToggleSidebar,
  isMobile,
  userRole,
}) => {
  const location = useLocation();

  // Get the nav items based on the user role
  // const roleNavItems = navItems[userRole] || navItems["shopkeeper"]; // Default to shopkeeper if role not found
  const roleNavItems = navItems[userRole] || navItems["shopkeeper"]; // Default to shopkeeper if role is not found

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
          boxSizing: "border-box",
          backgroundColor: (theme) => theme.palette.secondary.light,
          color: (theme) => theme.palette.primary.main,
          transition: "width 0.3s",
          overflowX: "hidden",
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
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "#fff",
                  },
                }}
                className="transition-all duration-300"
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                  color="secondary"
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Divider sx={{ my: 1, backgroundColor: "#475569" }} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
