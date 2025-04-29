// import React from "react";
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
const UserOrder = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, loading, error } = useSelector((s) => s.getUserOrders);
  const { currentUser: user } = useSelector((s) => s.auth);
  useEffect(() => {
    dispatch(getMyOrdersByUser());
  }, [dispatch]);

  console.log(orders, loading, error);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  console.log(orders);
  return (
    <div>
      {/* Orders List */}
      {user?.role === "user" && (
        <>
          <Grid container spacing={2}>
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
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserOrder;
