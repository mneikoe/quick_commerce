// AssignOrderForm.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { assignOrder } from "../actions/OrderAction";
import { fetchUsersByRole } from "../actions/userAction";
import Constants from "../constants/Constants";

const AssignOrderForm = ({ orderId }) => {
  const dispatch = useDispatch();

  const {
    shopkeeper = [],
    deliveryboy = [],
    loading,
    error,
  } = useSelector((state) => state.userList);

  const [shopkeeperId, setShopkeeperId] = useState("");
  const [deliveryBoyId, setDeliveryBoyId] = useState("");
  console.log(shopkeeperId, deliveryBoyId); //her blank nothing show 
  const [isAssigned, setIsAssigned] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersByRole(Constants.USER_ROLE.SHOPKEEPER));
    dispatch(fetchUsersByRole(Constants.USER_ROLE.DELIVERYBOY));
  }, [dispatch]);

  const handleAssign = () => {
    if (shopkeeperId && deliveryBoyId) {
      dispatch(assignOrder(orderId, shopkeeperId, deliveryBoyId));
      setIsAssigned(true);
    } else {
      alert("Please select both shopkeeper and delivery boy.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 3,
        maxWidth: 500,
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
        Assign Order
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Select a shopkeeper and a delivery boy to assign this order.
      </Typography>

      {loading && (
        <Box textAlign="center" my={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {isAssigned ? (
        <Alert severity="success" sx={{ mt: 3 }}>
          Order has been successfully assigned!
        </Alert>
      ) : (
        <Stack spacing={3} mt={3}>
          <FormControl fullWidth>
            <InputLabel id="shopkeeper-label">Shopkeeper</InputLabel>
            <Select
              labelId="shopkeeper-label"
              value={shopkeeperId}
              onChange={(e) => setShopkeeperId(e.target.value)}
              label="Shopkeeper"
              disabled={loading}
            >
              {shopkeeper?.users?.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="delivery-label">Delivery Boy</InputLabel>
            <Select
              labelId="delivery-label"
              value={deliveryBoyId}
              onChange={(e) => setDeliveryBoyId(e.target.value)}
              label="Delivery Boy"
              disabled={loading}
            >
              {deliveryboy?.users?.map((d) => (
                <MenuItem key={d._id} value={d._id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAssign}
            disabled={!shopkeeperId || !deliveryBoyId || loading}
            fullWidth
            sx={{ textTransform: "none", py: 1.2 }}
          >
            Assign Order
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default AssignOrderForm;
