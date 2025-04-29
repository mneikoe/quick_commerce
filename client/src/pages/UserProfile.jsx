import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { currentUser: user } = useSelector((s) => s.auth);

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 4}
      justifyContent="center"
      p={isMobile ? 2 : 4}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Card
          sx={{
            boxShadow: 6,
            borderRadius: 4,
            p: isMobile ? 2 : 4,
            textAlign: "center",
            background: "linear-gradient(to bottom right, #ffffff, #f9fafb)",
            "&:hover": {
              boxShadow: 10,
              transform: "scale(1.01)",
            },
          }}
        >
          <CardContent>
            <Avatar
              alt={user?.name}
              src={user?.avatarUrl || ""}
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#4caf50",
                fontSize: 36,
                fontWeight: "bold",
                mb: 2,
                mx: "auto",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <Typography variant="h6" fontWeight="bold">
              {user?.name || "Unknown User"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "No Email Provided"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {user?.phone || "No Phone Number"}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disabled
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
