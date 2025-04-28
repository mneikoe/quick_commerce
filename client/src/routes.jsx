// src/routes.js
import HomePage from "./pages/HomePage";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import Products from "./pages/Products";
import UserProfile from "./pages/UserProfile";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminMenu from "./admin/AdminMenu";
import AdminCategory from "./admin/AdminCategory";
import AdminOrder from "./admin/AdminOrder";

import ShopkeeperOrders from "./shopkeepers/ShopkeeperOrder";
import ShopkeeperDashboard from "./shopkeepers/ShopkeeperDashboard";

import DeliveryBoyOrders from "./deliveryboy/DeliveryBoyOrders";
import DeliveryBoyDashboard from "./deliveryboy/DeliveryBoyDashboard";

import UserDashboard from "./user/UserDashboard";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <Products /> },
];

export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "users", element: <AdminUsers /> },
  { path: "menu", element: <AdminMenu /> },
  { path: "category", element: <AdminCategory /> },
  { path: "order", element: <AdminOrder /> },
  { path: "profile", element: <UserProfile /> },
];

export const shopkeeperRoutes = [
  { path: "dashboard", element: <ShopkeeperDashboard /> },
  { path: "myOrders", element: <ShopkeeperOrders /> },
  { path: "profile", element: <UserProfile /> },
];

export const deliveryRoutes = [
  { path: "dashboard", element: <DeliveryBoyDashboard /> },
  { path: "myOrders", element: <DeliveryBoyOrders /> },
  { path: "profile", element: <UserProfile /> },
];

export const userRoutes = [
  { path: "profile", element: <UserProfile /> },
  { path: "dashboard", element: <UserDashboard /> },
];

export const commonRoutes = [
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <PageNotFound /> },
];
