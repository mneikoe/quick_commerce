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
  TableContainer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { confirmOrderReady, getMyOrders } from "../actions/OrderAction";
import { showToast } from "../components/ui/ShowToast";
import OrderDetailsDialog from "../components/ui/order/OrderDetailDialogue";
import NoData from "../components/ui/NoData";
import Constants from "../constants/Constants";

const ShopkeeperOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.getMyOrders);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());

    const intervalId = setInterval(() => {
      dispatch(getMyOrders());
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      setCurrentOrders((prevOrders) => {
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
  }, [orders]);

  const handleConfirmOrderReady = (orderId) => {
    dispatch(confirmOrderReady(orderId));
    dispatch(getMyOrders());
    showToast("Order marked as ready successfully", "success");
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

        {currentOrders.length === 0 ? (
          <NoData message="No orders ready" />
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Delivery Boy</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Items Count</TableCell>
                  <TableCell align="center">Actions</TableCell>
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "row", sm: "row" },
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          disabled={
                            order.status === Constants.ORDER_STATUS.READY
                          }
                          onClick={() => handleConfirmOrderReady(order._id)}
                        >
                          {order.status === Constants.ORDER_STATUS.READY
                            ? "Already Ready"
                            : "Mark Ready"}
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() =>
                            setOpenDialog(true) || setSelectedOrder(order)
                          }
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

      <OrderDetailsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        selectedOrder={selectedOrder}
      />
    </Box>
  );
};

export default ShopkeeperOrders;
