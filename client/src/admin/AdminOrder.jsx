import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { confirmOrder } from "../actions/OrderAction";
import Constants from "../constants/Constants";

const AdminOrder = ({ orders }) => {
  const dispatch = useDispatch();

  const handleConfirm = (orderId) => {
    dispatch(confirmOrder(orderId));
    // console.log(orderId);
  };

  // Filter pending orders
  const pendingOrders = orders?.filter(
    (order) => order.status === Constants.ORDER_STATUS.PENDING
  );

  if (!pendingOrders.length) {
    return (
      <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
        No pending orders to confirm.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Pending Orders
      </Typography>

      <List>
        {pendingOrders.map((order) => (
          <ListItem key={order._id} sx={{ mb: 2 }}>
            <Card sx={{ width: "100%", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" color="primary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {order.status}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConfirm(order._id)}
                  >
                    Confirm
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AdminOrder;
