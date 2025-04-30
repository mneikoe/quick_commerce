// src/components/OrderReport.jsx
import React, { useState, useEffect } from "react";
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
  Pagination,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 10;

const OrderPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportSummary, setReportSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    statuses: {},
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { token, currentUser } = useSelector((state) => state.auth || {});

  console.log(currentUser);
  const userRole = currentUser?.role || "user";

  useEffect(() => {
    if (orders.length > 0) {
      calculateReportSummary();
    }
  }, [orders]);

  const calculateReportSummary = () => {
    const statuses = {};
    let totalSales = 0;

    orders.forEach((order) => {
      statuses[order.status] = (statuses[order.status] || 0) + 1;
      totalSales += order.totalPrice || 0;
    });

    setReportSummary({
      totalOrders: orders.length,
      totalSales,
      statuses,
    });
  };

  const fetchOrdersByDate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

      const response = await axios.get(`${baseURL}/orders/by-date`, {
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
      setCurrentPage(1); // reset pagination
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

  const getRoleBasedTitle = () => {
    switch (userRole.toLowerCase()) {
      case "admin":
        return "Admin Order Report";
      case "shopkeeper":
        return "Shopkeeper Order Report";
      case "deliveryboy":
        return "Shopkeeper Order Report";
      default:
        return "My Order History";
    }
  };

  const formattedStart = startDate?.toLocaleDateString() || "";
  const formattedEnd = endDate?.toLocaleDateString() || "";

  // Pagination logic
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIdx, endIdx);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {getRoleBasedTitle()}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<TextField label="Start Date" fullWidth />}
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<TextField label="End Date" fullWidth />}
          />

          <Button
            variant="contained"
            onClick={fetchOrdersByDate}
            disabled={!startDate || !endDate || isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Generate Report"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            Error: {error}
          </Typography>
        )}

        {!isLoading && orders.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No orders found in the selected date range
          </Typography>
        )}

        {orders.length > 0 && (
          <Box>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
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
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Sales
                    </Typography>
                    <Typography variant="h4">
                      ₹{reportSummary.totalSales.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Date Range
                    </Typography>
                    <Typography variant="h6">
                      {formattedStart} - {formattedEnd}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Status Cards */}
              {Object.entries(reportSummary.statuses).map(([status, count]) => (
                <Grid item xs={6} sm={4} md={3} key={status}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {status}
                      </Typography>
                      <Typography variant="h6">{count}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Orders Table */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Status</TableCell>
                    {userRole === "admin" && <TableCell>Customer</TableCell>}
                    <TableCell>Shopkeeper</TableCell>
                    <TableCell>Delivery Boy</TableCell>
                    <TableCell>Items</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.map((order, index) => (
                    <TableRow
                      key={order?._id || index}
                      sx={{
                        backgroundColor:
                          order.status === "Cancelled" ? "#ffe5e5" : "inherit",
                      }}
                    >
                      <TableCell>{order?._id || "N/A"}</TableCell>
                      <TableCell>
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        ₹{order?.totalPrice?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell>{order?.status || "Unknown"}</TableCell>
                      {userRole === "admin" && (
                        <TableCell>{order?.user?.name || "N/A"}</TableCell>
                      )}
                      <TableCell>
                        {order?.shopkeeper?.name || "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        {order?.deliveryBoy?.name || "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        {Array.isArray(order?.items)
                          ? order.items.map((item, idx) => (
                              <div key={item?.menuItem?._id || idx}>
                                {item?.quantity || 0}x{" "}
                                {item?.menuItem?.name ||
                                  item?.name ||
                                  "Unknown Item"}
                              </div>
                            ))
                          : "No items"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, value) => setCurrentPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OrderPicker;
