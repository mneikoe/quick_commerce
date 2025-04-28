import React, { useEffect } from "react";
import { getMyOrdersByUser } from "../actions/OrderAction";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { orders } = useSelector((s) => s.getUserOrders);
  console.log(orders);
  useEffect(() => {
    getMyOrdersByUser();
  });
  return <div>user dashboad</div>;
};

export default UserDashboard;
