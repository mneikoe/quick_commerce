import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const CustomCard = ({ title, description, image, onClick, price }) => {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 4 }}>
      {image && (
        <CardMedia component="img" height="160" image={image} alt={title} />
      )}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        {price && <Typography variant="subtitle1">₹{price}</Typography>}
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={onClick}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
