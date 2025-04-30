import React, { useEffect, useState, useMemo } from "react";
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
  TableContainer,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
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
import RefreshIcon from "@mui/icons-material/Refresh";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DeliveryBoyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.getDeliveryBoyOrders);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders on component mount and setup interval
  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders(false);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [dispatch]);

  // Manual refresh function
  const fetchOrders = (showLoadingState = true) => {
    if (showLoadingState) {
      setRefreshing(true);
    }

    dispatch(getMyOrdersByDdeliveryBoy())
      .then(() => {
        if (showLoadingState) {
          setRefreshing(false);
        }
      })
      .catch(() => {
        if (showLoadingState) {
          setRefreshing(false);
        }
      });
  };

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];

    switch (tabValue) {
      case 0: // Active Orders
        return orders.filter(
          (order) =>
            order.status === Constants.ORDER_STATUS.READY ||
            order.status === Constants.ORDER_STATUS.PICKEDUP
        );
      case 1: // Ready for Pickup
        return orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.READY
        );
      case 2: // In Transit
        return orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.PICKEDUP
        );
      case 3: // Delivered
        return orders.filter(
          (order) => order.status === Constants.ORDER_STATUS.DELIVERED
        );
      case 4: // All Orders
        return orders;
      default:
        return orders;
    }
  }, [orders, tabValue]);

  // Calculate dashboard statistics
  const dashboardStats = useMemo(() => {
    if (!orders || !Array.isArray(orders)) {
      return {
        total: 0,
        ready: 0,
        inTransit: 0,
        delivered: 0,
        completionRate: 0,
      };
    }

    const ready = orders.filter(
      (order) => order.status === Constants.ORDER_STATUS.READY
    ).length;

    const inTransit = orders.filter(
      (order) => order.status === Constants.ORDER_STATUS.PICKEDUP
    ).length;

    const delivered = orders.filter(
      (order) => order.status === Constants.ORDER_STATUS.DELIVERED
    ).length;

    const total = orders.length;

    return {
      total,
      ready,
      inTransit,
      delivered,
      completionRate: total > 0 ? Math.round((delivered / total) * 100) : 0,
    };
  }, [orders]);

  // Handle order pickup
  const handlePickup = (orderId) => {
    dispatch(confirmPickup(orderId))
      .then(() => {
        dispatch(getMyOrdersByDdeliveryBoy());
        showToast("Order picked up successfully", "success");
      })
      .catch(() => showToast("Failed to confirm pickup", "error"));
  };

  // Handle order delivery
  const handleDelivery = (orderId) => {
    dispatch(confirmDelivery(orderId))
      .then(() => {
        dispatch(getMyOrdersByDdeliveryBoy());
        showToast("Order delivered successfully", "success");
      })
      .catch(() => showToast("Failed to confirm delivery", "error"));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Get status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case Constants.ORDER_STATUS.READY:
        return "info";
      case Constants.ORDER_STATUS.PICKEDUP:
        return "warning";
      case Constants.ORDER_STATUS.DELIVERED:
        return "success";
      default:
        return "default";
    }
  };

  // Get status chip icon
  const getStatusChipIcon = (status) => {
    switch (status) {
      case Constants.ORDER_STATUS.READY:
        return <AccessTimeIcon fontSize="small" />;
      case Constants.ORDER_STATUS.PICKEDUP:
        return <LocalShippingIcon fontSize="small" />;
      case Constants.ORDER_STATUS.DELIVERED:
        return <CheckCircleIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Dashboard Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <DeliveryDiningIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Delivery Dashboard
          </Typography>
        </Box>
        <Tooltip title="Refresh Orders">
          <IconButton
            onClick={() => fetchOrders()}
            disabled={loading || refreshing}
            color="primary"
          >
            {refreshing ? <CircularProgress size={24} /> : <RefreshIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                TOTAL ASSIGNED ORDERS
              </Typography>
              <Typography variant="h4">{dashboardStats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{ bgcolor: "info.light", color: "info.contrastText" }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                READY FOR PICKUP
              </Typography>
              <Typography variant="h4">{dashboardStats.ready}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{ bgcolor: "warning.light", color: "warning.contrastText" }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                IN TRANSIT
              </Typography>
              <Typography variant="h4">{dashboardStats.inTransit}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{ bgcolor: "success.light", color: "success.contrastText" }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                DELIVERED
              </Typography>
              <Typography variant="h4">{dashboardStats.delivered}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Tabs Navigation */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Active Orders
                {dashboardStats.ready + dashboardStats.inTransit > 0 && (
                  <Chip
                    size="small"
                    label={dashboardStats.ready + dashboardStats.inTransit}
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Ready for Pickup
                {dashboardStats.ready > 0 && (
                  <Chip
                    size="small"
                    label={dashboardStats.ready}
                    color="info"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                In Transit
                {dashboardStats.inTransit > 0 && (
                  <Chip
                    size="small"
                    label={dashboardStats.inTransit}
                    color="warning"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
          <Tab label="Delivered" />
          <Tab label="All Orders" />
        </Tabs>

        {/* Error Handling */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <Loader />
          </Box>
        ) : filteredOrders.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No orders found in this category.
          </Alert>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>
                      {order._id.substring(order._id.length - 8).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {order.user?.name || "N/A"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.deliveryAddress ||
                          order.user?.address ||
                          "No address provided"}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.shopkeeper?.name || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={getStatusChipColor(order.status)}
                        icon={getStatusChipIcon(order.status)}
                      />
                    </TableCell>
                    <TableCell>{formatDate(order.updatedAt)}</TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          <Box>
                            {order.items?.map((item, idx) => (
                              <Typography variant="body2" key={idx}>
                                {item.quantity}x{" "}
                                {item.menuItem?.name || item.name || "Item"}
                              </Typography>
                            ))}
                          </Box>
                        }
                      >
                        <Chip
                          label={`${order.items?.length || 0} items`}
                          size="small"
                          variant="outlined"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => viewOrderDetails(order)}
                        >
                          Details
                        </Button>

                        {order.status === Constants.ORDER_STATUS.READY && (
                          <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={() => handlePickup(order._id)}
                          >
                            Pickup
                          </Button>
                        )}

                        {order.status === Constants.ORDER_STATUS.PICKEDUP && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleDelivery(order._id)}
                          >
                            Deliver
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default DeliveryBoyOrders;
