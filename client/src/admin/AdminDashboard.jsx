import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
// import { getAllOrders } from "../../../server/controllers/adminController";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/OrderAction";
import AdminOrder from "./AdminOrder";
import AssignOrderForm from "./AssignOrderForm";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Box
      className="w-full h-screen "
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        // boxShadow: (theme) => theme.shadows[3],
        // borderRadius: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          // borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Welcome back, Admin! Here is an overview of your system.
        </Typography>
        {/* Add charts, summaries, etc. later */}
        {loading ? (
          <Typography>Loading orders...</Typography>
        ) : (
          <AdminOrder orders={orders} />
        )}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Assign Orders
        </Typography>
        {orders.map((order) => (
          <Box key={order._id} sx={{ my: 2 }}>
            <Typography variant="body1">Order ID: {order._id}</Typography>
            <AssignOrderForm
              orderId={order._id}
              // shopkeepers={shopkeepersList}
              // deliveryBoys={deliveryBoyList}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
