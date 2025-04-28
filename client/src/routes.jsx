// src/routes.js
import HomePage from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AdminDashboard from "./admin/AdminDashboard";

import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import AdminUsers from "./admin/AdminUsers";
import Products from "./pages/Products";
import AdminMenu from "./admin/AdminMenu";
import AdminCategory from "./admin/AdminCategory";
import ShopkeeperOrders from "./shopkeepers/ShopkeeperOrder";
import ShopkeeperDashboard from "./shopkeepers/ShopkeeperDashboard";
import AdminOrder from "./admin/AdminOrder";
import DeliveryBoyOrders from "./deliveryboy/DeliveryBoyOrders";
import DeliveryBoyDashboard from "./deliveryboy/DeliveryBoyDashboard";
// import ProductDetail from "./components/ui/ProductDetail";

export const publicRoutes = [
  { path: "/", element: <HomePage /> }, //bki hai
  { path: "/products", element: <Products /> }, //✅
  // { path: "/product/:id", element: <ProductDetail /> }, //✅
];

export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "users", element: <AdminUsers /> },
  { path: "menu", element: <AdminMenu /> },
  { path: "category", element: <AdminCategory /> },
  { path: "order", element: <AdminOrder /> },
];
export const shopkeeperRoutes = [
  { path: "dashboard", element: <ShopkeeperDashboard /> },
  { path: "myOrders", element: <ShopkeeperOrders /> },
];
export const deliveryRoutes = [
  { path: "dashboard", element: <DeliveryBoyDashboard /> },
  { path: "myOrders", element: <DeliveryBoyOrders /> },
];
export const userRoutes = [];
export const commonRoutes = [
  { path: "/unauthorized", element: <Unauthorized /> }, //✅
  { path: "/register", element: <Register /> }, //✅
  { path: "/login", element: <Login /> }, //✅
  { path: "*", element: <PageNotFound /> }, //✅
];
