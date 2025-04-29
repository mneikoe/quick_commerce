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
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 5,
        },
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: { xs: 140, md: 160 },
            objectFit: "cover",
          }}
        />
      ) : (
        <CardMedia
          sx={{
            height: { xs: 140, md: 160 },
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
      <CardContent
        sx={{
          textAlign: "center",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
