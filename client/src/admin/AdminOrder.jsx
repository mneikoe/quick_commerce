import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  assignOrder,
  getAllOrders,
} from "../actions/OrderAction";
import { listUsers } from "../actions/userAction";
import { showToast } from "../components/ui/ShowToast";

const AdminOrder = () => {
  const dispatch = useDispatch();

  const {
    orders: allOrders,
    loading: allOrdersLoading,
    error: allOrdersError,
  } = useSelector((state) => state.allOrders);

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.userList);
  console.log(usersLoading, usersError);
  const [shopkeeperId, setShopkeeperId] = useState("");
  const [deliveryBoyId, setDeliveryBoyId] = useState("");
  const { currentUser, token } = useSelector((s) => s.auth);

  const shopkeepers = users?.users?.filter(
    (user) => user.role === "shopkeeper"
  );
  const deliveryBoys = users?.users?.filter(
    (user) => user.role === "deliveryBoy"
  );
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(listUsers());
  }, [dispatch]);
  useEffect(() => {
    console.log("--- Admin Orders Page Logs ---");

    console.log("All orders fetched:", allOrders);
    console.log("All orders loading:", allOrdersLoading);
    console.log("All orders error:", allOrdersError);
    console.log("Current User:", currentUser);
    console.log("Auth Token:", token);
    console.log("Users list:", users?.users);
    console.log("Shopkeepers:", shopkeepers);
    console.log("Delivery Boys:", deliveryBoys);
    console.log("-------------------------------");
  }, [, allOrders, users, shopkeepers, deliveryBoys]);

  const handleConfirmOrder = async (orderId) => {
    console.log(orderId);
    try {
      await dispatch(confirmOrder(orderId));
      showToast("Order Confirmed Successfully!", "success");
    } catch (error) {
      showToast("Failed to Confirm Order!", "error");
    }
  };
  // handleConfirmOrder();
  const handleAssignOrder = async (orderId) => {
    if (!shopkeeperId || !deliveryBoyId) {
      return showToast(
        "Please select both Shopkeeper and Delivery Boy!",
        "error"
      );
    }
    try {
      await dispatch(assignOrder(orderId, shopkeeperId, deliveryBoyId));
      showToast("Order Assigned Successfully!", "success");
      setShopkeeperId("");
      setDeliveryBoyId("");
    } catch (error) {
      showToast("Failed to Assign Order!", "error");
    }
  };

  if (allOrdersLoading || usersLoading) return <p>Loading...</p>;

  if (allOrdersError) {
    showToast(allOrdersError, "error");
    return <p>Error: {allOrdersError}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Orders</h1>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Assign Shopkeeper and Delivery Boy
        </h2>

        <div className="flex gap-4 mb-4">
          <select
            className="p-2 border rounded"
            value={shopkeeperId}
            onChange={(e) => setShopkeeperId(e.target.value)}
          >
            <option value="">Select Shopkeeper</option>
            {shopkeepers.map((shopkeeper) => (
              <option key={shopkeeper._id} value={shopkeeper._id}>
                {shopkeeper.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={deliveryBoyId}
            onChange={(e) => setDeliveryBoyId(e.target.value)}
          >
            <option value="">Select Delivery Boy</option>
            {deliveryBoys.map((deliveryBoy) => (
              <option key={deliveryBoy._id} value={deliveryBoy._id}>
                {deliveryBoy.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Orders</h2>
        {allOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders.map((order) => (
              <li key={order._id} className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <span>Order ID: {order._id}</span>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                      onClick={() => handleConfirmOrder(order._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                      onClick={() => handleAssignOrder(order._id)}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
