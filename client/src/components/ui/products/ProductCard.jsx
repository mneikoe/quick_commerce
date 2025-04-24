import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
// image, title,short desciroptiion,price,mrp,disocunt,size(weight),ratings,a to cart and buy button ,wishlistbadges
const ProductCard = ({ id, image, title, size, price, mrp }) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => setCount(count + 1);
  const handleRemove = () => setCount(count > 0 ? count - 1 : 0);

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
          sx={{ height: 240, width: "100%", objectFit: "cover" }}
        />
      </Link>
      <CardContent sx={{ px: 1, textAlign: "center" }}>
        {/* Title */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#212121" }}
        >
          {title}
        </Typography>

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
