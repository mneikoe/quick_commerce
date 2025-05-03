import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  IconButton,
  Rating,
  Chip,
  useTheme,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../../../actions/CartAction";

const ProductCard = ({
  id,
  image,
  title,
  price,
  mrp,
  category,
  rating = 0,
  unit,
  size,
  stock = 10,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  const cartError = useSelector((state) => state.cart.error);
  const theme = useTheme();

  const [localLoading, setLocalLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const cartItem = cartItems.find((item) => item.productId === id);
  const count = cartItem ? cartItem.quantity : 0;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const isOutOfStock = stock === 0;
  const maxReached = count >= stock;

  const handleAdd = async () => {
    try {
      setLocalLoading(true);

      if (count > 0) {
        await dispatch(updateCartQuantity(id, count + 1));
        setSnackbarMessage("Quantity increased in cart");
      } else {
        await dispatch(
          addToCart({
            productId: id,
            image,
            title,
            size,
            price,
            mrp,
            category,
            quantity: 1,
            unit,
            maxQuantity: stock,
          })
        );
        setSnackbarMessage("Item added to cart");
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update cart");
      setSnackbarOpen(true);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLocalLoading(true);

      if (count === 1) {
        await dispatch(removeFromCart(id));
        setSnackbarMessage("Item removed from cart");
      } else if (count > 1) {
        await dispatch(updateCartQuantity(id, count - 1));
        setSnackbarMessage("Quantity decreased in cart");
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update cart");
      setSnackbarOpen(true);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "12px",
          minWidth: "260px", // Fixed to include 'px' unit
          maxWidth: "100%", // Ensures it doesn't overflow its container
          transition: "all 0.3s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: theme.palette.error.main,
              color: "white",
              fontWeight: "bold",
              zIndex: 1,
            }}
          />
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <Chip
            label="OUT OF STOCK"
            color="default"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
            }}
          />
        )}

        {/* Product Image */}
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "100%", // 1:1 Aspect Ratio
              backgroundColor: "#f5f5f5",
              overflow: "hidden",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <CardMedia
              component="img"
              image={image || "/placeholder-product.jpg"}
              alt={title}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                p: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Link>

        {/* Product Content */}
        <CardContent
          sx={{
            p: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Category */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              mb: 0.5,
              letterSpacing: "0.5px",
              fontSize: "0.7rem",
              color: theme.palette.text.secondary,
            }}
          >
            {category}
          </Typography>

          {/* Title */}
          <Tooltip title={title} placement="top" arrow>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "44px",
                mb: 1,
              }}
            >
              {title}
            </Typography>
          </Tooltip>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={rating}
              readOnly
              precision={0.5}
              size="small"
              sx={{ color: theme.palette.warning.main }}
            />
            <Typography
              variant="caption"
              sx={{ ml: 0.5, color: theme.palette.text.secondary }}
            >
              ({rating})
            </Typography>
          </Box>

          {/* Size */}
          {size && (
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
              }}
            >
              Size: {size}
            </Typography>
          )}

          {/* Price */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              mt: "auto",
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mr: 1,
                color: theme.palette.primary.main,
              }}
            >
              ₹{price}
            </Typography>
            {mrp > price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: theme.palette.text.disabled,
                  mr: 1,
                }}
              >
                ₹{mrp}
              </Typography>
            )}
            {unit && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                /{unit}
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          <Box sx={{ mt: "auto" }}>
            {isOutOfStock ? (
              <Button
                variant="outlined"
                size="small"
                fullWidth
                disabled
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1,
                }}
              >
                Out of Stock
              </Button>
            ) : count === 0 ? (
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={handleAdd}
                disabled={localLoading}
                startIcon={
                  localLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <ShoppingCartIcon fontSize="small" />
                  )
                }
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {localLoading ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme.palette.success.light,
                  borderRadius: "8px",
                  p: 0.5,
                  border: `1px solid ${theme.palette.success.main}`,
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleRemove}
                  disabled={localLoading || count <= 0}
                  sx={{
                    color: theme.palette.success.main,
                    "&:hover": {
                      backgroundColor: theme.palette.success.light,
                    },
                  }}
                >
                  {localLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <RemoveIcon fontSize="small" />
                  )}
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 1,
                    fontWeight: "bold",
                    color: theme.palette.success.dark,
                  }}
                >
                  {count}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleAdd}
                  disabled={localLoading || maxReached}
                  sx={{
                    color: maxReached
                      ? theme.palette.text.disabled
                      : theme.palette.success.main,
                    "&:hover": {
                      backgroundColor: theme.palette.success.light,
                    },
                  }}
                >
                  {localLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <AddIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={cartError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {cartError ? cartError : snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
