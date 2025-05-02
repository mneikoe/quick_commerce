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
  IconButton,
  Tooltip,
  Alert,
  useTheme,
  Skeleton,
  Avatar,
  Chip,
  Divider,
  Stack,
  Menu,
  MenuItem,
  Fade,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import OrderDetailsDialog from "./order/OrderDetailDialogue";
import {
  Visibility,
  Search,
  MonetizationOn,
  Assignment,
  DateRange,
  LocalMall,
  Timeline,
  FilterList,
  Receipt,
  MoreVert,
  Print,
  GetApp,
  Refresh,
  CheckCircle,
  ErrorOutline,
  LocalShipping,
  HourglassEmpty,
  SettingsBackupRestore,
} from "@mui/icons-material";

const ITEMS_PER_PAGE = 10;

const statusConfig = {
  Delivered: {
    color: "success",
    icon: <CheckCircle fontSize="small" />,
  },
  Pending: {
    color: "warning",
    icon: <HourglassEmpty fontSize="small" />,
  },
  Cancelled: {
    color: "error",
    icon: <ErrorOutline fontSize="small" />,
  },
  Shipped: {
    color: "info",
    icon: <LocalShipping fontSize="small" />,
  },
  Processing: {
    color: "secondary",
    icon: <SettingsBackupRestore fontSize="small" />,
  },
};

