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
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../../../actions/CartAction";

const ProductCard = ({
  id,
  image,
  title,
  size,
  price,
  mrp,
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const theme = useTheme();

  const cartItem = cartItems.find((item) => item.productId === id);
  const count = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (count > 0) {
      dispatch(updateCartQuantity(id, count + 1));
    } else {
      dispatch(
        addToCart({
          productId: id,
          image,
          title,
          size,
          price,
          category,
          quantity: 1,
        })
      );
    }
  };

  const handleRemove = () => {
    if (count === 1) {
      dispatch(removeFromCart(id));
    } else if (count > 1) {
      dispatch(updateCartQuantity(id, count - 1));
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        // width: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
        transition: "0.3s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Link to={`/product/${id}`}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: { xs: 180, sm: 200, md: 220 },
            width: "100%",
            objectFit: "contain",
            // objectFit: "contain",
            objectPosition: "center",
            // p: 2,
            backgroundColor: "#f9f9f9",
            p: 1,
          }}
        />
      </Link>

      <CardContent sx={{ flexGrow: 1, textAlign: "center", px: 1 }}>
        <Typography variant="body2" sx={{ color: "gray", mb: 0.5 }} noWrap>
          {category}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#212121",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        <Rating
          value={rating}
          readOnly
          precision={0.5}
          size="small"
          sx={{ mt: 0.5 }}
        />

        {size && (
          <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
            Size: {size}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            px: 0.5,
          }}
        >
          <Box textAlign="left">
            <Typography variant="body1" fontWeight="bold">
              ₹{price}
            </Typography>
            {mrp && mrp > price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "0.8rem",
                }}
              >
                ₹{mrp}
              </Typography>
            )}
          </Box>

          {/* Add/Remove Buttons */}
          {count === 0 ? (
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                px: 2,
                borderRadius: 1,
              }}
              onClick={handleAdd}
            >
              ADD
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.success.main,
                borderRadius: 1,
                px: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={handleRemove}
                sx={{ color: "#fff" }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ mx: 1, fontWeight: "bold", color: "#fff" }}
              >
                {count}
              </Typography>
              <IconButton
                size="small"
                onClick={handleAdd}
                sx={{ color: theme.palette.primary.light }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
