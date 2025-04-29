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
import Loader from "../components/ui/Loader";
import NoData from "../components/ui/NoData";

const UserOrder = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, loading, error } = useSelector((s) => s.getUserOrders);
  const { currentUser: user } = useSelector((s) => s.auth);

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

  if (loading) return <Loader />;

  return (
    <div>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
            >
              My Orders
            </Typography>
          </Grid>
      {user?.role === "user" && (
        <Grid container spacing={3}>

          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order._id}>
                <Card
                  sx={{
                    p: 2,
                    height: "100%",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => handleOpenDialog(order)}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Order Status: {order.status}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Total Price: ₹{order.totalPrice}
                    </Typography>
                    <OrderStatusTimeline currentStatus={order.status} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <NoData message="No orders found" />
            </Grid>
          )}

          <OrderDetailsDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            selectedOrder={selectedOrder}
          />
        </Grid>
      )}
    </div>
  );
};

export default UserOrder;
