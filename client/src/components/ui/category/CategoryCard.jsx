import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, to }) => {
  return (
    <Card
      component={Link}
      to={to || "#"}
      sx={{
        textDecoration: "none",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        overflow: "hidden",
        height: "100%",
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: 160, // Fixed height
            objectFit: "contain", // Ensures image fills and crops if needed
          }}
        />
      ) : (
        <CardMedia
          sx={{
            height: 160,
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.9rem",
            color: "#999",
          }}
        >
          No Image
        </CardMedia>
      )}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
