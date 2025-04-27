import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  IconButton,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../../../actions/CartAction";
// image, title,short desciroptiion,price,mrp,disocunt,size(weight),ratings,a to cart and buy button ,wishlistbadges
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

  const cartItem = cartItems.find((item) => item.productId === id);
  // console.log("cartItem id", cartItem);
  const count = cartItem ? cartItem.quantity : 0;
  // const [ratingValue, setRatingValue] = useState(rating);

  const handleAdd = () => {
    // console.log("Adding item to cart", id); // Check if ID is correct
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

    // Check the updated cart state
    // console.log("Updated cart:", cartItems);
  };

  // console.log("Updated cart:", cartItems);

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
        p: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Link to={`/product/${id}`}>
        <CardMedia
          component="img"
          image={image}
          srcSet={`${image}?w=400 400w, ${image}?w=800 800w, ${image}?w=1200 1200w`} // Using srcSet for responsive image sizes
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt={title}
          sx={{ height: 240, width: "100%", objectFit: "contain" }}
        />
      </Link>
      <CardContent sx={{ px: 1, textAlign: "center" }}>
        {/* cateogry */}
        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
          {category}
        </Typography>
        {/* Title */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#212121" }}
        >
          {title}
        </Typography>
        <Rating
          name="rating"
          value={rating}
          readOnly
          precision={0.5}
          size="small"
          sx={{ mt: 1 }}
        />

        {/* Size */}
        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
          {size}
        </Typography>

        {/* Price & Counter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "black" }}
            >
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

          {/* Add/Remove Controls */}
          {count === 0 ? (
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#60b246",
                borderColor: "#60b246",
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
                backgroundColor: "green",
                borderRadius: "4px",
              }}
            >
              <IconButton
                size="small"
                onClick={handleRemove}
                sx={{ color: "white" }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ mx: 1, fontWeight: "bold", color: "white" }}>
                {count}
              </Typography>
              <IconButton
                size="small"
                onClick={handleAdd}
                sx={{ color: "white" }}
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
