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
  LinearProgress,
  Fade,
  Skeleton,
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
import {
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Inventory as InventoryIcon,
  DoneAll as DoneAllIcon,
  PersonAdd as PersonAddIcon,
  AccessTime as AccessTimeIcon,
  Pending as PendingIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

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
      intervalId = setInterval(() => refreshData(false), 30000);
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
    if (showLoadingState) setTimeout(() => setRefreshing(false), 800);
  };

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

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

  const getStatusConfig = (status) =>
    ({
      pending: { color: "warning", icon: <PendingIcon /> },
      confirmed: { color: "info", icon: <CheckCircleIcon /> },
      assigned: { color: "primary", icon: <PersonAddIcon /> },
      ready: { color: "secondary", icon: <InventoryIcon /> },
      pickedup: { color: "info", icon: <LocalShippingIcon /> }, // Changed from 'default'
      delivered: { color: "success", icon: <DoneAllIcon /> },
    })[status] || { color: "primary", icon: <AssignmentIcon /> };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

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
        <Typography color="error" variant="h5" gutterBottom>
          Error loading orders
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {allOrdersError}
        </Typography>
        <Button
          variant="contained"
          onClick={() => refreshData()}
          startIcon={<RefreshIcon />}
          sx={{ borderRadius: 2 }}
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
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: "100vh" }}>
      {/* Dashboard Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(195deg, #1A2038, #1A202C)"
              : "linear-gradient(195deg, #3A4B8C, #2E3A6B)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Order Management
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {totalOrders} total orders • {orderStatusTabs[currentTab].label}{" "}
              status
            </Typography>
          </div>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title={`Auto-refresh ${isAutoRefresh ? "on" : "off"}`}>
              <IconButton
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                sx={{ color: isAutoRefresh ? "#4CAF50" : "#BDBDBD" }}
              >
                <AccessTimeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Refresh data">
              <IconButton onClick={() => refreshData()} sx={{ color: "#fff" }}>
                {refreshing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <RefreshIcon sx={{ transition: "transform 0.3s" }} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[2],
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark" ? "#2D2F3D" : "#E8EAF6",
                    color: theme.palette.primary.main,
                  }}
                >
                  <LocalShippingIcon />
                </Avatar>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {totalOrders}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {orderStatusTabs.map((status, index) => {
          const config = getStatusConfig(status.value);
          const color = theme.palette[config.color] ? config.color : "primary"; // Fallback color

          return (
            <Grid item xs={6} md={3} key={status.value}>
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette[color].light,
                        color: theme.palette[color].contrastText,
                      }}
                    >
                      {status.icon}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" color="text.secondary">
                        {status.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {orderSummary[status.value]}
                      </Typography>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Order Status Navigation */}
      <Paper sx={{ borderRadius: 3, mb: 3, bgcolor: "background.paper" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { height: 3 },
            "& .MuiTab-root": {
              minHeight: 64,
              textTransform: "none",
              fontWeight: 600,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
        >
          {orderStatusTabs.map((tab, index) => (
            <Tab
              key={tab.value}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  {tab.icon}
                  <span>{tab.label}</span>
                  <Badge
                    badgeContent={orderSummary[tab.value]}
                    color={getStatusConfig(tab.value).color}
                    showZero
                    sx={{ ml: 1 }}
                  />
                </Stack>
              }
            />
          ))}
        </Tabs>

        {/* Order List */}
        {allOrdersLoading ? (
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rounded" height={200} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            {filteredOrders.length === 0 ? (
              <Box
                sx={{
                  p: 8,
                  textAlign: "center",
                  bgcolor: "background.default",
                  borderRadius: 3,
                }}
              >
                <InventoryIcon
                  sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  No {orderStatusTabs[currentTab].label.toLowerCase()} orders
                  found
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredOrders.map((order) => {
                  const config = getStatusConfig(order.status);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={order._id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: theme.shadows[1],
                          transition: "all 0.3s",
                          "&:hover": { boxShadow: theme.shadows[4] },
                        }}
                      >
                        <CardContent>
                          {/* Card Header */}
                          <Stack direction="row" justifyContent="space-between">
                            <Chip
                              label={order.status}
                              color={config.color}
                              icon={config.icon}
                              size="small"
                              sx={{ mb: 1 }}
                            />
                            <Tooltip title="View details">
                              <IconButton
                                size="small"
                                onClick={() => openOrderDetailsDialog(order)}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>

                          {/* Order Info */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            #{order._id.substring(order._id.length - 8)}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {order.items?.length || 0} items • ₹
                            {order.totalPrice?.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <AccessTimeIcon
                              fontSize="inherit"
                              sx={{ mr: 0.5 }}
                            />
                            {getTimeElapsed(order.createdAt)}
                          </Typography>

                          <Divider sx={{ my: 2 }} />

                          {/* Dynamic Actions */}
                          {order.status === "pending" && (
                            <Button
                              fullWidth
                              variant="contained"
                              color={config.color}
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleConfirmOrder(order._id)}
                              sx={{ borderRadius: 2 }}
                            >
                              Confirm Order
                            </Button>
                          )}

                          {order.status === "confirmed" && (
                            <div>
                              <SelectBox
                                label="Shopkeeper"
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
                                sx={{ mb: 1.5 }}
                              />
                              <SelectBox
                                label="Delivery Boy"
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
                                sx={{ mb: 2 }}
                              />
                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<PersonAddIcon />}
                                onClick={() =>
                                  handleAssignOrder(
                                    order._id,
                                    shopkeeperId,
                                    deliveryBoyId
                                  )
                                }
                                sx={{ borderRadius: 2 }}
                              >
                                Assign Staff
                              </Button>
                            </div>
                          )}

                          {/* Assigned Staff Display */}
                          {[
                            "assigned",
                            "ready",
                            "pickedup",
                            "delivered",
                          ].includes(order.status) && (
                            <Stack spacing={1.5}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                  {order.shopkeeper?.name?.[0] || "S"}
                                </Avatar>
                                <Typography variant="body2">
                                  {order.shopkeeper?.name || "Not assigned"}
                                </Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                  {order.deliveryBoy?.name?.[0] || "D"}
                                </Avatar>
                                <Typography variant="body2">
                                  {order.deliveryBoy?.name || "Not assigned"}
                                </Typography>
                              </Stack>
                            </Stack>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
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
