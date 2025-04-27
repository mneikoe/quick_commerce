import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = ({ error }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "5rem", fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
