import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getMyOrdersByDdeliveryBoy,
} from "../actions/OrderAction";
const DeliveryBoyOrders = () => {
  const { orders, error, loading } = useSelector((s) => s.deliveryBoyOrders);
  const { orders: ord } = useSelector((s) => s.deliveryBoyOrders);
  const { orders: ordeers } = useSelector((s) => s.allOrders);
  console.log(orders, error, loading);
  console.log(ord, error, loading);
  console.log(ordeers, error, loading);
  useEffect(() => {
    getMyOrdersByDdeliveryBoy();
    getAllOrders();
  });
  return <div>DeliveryBoyOrders</div>;
};

export default DeliveryBoyOrders;
