import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Skeleton,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import { format } from "date-fns";
import { listUsers, verifyUser } from "../actions/userAction";
import NoData from "../components/ui/NoData";
import { showToast } from "../components/ui/ShowToast";
import {
  VerifiedUser,
  HowToReg,
  Person,
  DeliveryDining,
  FilterList,
  Refresh,
} from "@mui/icons-material";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { users } = useSelector((state) => state.userList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(listUsers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleVerify = async (userId) => {
    try {
      await dispatch(verifyUser(userId));
      showToast("User verified successfully", "success");
      dispatch(listUsers());
    } catch (error) {
      showToast("Verification failed", "error");
    }
  };

  const filteredUsers = Array.isArray(users?.users)
    ? users.users.filter(
        (user) =>
          (selectedRole ? user.role === selectedRole : true) &&
          (user.role === "shopkeeper" || user.role === "deliveryboy")
      )
    : [];

  const getRoleChip = (role) => (
    <Chip
      label={role}
      size="small"
      icon={
        role === "shopkeeper" ? (
          <Person fontSize="small" />
        ) : (
          <DeliveryDining fontSize="small" />
        )
      }
      sx={{
        backgroundColor:
          role === "shopkeeper"
            ? theme.palette.info.light
            : theme.palette.warning.light,
        color: theme.palette.getContrastText(
          role === "shopkeeper"
            ? theme.palette.info.light
            : theme.palette.warning.light
        ),
      }}
    />
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      {/* Header Section */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "#fff",
          boxShadow: theme.shadows[3],
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {filteredUsers.length} {selectedRole ? selectedRole : "staff"}{" "}
              accounts
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Refresh data">
              <IconButton
                onClick={() => dispatch(listUsers())}
                sx={{ color: "#fff" }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <FilterList color="action" />
              </Grid>
              <Grid item xs>
                <Select
                  fullWidth
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => selected || "All Roles"}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  <MenuItem value="shopkeeper">Shopkeepers</MenuItem>
                  <MenuItem value="deliveryboy">Delivery Boys</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* User List */}
      {loading ? (
        <Box sx={{ p: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={60}
              sx={{ mb: 2, borderRadius: 2 }}
            />
          ))}
        </Box>
      ) : filteredUsers.length === 0 ? (
        <NoData
          message="No users found"
          icon={<Person sx={{ fontSize: 64, color: "text.disabled" }} />}
        />
      ) : (
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: theme.shadows[1],
            width: "100%",
            overflowX: "auto", // Add horizontal scroll
          }}
        >
          {/* Add minWidth to table container to maintain table structure */}
          <Box
            sx={{
              minWidth: 600, // Minimum width for smaller screens
              width: "100%",
            }}
          >
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead
                sx={{
                  bgcolor: theme.palette.background.default,
                  position: "sticky", // Sticky header for vertical scroll
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>{/* Keep header cells as before */}</TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow
                    key={user._id}
                    hover
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? 1 : 2, // Adjust gap for mobile
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.secondary.main,
                            width: 32,
                            height: 32, // Smaller avatar for mobile
                          }}
                        >
                          {user.name[0]}
                        </Avatar>
                        <div>
                          <Typography fontWeight={500} noWrap>
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap // Prevent text wrapping
                          >
                            {user.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    {/* Other cells remain the same but add noWrap */}
                    <TableCell sx={{ minWidth: 120 }}>
                      {getRoleChip(user.role)}
                    </TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      <Chip
                        label={user.isVerified ? "Verified" : "Pending"}
                        color={user.isVerified ? "success" : "warning"}
                        icon={user.isVerified ? <VerifiedUser /> : <HowToReg />}
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {user.createdAt &&
                        format(new Date(user.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 120 }}>
                      {isMobile ? ( // Mobile-friendly button
                        <Tooltip
                          title={user.isVerified ? "Verified" : "Verify"}
                        >
                          <IconButton
                            color={user.isVerified ? "success" : "primary"}
                            disabled={user.isVerified}
                            onClick={() => handleVerify(user._id)}
                            size="small"
                          >
                            {user.isVerified ? <VerifiedUser /> : <HowToReg />}
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Button
                          variant={user.isVerified ? "contained" : "outlined"}
                          color={user.isVerified ? "success" : "primary"}
                          size="small"
                          disabled={user.isVerified}
                          onClick={() => handleVerify(user._id)}
                          startIcon={
                            user.isVerified ? <VerifiedUser /> : <HowToReg />
                          }
                          sx={{ borderRadius: 2 }}
                        >
                          {user.isVerified ? "Verified" : "Verify"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AdminUsers;
