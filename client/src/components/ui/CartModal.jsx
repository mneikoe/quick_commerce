import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Button,
  Slide,
  DialogActions,
  DialogContentText,
  Dialog as MuiDialog,
  useTheme,
  TextField,
} from "@mui/material";
import { X, Plus, Minus, Trash, ShoppingCart } from "lucide-react";

import { removeFromCart, updateCartQuantity } from "../../actions/CartAction";
import { placeOrder } from "../../actions/OrderAction";

import CART_CONSTANTS from "../../constants/CartConstants";

import { showToast } from "../../components/ui/ShowToast";

const CartModal = ({ open, handleClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const dispatch = useDispatch();
  const theme = useTheme();
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const { currentUser } = useSelector((s) => s.auth);

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartQuantity(item.productId, item.quantity - 1));
    } else {
      dispatch(removeFromCart(item.productId));
    }
  };

  const handleIncrease = (item) => {
    dispatch(updateCartQuantity(item.productId, item.quantity + 1));
  };

  const clearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.productId)));
    setClearConfirmOpen(false);
  };

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems.map((item) => ({
        menuItem: item.productId,
        quantity: item.quantity,
      })),

      totalPrice: getTotal(),
      deliveryAddress: deliveryAddress || currentUser?.address,
    };

    dispatch(placeOrder(orderData));

    showToast("Order placed successfully", "success");
    dispatch({ type: CART_CONSTANTS.CLEAR_CART });
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        PaperProps={{
          sx: { borderRadius: 3, minHeight: { xs: "60vh", sm: "auto" } },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
          }}
        >
          <Typography fontWeight={600}>Your Cart</Typography>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "30vh",
                gap: 2,
              }}
            >
              <ShoppingCart size={48} />
              <Typography variant="h6">Your cart is empty.</Typography>
            </Box>
          ) : (
            cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #eee",
                  borderRadius: 2,
                  p: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flex: "1 1 60%", minWidth: 200 }}>
                  <Typography fontWeight={600} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.size}
                  </Typography>
                  <Typography variant="subtitle2" mt={0.5}>
                    ₹{item.price} x {item.quantity} = ₹
                    {item.price * item.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDecrease(item)}
                    sx={{ border: "1px solid #ccc" }}
                  >
                    <Minus size={16} />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleIncrease(item)}
                    sx={{ border: "1px solid #ccc" }}
                  >
                    <Plus size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    sx={{ color: "error.main" }}
                  >
                    <Trash size={16} />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
          <TextField
            fullWidth
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>

        {cartItems.length > 0 && (
          <Box sx={{ p: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">₹{getTotal()}</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  bgcolor: theme.palette.error.main,
                  color: theme.palette.error.light,
                  ":hover": {
                    bgcolor: theme.palette.error.dark,
                    color: theme.palette.primary.light,
                  },
                }}
                startIcon={<Trash size={16} />}
                onClick={() => setClearConfirmOpen(true)}
                fullWidth
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                fullWidth
              >
                Place Order
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* Clear Cart Confirmation Dialog */}
      <MuiDialog
        open={clearConfirmOpen}
        onClose={() => setClearConfirmOpen(false)}
      >
        <DialogTitle>Clear Cart?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all items from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={clearCart}>
            Clear
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

export default CartModal;
