import React from "react";

const UserOrder = () => {
  const { orders } = useSelector((s) => s.getUserOrders);
  console.log(orders);
  return <div>UserOrder</div>;
};

export default UserOrder;
