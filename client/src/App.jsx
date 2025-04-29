// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/common/protectedRoute";
import Layout from "./components/common/layout/Layout";

import {
  adminRoutes,
  commonRoutes,
  deliveryRoutes,
  publicRoutes,
  shopkeeperRoutes,
  userRoutes,
} from "./routes";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {publicRoutes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Route>

        {/* admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Layout />}>
            {adminRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>

        {/* shopkeeper routes */}
        <Route element={<ProtectedRoute allowedRoles={["shopkeeper"]} />}>
          <Route path="/shopkeeper" element={<Layout />}>
            {shopkeeperRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>

        {/* delivery boy routes */}
        <Route element={<ProtectedRoute allowedRoles={["deliveryboy"]} />}>
          <Route path="/deliveryboy" element={<Layout />}>
            {deliveryRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>

        {/* user routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<Layout />}>
            {userRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>

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
