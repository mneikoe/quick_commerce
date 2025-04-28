import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { confirmOrderReady, getMyOrders } from "../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import Constants from "../constants/Constants";
import { showToast } from "../components/ui/ShowToast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import NoData from "../components/ui/NoData";
import OrderDetailsDialog from "../components/ui/OrderDetailDialogue";
const ShopkeeperOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.getMyOrders);
  console.log(orders);
  // Keep track of the previous orders to append new ones
  const [currentOrders, setCurrentOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    // Initial fetch to get orders
    dispatch(getMyOrders());

    // Polling every 3 seconds to fetch new orders
    const intervalId = setInterval(() => {
      dispatch(getMyOrders()); // Fetch new orders if any
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      setCurrentOrders((prevOrders) => {
        // Avoid duplicating orders, only add new ones
        const readyOrders = orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.ASSIGNED
        );
        const newOrders = readyOrders.filter(
          (order) =>
            !prevOrders.some((prevOrder) => prevOrder._id === order._id)
        );
        return [...prevOrders, ...newOrders];
      });
    }
  }, [orders]); // This effect runs when orders from Redux change
  // ready
  const handleConfirmOrerReady = (orderId) => {
    dispatch(confirmOrderReady(orderId));
    dispatch(getMyOrders());
    showToast("order confirm ready successfully", "success");
  };
  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" fontWeight="bold" mb={3}>
          My Orders
        </Typography>

        {currentOrders.length === 0 && <NoData message="No orders ready" />}
        {currentOrders.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Delivery Boy</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items Count</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user?.name || "N/A"}</TableCell>
                  <TableCell>
                    {order.deliveryBoy?.name || "Not Assigned"}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.items?.length || 0}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      disabled={order.status === Constants.ORDER_STATUS.READY}
                      onClick={() => handleConfirmOrerReady(order._id)}
                    >
                      {order.status === Constants.ORDER_STATUS.READY
                        ? "Already Ready"
                        : "Mark Ready"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenDialog(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default ShopkeeperOrders;
