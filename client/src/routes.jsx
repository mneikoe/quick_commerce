// src/routes.js
import HomePage from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AdminDashboard from "./admin/AdminDashboard";

import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import AdminUsers from "./admin/AdminUsers";
// import ProductDetail from "./components/ui/ProductDetail";

export const publicRoutes = [
  { path: "/", element: <HomePage /> }, //bki hai
  { path: "/login", element: <Login /> }, //✅
  { path: "/register", element: <Register /> }, //✅
  // { path: "/product/:id", element: <ProductDetail /> }, //✅
];

export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "users", element: <AdminUsers /> },
];
export const shopkeeperRoutes = [];
export const deliveryRoutes = [];
export const userRoutes = [];
export const commonRoutes = [
  { path: "/unauthorized", element: <Unauthorized /> }, //✅
  { path: "*", element: <PageNotFound /> }, //✅
];
