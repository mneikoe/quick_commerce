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
import { getMyOrders } from "../actions/OrderAction";
import { useSelector } from "react-redux";
// import axios from "axios";

const ShopkeeperOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { orders: getorders } = useSelector((state) => state.orders);
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await axios.get("/api/orders/shopkeeper/myorders");
  //       setOrders(res.data);
  //     } catch (error) {
  //       console.error("Error fetching shopkeeper orders:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const markOrderReady = async (orderId) => {
  //     try {
  //       const res = await axios.put(`/api/orders/shopkeeper/${orderId}/ready`);
  //       setOrders((prevOrders) =>
  //         prevOrders.map((order) => (order._id === orderId ? res.data : order))
  //       );
  //     } catch (err) {
  //       console.error("Error marking order as ready", err);
  //     }
  //   };

  useEffect(() => {
    getMyOrders();
  }, []);

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
            ) : getorders.length ? (
              getorders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user?.name || "N/A"}</TableCell>
                  <TableCell>
                    {order.deliveryBoy?.name || "Not Assigned"}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.items?.length || 0}</TableCell>
                  <TableCell align="right">
                    {order.status !== "ready" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => markOrderReady(order._id)}
                      >
                        Mark Ready
                      </Button>
                    )}
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
