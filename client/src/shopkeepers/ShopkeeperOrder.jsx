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
import {
  confirmOrderReady,
  getAllOrders,
  getMyOrders,
} from "../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import Constants from "../constants/Constants";
// import axios from "axios";

const ShopkeeperOrders = () => {
  // const [orders, setOrders] = useState([]);

  const { orders, loading, error } = useSelector((state) => state.getMyOrders);
  const dispatch = useDispatch();
  console.log(orders, loading, error);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" fontWeight="bold" mb={3}>
          My Orders
        </Typography>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : orders.length ? (
              orders.map((order) => (
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
                      onClick={() => dispatch(confirmOrderReady(order._id))}
                    >
                      {order.status === Constants.ORDER_STATUS.READY
                        ? "Already Ready"
                        : "Mark Ready"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ShopkeeperOrders;
