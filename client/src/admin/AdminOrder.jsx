import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  assignOrder,
  getAllOrders,
} from "../actions/OrderAction";
import { listUsers } from "../actions/userAction";
import { showToast } from "../components/ui/ShowToast";
import { clearAllOrders } from "../reducer/OrderReducer";

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
  const { currentUser, token } = useSelector((s) => s.auth);
  // console.log("all orders", allOrders);
  const [shopkeeperId, setShopkeeperId] = useState("");
  const [deliveryBoyId, setDeliveryBoyId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Kis order ko assign karna hai

  const shopkeepers =
    users?.users?.filter((user) => user.role === "shopkeeper") || [];
  const deliveryBoys =
    users?.users?.filter((user) => user.role === "deliveryboy") || [];

  useEffect(() => {
    dispatch(clearAllOrders());
    dispatch(getAllOrders());
    dispatch(listUsers());

    // Set interval to fetch new orders every 5 seconds (5000 ms)
    const intervalId = setInterval(() => {
      dispatch(getAllOrders()); // Fetch orders after a fixed interval
    }, 5000);

    // Cleanup interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [dispatch]);
  // confirmed
  const handleConfirmOrder = async (orderId) => {
    try {
      await dispatch(confirmOrder(orderId));
      dispatch(getAllOrders()); // Refresh karne ke liye
      showToast("Order Confirmed Successfully!", "success");
    } catch (error) {
      showToast("Failed to Confirm Order!", "error");
    }
  };
  // assigned
  const handleAssignOrder = async () => {
    if (!shopkeeperId || !deliveryBoyId || !selectedOrderId) {
      return showToast(
        "Please select Order, Shopkeeper, and Delivery Boy!",
        "error"
      );
    }
    try {
      await dispatch(assignOrder(selectedOrderId, shopkeeperId, deliveryBoyId));
      setShopkeeperId("");
      setDeliveryBoyId("");
      setSelectedOrderId(null);
      dispatch(getAllOrders());
      showToast("Order Assigned Successfully!", "success");
    } catch (error) {
      showToast("Failed to Assign Order!", "error");
    }
  };

  // if (allOrdersLoading || usersLoading) return <p>Loading...</p>;

  if (allOrdersError) {
    showToast(allOrdersError, "error");
    return <p>Error: {allOrdersError}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Orders</h1>
      {/* Pending Orders Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Pending Orders</h2>
        {allOrders.filter((order) => order.status === "pending").length ===
        0 ? (
          <p>No pending orders.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "pending")
              .map((order) => (
                <li
                  key={order._id}
                  className="flex items-center justify-between p-4 border rounded"
                >
                  <span>Order ID: {order._id}</span>
                  <button
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleConfirmOrder(order._id)}
                  >
                    Confirm
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      {/* Confirmed Orders Section */}
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">
          Confirmed Orders (Assign Shopkeeper & DeliveryBoy)
        </h2>
        {allOrders.filter((order) => order.status === "confirmed").length ===
        0 ? (
          <p>No confirmed orders to assign.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "confirmed")
              .map((order) => (
                <li key={order._id} className="p-4 border rounded">
                  <div className="flex flex-col gap-2">
                    <span>Order ID: {order._id}</span>

                    <div className="flex gap-4">
                      <select
                        className="p-2 border rounded"
                        value={shopkeeperId}
                        onChange={(e) => {
                          setShopkeeperId(e.target.value);
                          setSelectedOrderId(order._id);
                        }}
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
                        onChange={(e) => {
                          setDeliveryBoyId(e.target.value);
                          setSelectedOrderId(order._id);
                        }}
                      >
                        <option value="">Select Delivery Boy</option>
                        {deliveryBoys.map((deliveryBoy) => (
                          <option key={deliveryBoy._id} value={deliveryBoy._id}>
                            {deliveryBoy.name}
                          </option>
                        ))}
                      </select>

                      <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={handleAssignOrder}
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
      {/* Assigned Orders Section */}
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Assigned Orders</h2>
        {allOrders.filter((order) => order.status === "assigned").length ===
        0 ? (
          <p>No assigned orders.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "assigned")
              .map((order) => (
                <li key={order._id} className="p-4 border rounded">
                  <span>Order ID: {order._id} (Assigned)</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Ready Orders Section (Shopkeeper) */}
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Ready Orders</h2>
        {allOrders.filter((order) => order.status === "ready").length === 0 ? (
          <p>No ready orders.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "ready")
              .map((order) => (
                <li key={order._id} className="p-4 border rounded">
                  <span>Order ID: {order._id} (Ready)</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Picked Up Orders Section (Delivery Boy) */}
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Picked Up Orders</h2>
        {allOrders.filter((order) => order.status === "pickedup").length ===
        0 ? (
          <p>No picked-up orders.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "pickedup")
              .map((order) => (
                <li key={order._id} className="p-4 border rounded">
                  <span>Order ID: {order._id} (Picked Up)</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Delivered Orders Section (Delivery Boy) */}
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Delivered Orders</h2>
        {allOrders.filter((order) => order.status === "delivered").length ===
        0 ? (
          <p>No delivered orders.</p>
        ) : (
          <ul className="space-y-4">
            {allOrders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <li key={order._id} className="p-4 border rounded">
                  <span>Order ID: {order._id} (Delivered)</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
