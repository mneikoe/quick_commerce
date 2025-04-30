// src/components/OrderReport.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Chip,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";

const OrderReport = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  ); // Default to 7 days ago
  const [endDate, setEndDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");

  const { token, user } = useSelector((state) => state.auth || {});
  const userRole = user?.role || "user";

  // Calculate report summary based on filtered orders
  const reportSummary = useMemo(() => {
    const statuses = {};
    let totalSales = 0;
    let completed = 0;
    let pending = 0;

    const filteredOrders = getFilteredOrders();

    filteredOrders.forEach((order) => {
      // Count orders by status
      statuses[order.status] = (statuses[order.status] || 0) + 1;

      // Calculate total sales
      totalSales += order.totalPrice || 0;

      // Count completed vs pending
      if (["DELIVERED", "COMPLETED"].includes(order.status)) {
        completed++;
      } else {
        pending++;
      }
    });

    return {
      totalOrders: filteredOrders.length,
      totalSales,
      statuses,
      completed,
      pending,
    };
  }, [orders, tabValue, statusFilter]);

  // Get filtered orders based on tab and status filter
  function getFilteredOrders() {
    if (!orders || orders.length === 0) return [];

    let filtered = [...orders];

    // Apply tab filter
    if (userRole === "deliveryBoy") {
      switch (tabValue) {
        case 0: // Assigned to me
          filtered = filtered.filter(
            (order) => order.deliveryBoy?._id === user?._id
          );
          break;
        case 1: // Ready for pickup
          filtered = filtered.filter(
            (order) =>
              order.status === "READY" && order.deliveryBoy?._id === user?._id
          );
          break;
        case 2: // In progress
          filtered = filtered.filter(
            (order) =>
              order.status === "PICKED_UP" &&
              order.deliveryBoy?._id === user?._id
          );
          break;
        case 3: // Completed
          filtered = filtered.filter(
            (order) =>
              ["DELIVERED", "COMPLETED"].includes(order.status) &&
              order.deliveryBoy?._id === user?._id
          );
          break;
        default:
          break;
      }
    }

    // Apply status filter if not 'all'
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    return filtered;
  }

  const fetchOrdersByDate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

      // Use different endpoint for delivery personnel
      const endpoint =
        userRole === "deliveryBoy"
          ? `${baseURL}/orders/delivery-orders`
          : `${baseURL}/orders/by-date`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        params: {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        },
      });

      setOrders(
        Array.isArray(response?.data?.orders) ? response.data.orders : []
      );
    } catch (err) {
      console.error("API Error:", {
        url: err.config?.url,
        status: err.response?.status,
        message: err.message,
      });
      setError(err?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  // Set up role-based tabs
  const renderRoleTabs = () => {
    if (userRole === "deliveryBoy") {
      return (
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 3 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Assigned Orders" />
          <Tab label="Ready for Pickup" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      );
    }
    return null;
  };

  const getRoleBasedTitle = () => {
    switch (userRole.toLowerCase()) {
      case "admin":
        return "Admin Order Report";
      case "shopkeeper":
        return "Shopkeeper Order Report";
      case "deliveryboy":
        return "My Delivery Orders";
      default:
        return "My Order History";
    }
  };

  // Order status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "primary";
      case "READY":
        return "info";
      case "PICKED_UP":
        return "warning";
      case "DELIVERED":
      case "COMPLETED":
        return "success";
      default:
        return "default";
    }
  };

  // Export report as CSV
  const exportToCSV = () => {
    const filteredOrders = getFilteredOrders();
    if (!filteredOrders.length) return;

    const headers = ["Order ID", "Date", "Total Price", "Status"];
    if (userRole === "admin" || userRole === "shopkeeper") {
      headers.push("Customer");
    }
    if (userRole === "admin" || userRole === "deliveryBoy") {
      headers.push("Shopkeeper");
    }
    if (userRole === "admin" || userRole === "shopkeeper") {
      headers.push("Delivery Person");
    }

    const csvContent = [
      headers.join(","),
      ...filteredOrders.map((order) => {
        const row = [
          order._id,
          new Date(order.createdAt).toLocaleDateString(),
          order.totalPrice || "0.00",
          order.status || "Unknown",
        ];

        if (userRole === "admin" || userRole === "shopkeeper") {
          row.push(order.user?.name || "N/A");
        }
        if (userRole === "admin" || userRole === "deliveryBoy") {
          row.push(order.shopkeeper?.name || "Not Assigned");
        }
        if (userRole === "admin" || userRole === "shopkeeper") {
          row.push(order.deliveryBoy?.name || "Not Assigned");
        }

        return row.join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Fetch orders on initial load for delivery personnel
    if (userRole === "deliveryBoy") {
      fetchOrdersByDate();
    }
  }, [userRole]);

  const formattedStart = startDate?.toLocaleDateString() || "";
  const formattedEnd = endDate?.toLocaleDateString() || "";

  const filteredOrders = getFilteredOrders();

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">{getRoleBasedTitle()}</Typography>

          {orders.length > 0 && (
            <Tooltip title="Export to CSV">
              <IconButton onClick={exportToCSV}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Date range selection */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={
              <TextField label="Start Date" fullWidth size="small" />
            }
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<TextField label="End Date" fullWidth size="small" />}
          />

          <Button
            variant="contained"
            onClick={fetchOrdersByDate}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <FilterAltIcon />
            }
          >
            {isLoading ? "Loading..." : "Generate Report"}
          </Button>

          {!isLoading && orders.length > 0 && (
            <Tooltip title="Refresh Data">
              <IconButton onClick={fetchOrdersByDate}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Role-based tabs */}
        {renderRoleTabs()}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!isLoading && filteredOrders.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No orders found in the selected date range or filter
          </Alert>
        )}

        {filteredOrders.length > 0 && (
          <Box>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Orders
                    </Typography>
                    <Typography variant="h4">
                      {reportSummary.totalOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {userRole === "deliveryBoy"
                        ? "Pending Deliveries"
                        : "Total Sales"}
                    </Typography>
                    <Typography variant="h4">
                      {userRole === "deliveryBoy"
                        ? reportSummary.pending
                        : `₹${reportSummary.totalSales.toFixed(2)}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {userRole === "deliveryBoy"
                        ? "Completed Deliveries"
                        : "Date Range"}
                    </Typography>
                    {userRole === "deliveryBoy" ? (
                      <Typography variant="h4">
                        {reportSummary.completed}
                      </Typography>
                    ) : (
                      <Typography variant="h6">
                        {formattedStart} - {formattedEnd}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {userRole === "deliveryBoy"
                        ? "Success Rate"
                        : "Completion Rate"}
                    </Typography>
                    <Typography variant="h4">
                      {reportSummary.totalOrders
                        ? `${Math.round((reportSummary.completed / reportSummary.totalOrders) * 100)}%`
                        : "0%"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Orders Table */}
            <TableContainer component={Paper} elevation={2}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Status</TableCell>
                    {(userRole === "admin" || userRole === "shopkeeper") && (
                      <TableCell>Customer</TableCell>
                    )}
                    {(userRole === "admin" || userRole === "deliveryBoy") && (
                      <TableCell>Shopkeeper</TableCell>
                    )}
                    {(userRole === "admin" || userRole === "shopkeeper") && (
                      <TableCell>Delivery Person</TableCell>
                    )}
                    {userRole === "deliveryBoy" && (
                      <TableCell>Customer Address</TableCell>
                    )}
                    <TableCell>Items</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order?._id || Math.random()} hover>
                      <TableCell>
                        {(order?._id || "N/A")
                          .substring((order?._id || "N/A").length - 8)
                          .toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleDateString() +
                            ", " +
                            new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        ₹{order?.totalPrice?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order?.status || "Unknown"}
                          size="small"
                          color={getStatusChipColor(order?.status)}
                        />
                      </TableCell>

                      {/* Role-specific columns */}
                      {(userRole === "admin" || userRole === "shopkeeper") && (
                        <TableCell>{order?.user?.name || "N/A"}</TableCell>
                      )}

                      {(userRole === "admin" || userRole === "deliveryBoy") && (
                        <TableCell>
                          {order?.shopkeeper?.name || "Not Assigned"}
                        </TableCell>
                      )}

                      {(userRole === "admin" || userRole === "shopkeeper") && (
                        <TableCell>
                          {order?.deliveryBoy?.name || "Not Assigned"}
                        </TableCell>
                      )}

                      {/* Delivery person specific column */}
                      {userRole === "deliveryBoy" && (
                        <TableCell>
                          {order?.deliveryAddress ||
                            order?.user?.address ||
                            "No address provided"}
                        </TableCell>
                      )}

                      {/* Items column */}
                      <TableCell>
                        {Array.isArray(order?.items) && order.items.length > 0
                          ? order.items.map((item, idx) => (
                              <Typography
                                key={item?.menuItem?._id || idx}
                                variant="body2"
                                sx={{
                                  mb: idx < order.items.length - 1 ? 0.5 : 0,
                                }}
                              >
                                {item?.quantity || 0}x{" "}
                                {item?.menuItem?.name ||
                                  item?.name ||
                                  "Unknown Item"}
                              </Typography>
                            ))
                          : "No items"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OrderReport;
