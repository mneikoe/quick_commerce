import { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  ShoppingBasket,
  AssignmentTurnedIn,
  RadioButtonUnchecked,
} from "lucide-react";

// Constants for order status
const ORDER_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
};

export default function CompactOrderTimeline() {
  // Sample data - in a real app, this would come from props
  const [orders, setOrders] = useState([
    {
      id: "ORD-123",
      status: ORDER_STATUS.DELIVERED,
      date: "2025-04-25",
      items: "Laptop",
      total: "$1299",
    },
    {
      id: "ORD-124",
      status: ORDER_STATUS.SHIPPED,
      date: "2025-04-27",
      items: "Headphones",
      total: "$129",
    },
  ]);

  // Filter delivered orders
  const deliveredOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.DELIVERED
  );
  const pendingOrders = orders.filter(
    (order) => order.status !== ORDER_STATUS.DELIVERED
  );

  // For demo, showing status of the first non-delivered order
  const currentStatus =
    pendingOrders.length > 0 ? pendingOrders[0].status : null;

  return (
    <Box className="p-4 max-w-lg">
      {/* Compact Timeline */}
      {currentStatus && (
        <Box className="mb-6">
          <Typography variant="h6" className="text-lg font-medium mb-3">
            Order Status
          </Typography>
          <CompactTimeline currentStatus={currentStatus} />
        </Box>
      )}

      {/* Delivered Orders Table */}
      {deliveredOrders.length > 0 && (
        <Box className="mt-6">
          <Typography variant="h6" className="text-lg font-medium mb-3">
            Delivered Orders
          </Typography>
          <TableContainer component={Paper} className="shadow-sm">
            <Table size="small">
              <TableHead className="bg-gray-50">
                <TableRow>
                  <TableCell className="font-medium">Order ID</TableCell>
                  <TableCell className="font-medium">Date</TableCell>
                  <TableCell className="font-medium">Items</TableCell>
                  <TableCell className="font-medium">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

function CompactTimeline({ currentStatus }) {
  const statusSteps = Object.values(ORDER_STATUS);
  const currentIndex = statusSteps.findIndex(
    (s) => s.toLowerCase() === currentStatus.toLowerCase()
  );

  const statusIcons = {
    [ORDER_STATUS.PENDING]: <ShoppingBasket size={16} />,
    [ORDER_STATUS.CONFIRMED]: <CheckCircle size={16} />,
    [ORDER_STATUS.SHIPPED]: <LocalShipping size={16} />,
    [ORDER_STATUS.DELIVERED]: <AssignmentTurnedIn size={16} />,
  };

  const getStatusColor = (index) => {
    if (index < currentIndex) return "text-green-500 bg-green-100";
    if (index === currentIndex) return "text-blue-500 bg-blue-100";
    return "text-gray-400 bg-gray-100";
  };

  return (
    <Box className="relative pl-6">
      {/* Vertical timeline line */}
      <Box
        className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"
        style={{ transform: "translateX(-50%)" }}
      />

      {/* Timeline items */}
      {statusSteps.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const colorClasses = getStatusColor(index);

        return (
          <Box key={status} className="relative mb-4 last:mb-0">
            {/* Timeline dot */}
            <Box
              className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${colorClasses}`}
              style={{ transform: "translateX(-50%)" }}
            >
              {statusIcons[status] || <RadioButtonUnchecked size={16} />}
            </Box>

            {/* Content */}
            <Box className="pl-6">
              <Typography
                className={`text-sm ${isCurrent ? "font-semibold" : ""} ${isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-500"}`}
              >
                {status}
                {isCurrent && (
                  <Box className="inline-block ml-2 px-1 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                    Current
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
