import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7", // Same background color as login page
        textAlign: "center",
        padding: 3,
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h4" component="h1" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          The page you're looking for doesn't exist. Please check the URL or go
          back to the dashboard.
        </Typography>
        <Button
          component={Link}
          to="/admin" // or "/" depending on where you want the user to go
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Go to Dashboard
        </Button>
      </Container>
    </Box>
  );
};

export default PageNotFound;
