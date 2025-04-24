import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box
      className="w-full h-screen "
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        // boxShadow: (theme) => theme.shadows[3],
        // borderRadius: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          // borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Welcome back, Admin! Here is an overview of your system.
        </Typography>
        {/* Add charts, summaries, etc. later */}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