const OrderReport = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportSummary, setReportSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    statuses: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const { token, currentUser } = useSelector((state) => state.auth || {});
  const userRole = currentUser?.role || "user";

  // Apply filters when orders or status filter changes
  useEffect(() => {
    if (orders.length > 0) {
      let filtered = [...orders];

      if (statusFilter !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }

      setFilteredOrders(filtered);
      setCurrentPage(1); // Reset pagination when filter changes
    } else {
      setFilteredOrders([]);
    }
  }, [orders, statusFilter]);

  useEffect(() => {
    if (orders.length > 0) {
      calculateReportSummary();
    }
  }, [orders]);

  // Auto-fetch orders on component mount
  useEffect(() => {
    fetchOrdersByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setStatusFilter("all"); // Reset filter when new data is loaded
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
        return "Delivery Order Report";
      default:
        return "My Order History";
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleActionMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleExportData = () => {
    // Implementation for exporting data
    handleActionMenuClose();

    // Mock implementation - in real app, this would use a proper export library
    alert("Export functionality would be implemented here");
  };

  const handlePrintReport = () => {
    // Implementation for printing
    handleActionMenuClose();
    window.print();
  };

  const handleRefresh = () => {
    handleActionMenuClose();
    fetchOrdersByDate();
  };

  const formattedStart = startDate?.toLocaleDateString() || "";
  const formattedEnd = endDate?.toLocaleDateString() || "";

  // Pagination logic
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        maxWidth: "100%",
        overflowX: "hidden",
        bgcolor: theme.palette.mode === "light" ? "#f5f5f7" : "#121212",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          background: "linear-gradient(to right, #f7f9fc, #ffffff)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom={!isMobile}
            sx={{
              fontWeight: 700,
              color: "primary.main",
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: isMobile ? 2 : 0,
            }}
          >
            {getRoleBasedTitle()}
          </Typography>

          <Box>
            <Tooltip title="Actions">
              <IconButton
                onClick={handleActionMenuOpen}
                sx={{
                  bgcolor: "primary.light",
                  "&:hover": { bgcolor: "primary.main", color: "white" },
                }}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={actionMenuAnchor}
              open={Boolean(actionMenuAnchor)}
              onClose={handleActionMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleRefresh}>
                <Refresh sx={{ mr: 1 }} fontSize="small" />
                Refresh Data
              </MenuItem>
              <MenuItem onClick={handleExportData}>
                <GetApp sx={{ mr: 1 }} fontSize="small" />
                Export to CSV
              </MenuItem>
              <MenuItem onClick={handlePrintReport}>
                <Print sx={{ mr: 1 }} fontSize="small" />
                Print Report
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Date Range Picker */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || new Date())}
            customInput={
              <TextField
                label="Start Date"
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.3)",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: <DateRange color="primary" />,
                }}
              />
            }
            popperPlacement="auto"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || new Date())}
            customInput={
              <TextField
                label="End Date"
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.3)",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: <DateRange color="primary" />,
                }}
              />
            }
            popperPlacement="auto"
          />

          <Button
            variant="contained"
            onClick={fetchOrdersByDate}
            disabled={!startDate || !endDate || isLoading}
            sx={{
              height: isMobile ? 40 : 56,
              px: 4,
              textTransform: "none",
              borderRadius: 2,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 10px rgba(66, 165, 245, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(66, 165, 245, 0.4)",
                background: "linear-gradient(45deg, #1565c0, #1976d2)",
              },
            }}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Search />
              )
            }
          >
            {isLoading ? "Generating..." : "Generate Report"}
          </Button>
        </Stack>

        {/* Error Alerts */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": {
                color: "error.main",
              },
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
      </Paper>

      {/* No Data State */}
      {!isLoading && orders.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            py: 8,
            px: 3,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            bgcolor: "white",
          }}
        >
          <Timeline
            sx={{ fontSize: 84, color: "text.secondary", opacity: 0.7, mb: 2 }}
          />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
            No Orders Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: "auto", mb: 3 }}
          >
            There are no orders in the selected date range. Try selecting a
            different period or refresh the data.
          </Typography>
          <Button
            variant="outlined"
            onClick={fetchOrdersByDate}
            startIcon={<Refresh />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Refresh Data
          </Button>
        </Paper>
      )}

      {/* Data Section */}
      {orders.length > 0 && (
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Primary Card - Total Orders */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  },
                  background: "linear-gradient(135deg, #42a5f5, #1976d2)",
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <LocalMall sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "white" }}
                      >
                        {reportSummary.totalOrders}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Total Sales */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  },
                  background: "linear-gradient(135deg, #66bb6a, #2e7d32)",
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <MonetizationOn sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}
                      >
                        Total Sales
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "white" }}
                      >
                        ₹
                        {reportSummary.totalSales.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Date Range */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  },
                  background: "linear-gradient(135deg, #29b6f6, #0288d1)",
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <DateRange sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}
                      >
                        Date Range
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "white" }}
                      >
                        {formattedStart} - {formattedEnd}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Status Cards */}
            {Object.entries(reportSummary.statuses).map(([status, count]) => {
              const config = statusConfig[status] || {
                color: "default",
                icon: <Assignment />,
              };
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={status}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: `${config.color}.light`,
                            color: `${config.color}.dark`,
                          }}
                        >
                          {config.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {status}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {count}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Filter Controls */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FilterList sx={{ mr: 2, color: "text.secondary" }} />
              <Typography
                variant="subtitle1"
                sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
              >
                Filter by Status:
              </Typography>

              <FormControl
                size={isMobile ? "small" : "medium"}
                sx={{ minWidth: 150 }}
              >
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  {Object.keys(reportSummary.statuses).map((status) => (
                    <MenuItem key={status} value={status}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {statusConfig[status]?.icon && (
                          <Box
                            component="span"
                            sx={{
                              mr: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {statusConfig[status].icon}
                          </Box>
                        )}
                        {status}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Showing {filteredOrders.length} of {orders.length} orders
            </Typography>
          </Paper>

          {/* Orders Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              mb: 3,
              backgroundColor: "background.paper",
            }}
          >
            <TableContainer
              sx={{
                maxHeight: 500,
                "&::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background:
                    theme.palette.mode === "dark" ? "#424242" : "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    theme.palette.mode === "dark" ? "#686868" : "#cccccc",
                  borderRadius: "4px",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark" ? "#858585" : "#888888",
                  },
                },
              }}
            >
              <Table sx={{ minWidth: 700 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        bgcolor: "background.default",
                        borderBottom: "2px solid",
                        borderBottomColor: "divider",
                        py: 2,
                        px: 3,
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        bgcolor: "background.default",
                        borderBottom: "2px solid",
                        borderBottomColor: "divider",
                        py: 2,
                        px: 3,
                      }}
                    >
                      Total Price
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        bgcolor: "background.default",
                        borderBottom: "2px solid",
                        borderBottomColor: "divider",
                        py: 2,
                        px: 3,
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order, index) => {
                      const config = statusConfig[order?.status] || {
                        color: "default",
                        icon: <Assignment fontSize="small" />,
                      };
                      return (
                        <TableRow
                          key={order?._id || index}
                          hover
                          sx={{
                            transition: "background-color 0.2s ease",
                            cursor: "pointer",
                            "&:last-child td": { border: 0 },
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                          onClick={() => handleViewOrder(order)}
                        >
                          <TableCell
                            sx={{
                              py: 1.5,
                              px: 3,
                              verticalAlign: "top",
                            }}
                          >
                            {order?.createdAt ? (
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    color: "text.primary",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "text.secondary",
                                    display: "block",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleTimeString()}
                                </Typography>
                              </Box>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              py: 1.5,
                              px: 3,
                              verticalAlign: "top",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "success.main",
                                fontFamily: "monospace",
                                letterSpacing: 0.5,
                              }}
                            >
                              ₹
                              {order?.totalPrice?.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) || "0.00"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              py: 1.5,
                              px: 3,
                              verticalAlign: "top",
                            }}
                          >
                            <Chip
                              icon={config.icon}
                              label={order?.status || "Unknown"}
                              color={config.color}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                borderRadius: "6px",
                                "& .MuiChip-label": {
                                  px: 1.5,
                                  py: 0.5,
                                },
                                "& .MuiChip-icon": {
                                  ml: 0.5,
                                  mr: 0.5,
                                },
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                        <Box
                          sx={{
                            textAlign: "center",
                            maxWidth: 400,
                            mx: "auto",
                          }}
                        >
                          <Timeline
                            sx={{
                              fontSize: 56,
                              color: "text.secondary",
                              mb: 2,
                              opacity: 0.7,
                            }}
                          />
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            gutterBottom
                          >
                            No matching orders found
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => setStatusFilter("all")}
                            startIcon={
                              <SettingsBackupRestore fontSize="small" />
                            }
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              color: "primary.main",
                              borderColor: "primary.light",
                              mt: 1,
                              "&:hover": {
                                borderColor: "primary.main",
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            Clear Filters
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Pagination */}
          {totalPages > 1 && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 2,
                    fontWeight: 500,
                  },
                  "& .Mui-selected": {
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
                  },
                }}
              />
            </Paper>
          )}
        </Box>
      )}

      {/* Loading Skeleton */}
      {isLoading && orders.length === 0 && (
        <Box sx={{ pt: 3 }}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{
              borderRadius: 4,
              mb: 3,
              bgcolor: "background.paper",
            }}
          />
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{
              borderRadius: 4,
              bgcolor: "background.paper",
            }}
          />
        </Box>
      )}

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default OrderReport;
