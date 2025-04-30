import React, { useEffect, useState, useCallback } from "react";
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
  TableContainer,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrderReady, getMyOrders } from "../actions/OrderAction";
import OrderDetailsDialog from "../components/ui/order/OrderDetailDialogue";
import NoData from "../components/ui/NoData";
import Constants from "../constants/Constants";

const ShopkeeperOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.getMyOrders);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Filter orders based on the active tab
  const getFilteredOrders = useCallback(() => {
    if (!orders || orders.length === 0) return [];

    switch (tabValue) {
      case 0: // Active Orders
        return orders.filter(
          (order) =>
            order.status === Constants.ORDER_STATUS.ASSIGNED ||
            order.status === Constants.ORDER_STATUS.READY
        );
      case 1: // Completed Orders
        return orders.filter(
          (order) =>
            order.status === Constants.ORDER_STATUS.DELIVERED ||
            order.status === Constants.ORDER_STATUS.COMPLETED
        );
      case 2: // All Orders
        return orders;
      default:
        return orders;
    }
  }, [orders, tabValue]);

  const filteredOrders = getFilteredOrders();

  // Fetch orders on component mount and set up interval
  useEffect(() => {
    dispatch(getMyOrders());

    const intervalId = setInterval(() => {
      dispatch(getMyOrders());
    }, 10000); // Increased to 10s to reduce server load

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Handle marking an order as ready
  const handleConfirmOrderReady = (orderId) => {
    dispatch(confirmOrderReady(orderId))
      .then(() => {
        setSnackbar({
          open: true,
          message: "Order marked as ready successfully",
          severity: "success",
        });
        dispatch(getMyOrders());
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: err.message || "Failed to mark order as ready",
          severity: "error",
        });
      });
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle viewing order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Get status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case Constants.ORDER_STATUS.ASSIGNED:
        return "primary";
      case Constants.ORDER_STATUS.READY:
        return "success";
      case Constants.ORDER_STATUS.DELIVERED:
        return "info";
      case Constants.ORDER_STATUS.COMPLETED:
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign={{ xs: "center", sm: "left" }}
        >
          My Orders
        </Typography>

        {/* Tab navigation */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 3 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Active Orders
                {orders?.filter(
                  (o) =>
                    o.status === Constants.ORDER_STATUS.ASSIGNED ||
                    o.status === Constants.ORDER_STATUS.READY
                ).length > 0 && (
                  <Chip
                    size="small"
                    label={
                      orders.filter(
                        (o) =>
                          o.status === Constants.ORDER_STATUS.ASSIGNED ||
                          o.status === Constants.ORDER_STATUS.READY
                      ).length
                    }
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
          <Tab label="Completed Orders" />
          <Tab label="All Orders" />
        </Tabs>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading indicator */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredOrders.length === 0 ? (
          <NoData
            message={`No ${tabValue === 0 ? "active" : tabValue === 1 ? "completed" : ""} orders found`}
          />
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Delivery Personnel</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{order.user?.name || "N/A"}</TableCell>
                    <TableCell>
                      {order.deliveryBoy?.name || "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={getStatusChipColor(order.status)}
                      />
                    </TableCell>
                    <TableCell>{order.items?.length || 0}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        {order.status === Constants.ORDER_STATUS.ASSIGNED && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleConfirmOrderReady(order._id)}
                          >
                            Mark Ready
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Order details dialog */}
      <OrderDetailsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        selectedOrder={selectedOrder}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopkeeperOrders;
