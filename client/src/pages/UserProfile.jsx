import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getMyOrdersByUser } from "../actions/OrderAction";

const UserProfile = () => {
  const { currentUser: user } = useSelector((s) => s.auth);

  console.log(user);
  const { orders, loading, error } = useSelector((s) => s.getUserOrders);
  console.log(orders), loading, error;

  useEffect(() => {
    getMyOrdersByUser();
  });

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        {/* Profile Section */}
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: "16px",
            padding: 3,
            textAlign: "center",
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Avatar
                alt={user?.name}
                src={user?.avatarUrl || ""}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: 32,
                }}
              >
                {user?.name ? user.name.charAt(0) : "U"}
              </Avatar>
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {user?.name || "Unknown User"}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {user?.email || "No Email Provided"}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {user?.phone || "No Phone Number"}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              disabled
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
