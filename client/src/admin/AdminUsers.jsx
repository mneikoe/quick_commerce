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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import { format } from "date-fns";
import { listUsers, verifyUser } from "../actions/userAction";
import NoData from "../components/ui/NoData";
import { showToast } from "../components/ui/ShowToast";
import SelectBox from "../components/ui/SelectBox";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { users, loading } = useSelector((state) => state.userList);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleVerify = async (userId) => {
    await dispatch(verifyUser(userId));
    showToast("Verified user successfully", "success");
    dispatch(listUsers());
  };

  const filteredUsers = Array.isArray(users?.users)
    ? users.users.filter(
        (user) =>
          (selectedRole ? user.role === selectedRole : true) &&
          (user.role === "shopkeeper" || user.role === "deliveryboy")
      )
    : [];

  if (loading) return <Loader />;

  return (
    <Box p={isMobile ? 2 : 4}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" fontWeight="bold">
            User Management
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          spacing={1}
          justifyContent="flex-end"
        >
          <Grid item xs={8} sm={9}>
            <SelectBox
              label="Filter by Role"
              name="role"
              fullWidth
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: "shopkeeper", label: "Shopkeeper" },
                { value: "deliveryboy", label: "Delivery Boy" },
              ]}
              placeholder="Select the role"
            />
          </Grid>
        </Grid>
      </Grid>

      {filteredUsers.length === 0 ? (
        <NoData message="No user Found" />
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {user.createdAt
                      ? format(new Date(user.createdAt), "dd MMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.isVerified ? "success" : "primary"}
                      size="small"
                      disabled={user.isVerified}
                      onClick={() => {
                        if (!user.isVerified) handleVerify(user._id);
                      }}
                    >
                      {user.isVerified ? "Verified" : "Verify"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default AdminUsers;
