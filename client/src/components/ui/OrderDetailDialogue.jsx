import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
import React from "react";

const OrderDetailsDialog = ({ open, handleClose, selectedOrder }) => {
  if (!selectedOrder) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        {/* User Info */}
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <Typography>Name: {selectedOrder.user?.name}</Typography>
        <Typography>Email: {selectedOrder.user?.email}</Typography>
        <Typography>Status: {selectedOrder.user?.status}</Typography>

        {/* Delivery Boy Info */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Delivery Boy Details
        </Typography>
        {typeof selectedOrder.deliveryBoy === "object" &&
        selectedOrder.deliveryBoy !== null ? (
          <>
            <Typography>
              Name: {selectedOrder.deliveryBoy.name || "Not Assigned"}
            </Typography>
            <Typography>
              Email: {selectedOrder.deliveryBoy.email || "N/A"}
            </Typography>
            <Typography>
              Status: {selectedOrder.deliveryBoy.status || "N/A"}
            </Typography>
          </>
        ) : (
          <Typography>Delivery Boy: Not Assigned</Typography>
        )}

        {/* Shopkeeper Info */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Shopkeeper Details
        </Typography>
        {typeof selectedOrder.shopkeeper === "object" &&
        selectedOrder.shopkeeper !== null ? (
          <>
            <Typography>
              Name: {selectedOrder.shopkeeper.name || "Not Assigned"}
            </Typography>
            <Typography>
              Email: {selectedOrder.shopkeeper.email || "N/A"}
            </Typography>
            <Typography>
              Status: {selectedOrder.shopkeeper.status || "N/A"}
            </Typography>
          </>
        ) : (
          <Typography>Shopkeeper: Not Assigned</Typography>
        )}

        {/* Order Info */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Order Info
        </Typography>
        <Typography>Status: {selectedOrder.status}</Typography>
        <Typography>Total Price: ₹{selectedOrder.totalPrice}</Typography>

        {/* Items Table */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Items
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder.items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.menuItem?.title || "Unknown"}</TableCell>
                <TableCell>₹{item.menuItem?.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.menuItem?.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
