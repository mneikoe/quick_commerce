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
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { format } from "date-fns";

const OrderDetailsDialog = ({ open, handleClose, selectedOrder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!selectedOrder) return null;

  const formatDate = (date) =>
    date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : "N/A";

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        {/* User Info */}
        {selectedOrder.user && typeof selectedOrder.user === "object" && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {selectedOrder.user.name || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {selectedOrder.user.email || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {selectedOrder.user.status || "N/A"}
            </Typography>
          </Box>
        )}

        {/* Delivery Boy Info */}
        {selectedOrder.deliveryBoy &&
          typeof selectedOrder.deliveryBoy === "object" && (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Delivery Boy Details
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong>{" "}
                {selectedOrder.deliveryBoy.name || "Not Assigned"}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong>{" "}
                {selectedOrder.deliveryBoy.email || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong>{" "}
                {selectedOrder.deliveryBoy.status || "N/A"}
              </Typography>
            </Box>
          )}

        {/* Shopkeeper Info */}
        {selectedOrder.shopkeeper &&
          typeof selectedOrder.shopkeeper === "object" && (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Shopkeeper Details
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong>{" "}
                {selectedOrder.shopkeeper.name || "Not Assigned"}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong>{" "}
                {selectedOrder.shopkeeper.email || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong>{" "}
                {selectedOrder.shopkeeper.status || "N/A"}
              </Typography>
            </Box>
          )}

        {/* Order Info */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Order Info
          </Typography>
          <Typography variant="body2">
            <strong>Status:</strong> {selectedOrder.status || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Total Price:</strong> ₹{selectedOrder.totalPrice || 0}
          </Typography>
          <Typography variant="body2">
            <strong>Created At:</strong> {formatDate(selectedOrder.createdAt)}
          </Typography>
        </Box>

        {/* Items Table */}
        {selectedOrder.items?.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Item Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
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
