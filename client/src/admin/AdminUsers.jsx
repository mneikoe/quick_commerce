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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import { format } from "date-fns";
import { listUsers, verifyUser } from "../actions/userAction";
import NoData from "../components/ui/NoData";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userList);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleVerify = async (userId) => {
    await dispatch(verifyUser(userId));
    dispatch(listUsers());
  };

  const filteredUsers = Array.isArray(users?.users)
    ? users.users.filter(
        (user) =>
          (selectedRole ? user.role === selectedRole : true) &&
          (user.role === "shopkeeper" || user.role === "deliveryboy")
      )
    : [];

  if (loading) {
    return <Loader />;
  }

  return (
    <Box p={4}>
      <Typography variant="h5">User Management</Typography>
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel id="role-select-label">Filter by Role</InputLabel>
        <Select
          labelId="role-select-label"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          label="Filter by Role"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="shopkeeper">Shopkeeper</MenuItem>
          <MenuItem value="deliveryboy">Delivery Boy</MenuItem>
        </Select>
      </FormControl>

      {/* Check if filteredUsers is empty and display "No data found" message */}
      {filteredUsers.length === 0 ? (
        <NoData message="No user Found" />
      ) : (
        <Table>
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
      )}
    </Box>
  );
};

export default AdminUsers;
