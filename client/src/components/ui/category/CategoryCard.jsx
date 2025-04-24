import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, to }) => {
  return (
    <Card
      component={Link}
      to={to || "#"}
      sx={{
        p: 1,
        textDecoration: "none",
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 4,
        },
        width: "auto", // Ensure each card takes up the full available width in the carousel
      }}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            height: 180,
            width: "100%",
            objectFit: "cover", // Ensures the image covers the space without distortion
            borderRadius: 2,
          }}
        />
      )}
      <CardContent sx={{ textAlign: "center", px: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#212121" }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
