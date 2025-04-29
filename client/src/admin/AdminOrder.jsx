import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
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

const AdminOrder = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    orders: allOrders,
    loading: allOrdersLoading,
    error: allOrdersError,
  } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.userList);
  const { currentUser } = useSelector((s) => s.auth);
  console.log(allOrders);
  const [shopkeeperId, setShopkeeperId] = useState("");
  const [deliveryBoyId, setDeliveryBoyId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const shopkeepers =
    users?.users?.filter(
      (user) => user.role === "shopkeeper" && user.isVerified
    ) || [];

  const deliveryBoys =
    users?.users?.filter(
      (user) => user.role === "deliveryboy" && user.isVerified
    ) || [];

  useEffect(() => {
    dispatch(clearAllOrders());
    dispatch(getAllOrders());
    dispatch(listUsers());

    const intervalId = setInterval(() => {
      dispatch(getAllOrders());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleConfirmOrder = async (orderId) => {
    try {
      await dispatch(confirmOrder(orderId));
      dispatch(getAllOrders());
      showToast("Order Confirmed Successfully!", "success");
    } catch {
      showToast("Failed to Confirm Order!", "error");
    }
  };

  const handleAssignOrder = async () => {
    if (!shopkeeperId || !deliveryBoyId || !selectedOrderId) {
      return showToast("Please select all fields", "error");
    }
    try {
      await dispatch(assignOrder(selectedOrderId, shopkeeperId, deliveryBoyId));
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

  const renderOrderSection = (title, filterStatus, actions = null) => {
    const orders = allOrders.filter((order) => order.status === filterStatus);

    return (
      <Box
        sx={{
          mt: 4,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 700, color: theme.palette.text.primary }}
        >
          {title}
        </Typography>

        {orders.length === 0 ? (
          <Typography>No {filterStatus} orders.</Typography>
        ) : (
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order._id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>Order ID: {order._id}</Typography>

                  {filterStatus === "pending" && (
                    <Box mt={2} display="flex" gap={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleConfirmOrder(order._id)}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => openOrderDetailsDialog(order)}
                      >
                        View Details
                      </Button>
                    </Box>
                  )}

                  {filterStatus === "confirmed" && (
                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                      <SelectBox
                        label="Shopkeeper"
                        name="shopkeeper"
                        value={shopkeeperId}
                        onChange={(e) => {
                          setShopkeeperId(e.target.value);
                          setSelectedOrderId(order._id);
                        }}
                        options={shopkeepers.map((sk) => ({
                          label: sk.name,
                          value: sk._id,
                        }))}
                        placeholder="Select Shopkeeper"
                      />

                      <SelectBox
                        label="Delivery Boy"
                        name="deliveryBoy"
                        value={deliveryBoyId}
                        onChange={(e) => {
                          setDeliveryBoyId(e.target.value);
                          setSelectedOrderId(order._id);
                        }}
                        options={deliveryBoys.map((db) => ({
                          label: db.name,
                          value: db._id,
                        }))}
                        placeholder="Select Delivery Boy"
                      />

                      <Box display="flex" gap={2}>
                        <Button variant="contained" onClick={handleAssignOrder}>
                          Assign
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => openOrderDetailsDialog(order)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {["assigned", "ready", "pickedup", "delivered"].includes(
                    filterStatus
                  ) && (
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        onClick={() => openOrderDetailsDialog(order)}
                      >
                        View Details
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  if (allOrdersError) {
    showToast("Error during get all orders", "error");
    return <Typography color="error">Error: {allOrdersError}</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4, bgcolor: theme.palette.background.paper } }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Admin Orders
      </Typography>

      {renderOrderSection("Pending Orders", "pending")}
      {renderOrderSection(
        "Confirmed Orders (Assign Shopkeeper & DeliveryBoy)",
        "confirmed"
      )}
      {renderOrderSection("Assigned Orders", "assigned")}
      {renderOrderSection("Ready Orders", "ready")}
      {renderOrderSection("Picked Up Orders", "pickedup")}
      {renderOrderSection("Delivered Orders", "delivered")}

      <OrderDetailsDialog
        open={dialogOpen}
        handleClose={closeOrderDetailsDialog}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default AdminOrder;
