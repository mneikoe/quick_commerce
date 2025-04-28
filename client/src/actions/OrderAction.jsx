import axiosInstance from "../utils/config";
import { ORDER_CONSTANTS } from "../constants/OrderConstants";

//! /** ------------------- user  order action  -------------------*/

// Place Order (Action)
// access by user only
// status :pending
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.PLACE_ORDER.REQUEST });
    const { data } = await axiosInstance.post(`/user/orders`, orderData);
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.PLACE_ORDER.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.PLACE_ORDER.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Track specific order
export const trackOrder = (trackingId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.TRACK.REQUEST });

    const { data } = await axiosInstance.get(`/api/order/track/${trackingId}`);
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.TRACK.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.TRACK.FAIL,
      payload: error.response?.data?.message || error.message,
    });
    // showToast(error.response?.data?.message || "Tracking failed", "error");
  }
};

// Get My Orders (Action)
// access by user,shopkeeper,deliveryboy
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.GET_MY_ORDERS.REQUEST });
    const { data } = await axiosInstance.get("/shopkeeper/orders/myOrders");
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.GET_MY_ORDERS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.GET_MY_ORDERS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//! /** -------------------  admin  order action  -------------------*/
// Confirm Order by Admin (Action)
// status : confirm

export const confirmOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });
    const { data } = await axiosInstance.put(
      `/admin/orders/confirm/${orderId}`
    );
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Assign Order to Shopkeeper and Delivery Boy (Action)
// status : assigned
export const assignOrder =
  (orderId, shopkeeperId, deliveryBoyId) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });
      const { data } = await axiosInstance.put(
        `/admin/orders/assign/${orderId}`,
        {
          shopkeeperId,
          deliveryBoyId,
        }
      );
      console.log(data);
      dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Get All Orders (Action)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.GET_ALL.REQUEST });
    const { data } = await axiosInstance.get("/admin/orders");
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.GET_ALL.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.GET_ALL.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//! /** -------------------  shopkeeper order action  -------------------*/

// Confirm Order Ready by Shopkeeper (Action)
// sttaus : confirmOrderReady
export const confirmOrderReady = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });
    const { data } = await axiosInstance.put(
      `/shopkeeper/orders/${orderId}/ready`
    );
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
//! /** -------------------  deliveryBoy  order action  -------------------*/

// Confirm Pickup by Delivery Boy (Action)
// status : pickedup
export const confirmPickup = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });
    const { data } = await axiosInstance.put(
      `/delivery/orders/${orderId}/pickup`
    );
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Confirm Delivery by Delivery Boy (Action)
// status :delivered
export const confirmDelivery = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.REQUEST });
    const { data } = await axiosInstance.put(
      `/delivery/orders/${orderId}/deliver`
    );
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.UPDATE_STATUS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getMyOrdersByDdeliveryBoy = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CONSTANTS.GET_MY_ORDERS.REQUEST });
    const { data } = await axiosInstance.get("/delivery/orders/myOrders");
    console.log(data);
    dispatch({ type: ORDER_CONSTANTS.GET_MY_ORDERS.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CONSTANTS.GET_MY_ORDERS.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
