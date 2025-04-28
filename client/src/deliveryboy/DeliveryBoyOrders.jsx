import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmDelivery,
  confirmPickup,
  getMyOrdersByDdeliveryBoy,
} from "../actions/OrderAction";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import Constants from "../constants/Constants";
import { showToast } from "../components/ui/ShowToast";
import OrderDetailsDialog from "../components/ui/OrderDetailDialogue";
import Loader from "../components/ui/Loader";

const DeliveryBoyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.getDeliveryBoyOrders);
  const [currentOrders, setCurrentOrders] = useState([]);
  console.log(orders);
  console.log(error);
  useEffect(() => {
    // Fetch immediately when component mounts
    dispatch(getMyOrdersByDdeliveryBoy());

    // Set up interval to fetch every 5 minutes (300000 milliseconds)
    const interval = setInterval(() => {
      dispatch(getMyOrdersByDdeliveryBoy());
    }, 300000); // 5 minutes = 300,000ms

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Update the state only when new orders are fetched
  useEffect(() => {
    if (orders.length > 0) {
      setCurrentOrders((prevOrders) => {
        // Filter only orders with status 'READY'
        const readyOrders = orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.READY
        );

        // Avoid duplicate orders
        const newOrders = readyOrders.filter(
          (order) =>
            !prevOrders.some((prevOrder) => prevOrder._id === order._id)
        );

        return [...prevOrders, ...newOrders]; // Append new ready orders
      });
    }
  }, [orders]);

  const handlePickup = (orderId) => {
    dispatch(confirmPickup(orderId))
      .then(() => {
        // Fetch the updated orders after pickup confirmation
        dispatch(getMyOrdersByDdeliveryBoy());
        showToast("Order pickup successfully", "success");
      })
      .catch(() => showToast("Failed to confirm pickup", "error"));
  };
  // Confirm delivery for an order
  const handleDelivery = (orderId) => {
    dispatch(confirmDelivery(orderId))
      .then(() => {
        // Fetch the updated orders after delivery confirmation
        dispatch(getMyOrdersByDdeliveryBoy());
        showToast("Order delivered successfully", "success");
      })
      .catch(() => showToast("Failed to confirm delivery", "error"));
  };

  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : currentOrders.length ? (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              My Delivery Orders
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Items Count</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.user?.name || "N/A"}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.items?.length || 0}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setSelectedOrder(order);
                          setOpenDialog(true);
                        }}
                      >
                        View Details
                      </Button>
                      {order.status === Constants.ORDER_STATUS.READY && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handlePickup(order._id)}
                        >
                          Confirm Pickup
                        </Button>
                      )}
                      {order.status === Constants.ORDER_STATUS.PICKEDUP && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDelivery(order._id)}
                        >
                          Confirm Delivery
                        </Button>
                      )}
                      {order.status === Constants.ORDER_STATUS.DELIVERED && (
                        <Button variant="contained" color="primary" disabled>
                          Delivered
                        </Button>
                      )}
                      {order.status === Constants.ORDER_STATUS.DELIVERED && (
                        <Typography>Completed</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Paper>
      <OrderDetailsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default DeliveryBoyOrders;
