// src/components/OrderReport.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetOrdersByDateQuery } from "../redux/api/orderApi";

const OrderReport = ({ userRole }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data, isLoading, error, refetch } = useGetOrdersByDateQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const handleGenerateReport = () => {
    refetch();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Order Report ({userRole.charAt(0).toUpperCase() + userRole.slice(1)})
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<TextField label="Start Date" fullWidth />}
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<TextField label="End Date" fullWidth />}
          />

          <Button
            variant="contained"
            onClick={handleGenerateReport}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Generate Report"}
          </Button>
        </Box>

        {error && (
          <Typography color="error">
            Error: {error?.data?.message || "Failed to load orders"}
          </Typography>
        )}

        {data && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Total Orders: {data.count} | Period:{" "}
              {new Date(data.startDate).toLocaleDateString()} -{" "}
              {new Date(data.endDate).toLocaleDateString()}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Status</TableCell>
                    {userRole === "admin" && <TableCell>Shopkeeper</TableCell>}
                    <TableCell>Items</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      {userRole === "admin" && (
                        <TableCell>{order.shopkeeper?.name || "N/A"}</TableCell>
                      )}
                      <TableCell>
                        {order.items.map((item) => (
                          <div key={item.menuItem._id}>
                            {item.quantity}x {item.menuItem.name}
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OrderReport;
