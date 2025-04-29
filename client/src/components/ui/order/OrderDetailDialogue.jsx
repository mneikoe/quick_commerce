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
        {typeof selectedOrder.user === "object" &&
          selectedOrder.user !== null && (
            <>
              <Typography variant="h6" gutterBottom>
                User Details
              </Typography>
              <Typography>Name: {selectedOrder.user.name || "N/A"}</Typography>
              <Typography>
                Email: {selectedOrder.user.email || "N/A"}
              </Typography>
              <Typography>
                Status: {selectedOrder.user.status || "N/A"}
              </Typography>
            </>
          )}

        {/* Delivery Boy Info */}
        {typeof selectedOrder.deliveryBoy === "object" &&
          selectedOrder.deliveryBoy !== null && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Delivery Boy Details
              </Typography>
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
          )}

        {/* Shopkeeper Info */}
        {typeof selectedOrder.shopkeeper === "object" &&
          selectedOrder.shopkeeper !== null && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Shopkeeper Details
              </Typography>
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
          )}

        {/* Order Info */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Order Info
        </Typography>
        <Typography>Status: {selectedOrder.status || "N/A"}</Typography>
        <Typography>Total Price: ₹{selectedOrder.totalPrice || 0}</Typography>

        {/* Items Table */}
        {selectedOrder.items && selectedOrder.items.length > 0 && (
          <>
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
                {selectedOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.menuItem?.title || "Unknown"}</TableCell>
                    <TableCell>₹{item.menuItem?.price || 0}</TableCell>
                    <TableCell>{item.quantity || 0}</TableCell>
                    <TableCell>
                      ₹{(item.menuItem?.price || 0) * (item.quantity || 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
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
