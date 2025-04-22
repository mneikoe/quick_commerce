// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ShopkeeperDashboard from "./pages/shopkeeper/ShopkeeperDashboard";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import MenuPage from "./pages/user/MenuPage";
import CartPage from "./pages/user/CartPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMenu from "./pages/admin/AdminMenu";
import ShopkeeperOrders from "./pages/shopkeeper/ShopkeeperOrders";
import DeliveryOrders from "./pages/delivery/DeliveryOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<Layout />}>
            <Route index element={<UserDashboard />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders/:orderId" element={<OrderTrackingPage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="menu" element={<AdminMenu />} />
          </Route>
        </Route>

        {/* Shopkeeper Routes */}
        <Route element={<ProtectedRoute allowedRoles={["shopkeeper"]} />}>
          <Route path="/shopkeeper" element={<Layout />}>
            <Route index element={<ShopkeeperDashboard />} />
            <Route path="orders" element={<ShopkeeperOrders />} />
          </Route>
        </Route>

        {/* Delivery Routes */}
        <Route element={<ProtectedRoute allowedRoles={["deliveryboy"]} />}>
          <Route path="/delivery" element={<Layout />}>
            <Route index element={<DeliveryDashboard />} />
            <Route path="orders" element={<DeliveryOrders />} />
          </Route>
        </Route>

        {/* Common Order Tracking */}
        <Route path="/orders/:orderId/track" element={<OrderTrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
