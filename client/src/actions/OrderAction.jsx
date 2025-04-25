// actions/orderActions.js
import axios from "axios";
import { ORDER_CONSTANTS } from "../constants/OrderConstants";
import axiosInstance from "../utils/config";

// Frontend - Place Order (Action)
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.PLACE_ORDER.REQUEST });

    // Send the order data to the backend
    const { data } = await axiosInstance.post(`/user/orders`, orderData);
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.PLACE_ORDER.SUCCESS, payload: data }); // Successful response
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.PLACE_ORDER.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Error handling
    });
  }
};

// Frontend - Get My Orders (Action)
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.GET_ALL.REQUEST });

    // Fetch all orders from the backend
    const { data } = await axiosInstance.get("/auth/orders");
    console.log("get all orders", data);
    dispatch({ type: ORDER_CONSTANTS.GET_ALL.SUCCESS, payload: data }); // Dispatching orders data
  } catch (error) {
    console.log("get order error", error);
    dispatch({
      type: ORDER_CONSTANTS.GET_ALL.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Error handling
    });
  }
};

// confirm order by admin
export const confirmOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });

    const { data } = await axiosInstance.put(
      `/api/orders/admin/confirm/${orderId}`
    ); // Backend route for confirming the order

    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS,
      payload: data, // Updated order details
    });
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Confirm Order Ready for Pickup
export const confirmOrderReady = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.CONFIRM_READY.REQUEST });

    // Send the PUT request to the backend to update the order status to 'ready'
    const { data } = await axiosInstance.put(
      `/api/orders/shopkeeper/${orderId}/ready`
    );

    dispatch({
      type: ORDER_CONSTANTS.CONFIRM_READY.SUCCESS,
      payload: data, // Updated order
    });
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.CONFIRM_READY.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Assign Order to Shopkeeper and Delivery Boy
export const assignOrder =
  (orderId, shopkeeperId, deliveryBoyId) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });

      // Send the PUT request to the backend to assign shopkeeper and delivery boy to the order
      const { data } = await axiosInstance.put(
        `/api/orders/assign/${orderId}`,
        {
          shopkeeperId,
          deliveryBoyId,
        }
      );

      dispatch({
        type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS,
        payload: data, // Updated order with assigned shopkeeper and delivery boy
      });
    } catch (error) {
      dispatch({
        type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Confirm Order Pickup by Delivery Boy
export const confirmPickup = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });

    // Send the PUT request to mark the order as picked up
    const { data } = await axiosInstance.put(
      `/api/delivery/orders/${orderId}/pickup`
    );

    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS,
      payload: data, // Updated order with 'picked up' status
    });
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// order delivered by delivery boy
// Confirm Order Delivery by Delivery Boy
export const confirmDelivery = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });

    // Send the PUT request to mark the order as delivered
    const { data } = await axiosInstance.put(
      `/api/delivery/orders/${orderId}/deliver`
    );

    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS,
      payload: data, // Updated order with 'delivered' status
    });
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// // Create Order
// export const createOrder = (orderData) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_CONSTANTS.CREATE.REQUEST });

//     const { data } = await axios.post("/api/orders/place", orderData, {
//       headers: {
//         Authorization: `Bearer ${getState().auth.user.token}`,
//       },
//     });

//     dispatch({ type: ORDER_CONSTANTS.CREATE.SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: ORDER_CONSTANTS.CREATE.FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// // Get single order details
// export const getOrderDetails = (orderId) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_CONSTANTS.GET_SINGLE.REQUEST });

//     const { data } = await axios.get(`/api/orders/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${getState().auth.user.token}`,
//       },
//     });

//     dispatch({ type: ORDER_CONSTANTS.GET_SINGLE.SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: ORDER_CONSTANTS.GET_SINGLE.FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// // Track order(user)
// export const trackOrder = (orderId) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_CONSTANTS.TRACK.REQUEST });

//     const { data } = await axios.get(`/api/orders/${orderId}/track`, {
//       headers: {
//         Authorization: `Bearer ${getState().auth.user.token}`,
//       },
//     });

//     dispatch({ type: ORDER_CONSTANTS.TRACK.SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: ORDER_CONSTANTS.TRACK.FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// // Update order status
// export const updateOrderStatus =
//   (orderId, status) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });

//       const { data } = await axios.put(
//         `/api/orders/${orderId}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${getState().auth.user.token}`,
//           },
//         }
//       );

//       dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
