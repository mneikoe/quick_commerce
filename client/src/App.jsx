// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AdminLayout from "./components/common/layout/AdminLayout";
import ProtectedRoute from "./components/common/protectedRoute";

import {
  adminRoutes,
  commonRoutes,
  deliveryRoutes,
  publicRoutes,
  shopkeeperRoutes,
} from "./routes";
import Layout from "./components/common/layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import Layout from "./components/common/Layout";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import UserDashboard from "./pages/user/UserDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ShopkeeperDashboard from "./pages/shopkeeper/ShopkeeperDashboard";
// import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
// import MenuPage from "./pages/user/MenuPage";
// import CartPage from "./pages/user/CartPage";
// import OrderTrackingPage from "./pages/OrderTrackingPage";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminMenu from "./pages/admin/AdminMenu";
// import ShopkeeperOrders from "./pages/shopkeeper/ShopkeeperOrders";
// import DeliveryOrders from "./pages/delivery/DeliveryOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          {publicRoutes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Layout />}>
            {adminRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["shopkeeper"]} />}>
          <Route path="/shopkeeper" element={<Layout />}>
            {shopkeeperRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["deliveryboy"]} />}>
          <Route path="/deliveryboy" element={<Layout />}>
            {deliveryRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>
        {/* <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin", "user", "shopkeeper", "deliveryboy"]}
            />
          }
        >
          <Route path="/" element={<Layout />}>
            {[
              ...adminRoutes.map((route) => ({
                ...route,
                path: `admin/${route.path}`,
              })),
              // ...userRoutes.map((route) => ({
              //   ...route,
              //   path: `user/${route.path}`,
              // })),
              ...shopkeeperRoutes.map((route) => ({
                ...route,
                path: `shopkeeper/${route.path}`,
              })),
              // ...deliveryRoutes.map((route) => ({
              //   ...route,
              //   path: `delivery/${route.path}`,
              // })),
            ].map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route> */}

        {/* common routes */}
        {commonRoutes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

{
  /* User Routes */
}
{
  /* <Route element={<ProtectedRoute allowedRoles={["user"]} />}> */
}
{
  /* <Route path="/user" element={<Layout />}>
  <Route index element={<UserDashboard />} />
    <Route path="menu" element={<MenuPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="orders/:orderId" element={<OrderTrackingPage />} />
    </Route>
</Route> */
}
{
  /* Shopkeeper Routes */
}
{
  /* <Route element={<ProtectedRoute allowedRoles={["shopkeeper"]} />}>
  <Route path="/shopkeeper" element={<Layout />}>
    <Route index element={<ShopkeeperDashboard />} />
    <Route path="orders" element={<ShopkeeperOrders />} />
  </Route>
  </Route> */
}

{
  /* Delivery Routes */
}
{
  /* <Route element={<ProtectedRoute allowedRoles={["deliveryboy"]} />}>
    <Route path="/delivery" element={<Layout />}>
    <Route index element={<DeliveryDashboard />} />
    <Route path="orders" element={<DeliveryOrders />} />
    </Route>
    </Route> */
}
{
  /* Common Order Tracking */
}
{
  /* <Route path="/orders/:orderId/track" element={<OrderTrackingPage />} /> */
}
