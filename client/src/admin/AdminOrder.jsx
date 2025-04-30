import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Badge,
  CircularProgress,
  useTheme,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  assignOrder,
  getAllOrders,
} from "../actions/OrderAction";
import { listUsers } from "../actions/userAction";
import { showToast } from "../components/ui/ShowToast";
import { clearAllOrders } from "../reducer/OrderReducer";
import OrderDetailsDialog from "../components/ui/order/OrderDetailDialogue";
import SelectBox from "../components/ui/SelectBox";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PendingIcon from "@mui/icons-material/Pending";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const AdminOrder = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    orders: allOrders = [],
    loading: allOrdersLoading,
    error: allOrdersError,
  } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.userList);
  const [currentTab, setCurrentTab] = useState(0);
  const [shopkeeperId, setShopkeeperId] = useState("");
  const [deliveryBoyId, setDeliveryBoyId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter the users
  const shopkeepers =
    users?.users?.filter(
      (user) => user.role === "shopkeeper" && user.isVerified
    ) || [];

  const deliveryBoys =
    users?.users?.filter(
      (user) => user.role === "deliveryboy" && user.isVerified
    ) || [];

  // Define status tabs
  const orderStatusTabs = [
    { label: "Pending", value: "pending", icon: <PendingIcon /> },
    { label: "Confirmed", value: "confirmed", icon: <CheckCircleIcon /> },
    { label: "Assigned", value: "assigned", icon: <PersonAddIcon /> },
    { label: "Ready", value: "ready", icon: <InventoryIcon /> },
    { label: "Picked Up", value: "pickedup", icon: <LocalShippingIcon /> },
    { label: "Delivered", value: "delivered", icon: <DoneAllIcon /> },
  ];

  // Order summary calculation
  const orderSummary = orderStatusTabs.reduce((acc, status) => {
    acc[status.value] = allOrders.filter(
      (order) => order.status === status.value
    ).length;
    return acc;
  }, {});

  // Get total orders
  const totalOrders = allOrders.length;

  // Auto-refresh logic
  useEffect(() => {
    let intervalId;

    if (isAutoRefresh) {
      intervalId = setInterval(() => {
        refreshData(false);
      }, 30000); // Refresh every 30 seconds
    }

    return () => clearInterval(intervalId);
  }, [isAutoRefresh, dispatch]);

  // Initial data load
  useEffect(() => {
    refreshData(true);
    return () => dispatch(clearAllOrders());
  }, [dispatch]);

  const refreshData = (showLoadingState = true) => {
    if (showLoadingState) setRefreshing(true);

    dispatch(clearAllOrders());
    dispatch(getAllOrders());
    dispatch(listUsers());

    if (showLoadingState) {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      await dispatch(confirmOrder(orderId));
      dispatch(getAllOrders());
      showToast("Order Confirmed Successfully!", "success");
    } catch {
      showToast("Failed to Confirm Order!", "error");
    }
  };

  const handleAssignOrder = async (orderId, shopkeeperId, deliveryBoyId) => {
    if (!shopkeeperId || !deliveryBoyId) {
      return showToast(
        "Please select both shopkeeper and delivery boy",
        "error"
      );
    }

    try {
      await dispatch(assignOrder(orderId, shopkeeperId, deliveryBoyId));
      setShopkeeperId("");
      setDeliveryBoyId("");
      setSelectedOrderId(null);
      dispatch(getAllOrders());
      showToast("Order Assigned Successfully!", "success");
    } catch {
      showToast("Failed to Assign Order!", "error");
    }
  };

  const openOrderDetailsDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const closeOrderDetailsDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "info";
      case "assigned":
        return "primary";
      case "ready":
        return "secondary";
      case "pickedup":
        return "default";
      case "delivered":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <PendingIcon />;
      case "confirmed":
        return <CheckCircleIcon />;
      case "assigned":
        return <PersonAddIcon />;
      case "ready":
        return <InventoryIcon />;
      case "pickedup":
        return <LocalShippingIcon />;
      case "delivered":
        return <DoneAllIcon />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  // Calculate time elapsed since order creation
  const getTimeElapsed = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - orderDate;

    const minutes = Math.floor(diffInMs / 60000);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  if (allOrdersError) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h5">
          Error loading orders
        </Typography>
        <Typography color="error">{allOrdersError}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => refreshData()}
          startIcon={<RefreshIcon />}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const filteredOrders = allOrders.filter(
    (order) => order.status === orderStatusTabs[currentTab]?.value
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)"
              : "linear-gradient(45deg, #3f51b5 0%, #5c6bc0 100%)",
          color: "#fff",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Order Management Dashboard
          </Typography>

          <Box>
            <Tooltip
              title={
                isAutoRefresh ? "Auto-refresh is on" : "Auto-refresh is off"
              }
            >
              <IconButton
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                sx={{ color: isAutoRefresh ? "#4caf50" : "#bdbdbd" }}
              >
                <AccessTimeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Refresh data">
              <IconButton onClick={() => refreshData()} sx={{ color: "#fff" }}>
                {refreshing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <RefreshIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Stats Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #323232 0%, #202020 100%)"
                  : "linear-gradient(135deg, #f5f7fa 0%, #e8ebf2 100%)",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: "bold" }}>
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Order Status Overview
              </Typography>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {orderStatusTabs.map((status, index) => (
                  <Grid item key={status.value}>
                    <Chip
                      icon={status.icon}
                      label={`${status.label}: ${orderSummary[status.value]}`}
                      color={getStatusChipColor(status.value)}
                      variant={currentTab === index ? "filled" : "outlined"}
                      onClick={() => setCurrentTab(index)}
                      sx={{
                        fontWeight: currentTab === index ? "bold" : "normal",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tab Navigation */}
      <Paper sx={{ borderRadius: 2, mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              minHeight: 64,
              textTransform: "none",
              fontWeight: "medium",
            },
          }}
        >
          {orderStatusTabs.map((tab, index) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {tab.icon}
                  <span>{tab.label}</span>
                  <Badge
                    badgeContent={orderSummary[tab.value]}
                    color={getStatusChipColor(tab.value)}
                    showZero
                  />
                </Box>
              }
              id={`order-tab-${index}`}
              aria-controls={`order-tabpanel-${index}`}
            />
          ))}
        </Tabs>

        {allOrdersLoading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading orders...</Typography>
          </Box>
        ) : (
          <Box role="tabpanel" p={3}>
            {filteredOrders.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  No {orderStatusTabs[currentTab]?.label.toLowerCase()} orders
                  found
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {filteredOrders.map((order) => (
                  <Grid item xs={12} sm={6} md={4} key={order._id}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          mb={1}
                        >
                          <Box>
                            <Chip
                              size="small"
                              label={order.status}
                              color={getStatusChipColor(order.status)}
                              icon={getStatusIcon(order.status)}
                              sx={{ mb: 1 }}
                            />
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              <Tooltip title={formatDate(order.createdAt)}>
                                <span>{getTimeElapsed(order.createdAt)}</span>
                              </Tooltip>
                            </Typography>
                          </Box>
                          <Tooltip title="View order details">
                            <IconButton
                              size="small"
                              onClick={() => openOrderDetailsDialog(order)}
                              sx={{ ml: "auto" }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Order #{order._id.substring(order._id.length - 8)}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Items: {order.items?.length || 0} items
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Total: ₹{order.totalPrice?.toFixed(2)}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Pending order actions */}
                        {order.status === "pending" && (
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleConfirmOrder(order._id)}
                            startIcon={<CheckCircleIcon />}
                          >
                            Confirm Order
                          </Button>
                        )}

                        {/* Confirmed order actions - Assign staff */}
                        {order.status === "confirmed" && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Assign Staff
                            </Typography>

                            <SelectBox
                              label="Shopkeeper"
                              name="shopkeeper"
                              value={
                                selectedOrderId === order._id
                                  ? shopkeeperId
                                  : ""
                              }
                              onChange={(e) => {
                                setShopkeeperId(e.target.value);
                                setSelectedOrderId(order._id);
                              }}
                              options={shopkeepers.map((sk) => ({
                                label: sk.name,
                                value: sk._id,
                              }))}
                              placeholder="Select Shopkeeper"
                              fullWidth
                              margin="dense"
                            />

                            <SelectBox
                              label="Delivery Boy"
                              name="deliveryBoy"
                              value={
                                selectedOrderId === order._id
                                  ? deliveryBoyId
                                  : ""
                              }
                              onChange={(e) => {
                                setDeliveryBoyId(e.target.value);
                                setSelectedOrderId(order._id);
                              }}
                              options={deliveryBoys.map((db) => ({
                                label: db.name,
                                value: db._id,
                              }))}
                              placeholder="Select Delivery Boy"
                              fullWidth
                              margin="dense"
                            />

                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              sx={{ mt: 1 }}
                              onClick={() =>
                                handleAssignOrder(
                                  order._id,
                                  selectedOrderId === order._id
                                    ? shopkeeperId
                                    : "",
                                  selectedOrderId === order._id
                                    ? deliveryBoyId
                                    : ""
                                )
                              }
                              startIcon={<PersonAddIcon />}
                            >
                              Assign Staff
                            </Button>
                          </Box>
                        )}

                        {/* Other order statuses - Show assigned staff */}
                        {[
                          "assigned",
                          "ready",
                          "pickedup",
                          "delivered",
                        ].includes(order.status) && (
                          <Box>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              mb={1}
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ minWidth: 80 }}
                              >
                                Shopkeeper:
                              </Typography>
                              <Chip
                                avatar={
                                  <Avatar>
                                    {order.shopkeeper?.name?.[0] || "S"}
                                  </Avatar>
                                }
                                label={order.shopkeeper?.name || "Not assigned"}
                                variant="outlined"
                                size="small"
                              />
                            </Stack>

                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ minWidth: 80 }}
                              >
                                Delivery:
                              </Typography>
                              <Chip
                                avatar={
                                  <Avatar>
                                    {order.deliveryBoy?.name?.[0] || "D"}
                                  </Avatar>
                                }
                                label={
                                  order.deliveryBoy?.name || "Not assigned"
                                }
                                variant="outlined"
                                size="small"
                              />
                            </Stack>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Paper>

      <OrderDetailsDialog
        open={dialogOpen}
        handleClose={closeOrderDetailsDialog}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default AdminOrder;
