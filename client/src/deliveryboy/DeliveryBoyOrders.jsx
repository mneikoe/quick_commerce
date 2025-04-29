import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import {
  confirmDelivery,
  confirmPickup,
  getMyOrdersByDdeliveryBoy,
} from "../actions/OrderAction";

import { showToast } from "../components/ui/ShowToast";
import OrderDetailsDialog from "../components/ui/order/OrderDetailDialogue";
import Loader from "../components/ui/Loader";

import Constants from "../constants/Constants";

const DeliveryBoyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.getDeliveryBoyOrders);
  const [currentOrders, setCurrentOrders] = useState([]);
  console.log(orders);
  console.log(error);
  useEffect(() => {
    dispatch(getMyOrdersByDdeliveryBoy());

    const interval = setInterval(() => {
      dispatch(getMyOrdersByDdeliveryBoy());
    }, 300000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      setCurrentOrders((prevOrders) => {
        const readyOrders = orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.READY
        );

        const newOrders = readyOrders.filter(
          (order) =>
            !prevOrders.some((prevOrder) => prevOrder._id === order._id)
        );

        return [...prevOrders, ...newOrders];
      });
    }
  }, [orders]);

  const handlePickup = (orderId) => {
    dispatch(confirmPickup(orderId))
      .then(() => {
        dispatch(getMyOrdersByDdeliveryBoy());
        showToast("Order pickup successfully", "success");
      })
      .catch(() => showToast("Failed to confirm pickup", "error"));
  };

  const handleDelivery = (orderId) => {
    dispatch(confirmDelivery(orderId))
      .then(() => {
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
