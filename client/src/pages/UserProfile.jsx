import React, { useState, useEffect } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersByUser } from "../actions/OrderAction";
import OrderDetailsDialog from "../components/ui/order/OrderDetailDialogue";
import OrderStatusTimeline from "../components/ui/order/OrderStatusTimeline";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((s) => s.auth);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, loading, error } = useSelector((s) => s.getUserOrders);

  console.log(orders, loading, error),
    useEffect(() => {
      dispatch(getMyOrdersByUser());
    }, [dispatch]);
  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        {/* Profile Section */}
        <Card
          sx={{
            boxShadow: 6,
            borderRadius: "20px",
            overflow: "hidden",
            padding: 4,
            background: "linear-gradient(to bottom right, #ffffff, #f9fafb)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: 12,
              transform: "scale(1.02)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 0,
            }}
          >
            <Avatar
              alt={user?.name}
              src={user?.avatarUrl || ""}
              sx={{
                width: 110,
                height: 110,
                bgcolor: "#4caf50",
                fontSize: 36,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
              {user?.name || "Unknown User"}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
              {user?.email || "No Email Provided"}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {user?.phone || "No Phone Number"}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
              disabled
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {/* Orders List */}
      {user?.role === "user" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              My Orders
            </Typography>

            {loading ? (
              <Typography>Loading Orders...</Typography>
            ) : // <Typography color="error">{error}</Typography>
            orders && orders.length > 0 ? (
              orders.map((order) => (
                <Card
                  key={order._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => handleOpenDialog(order)}
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      Order Status: {order.status}
                    </Typography>
                    <Typography variant="body2">
                      Total Price: ₹{order.totalPrice}
                    </Typography>
                    <OrderStatusTimeline currentStatus={order.status} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No orders found.</Typography>
            )}
          </Grid>
          {/* Dialog for Order Details */}
          <OrderDetailsDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            selectedOrder={selectedOrder}
          />
        </>
      )}
      {/* <OrderDetailsDialog /> */}
    </Grid>
  );
};

export default UserProfile;
