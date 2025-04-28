import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const NoData = ({ message = "No data found", minHeight = 200 }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <Paper sx={{ p: 2, textAlign: "center", maxWidth: 400 }}>
        <Typography variant="h6" color="textSecondary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default NoData;
