// reducers/orderReducer.js
import { ORDER_CONSTANTS } from "../constants/OrderConstants";

// Initial state for orders
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllOrdersReducer = (
  state = { orders: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_CONSTANTS.GET_ALL.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.GET_ALL.SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: null };
    case ORDER_CONSTANTS.GET_ALL.FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CONSTANTS.CLEAR_ALL_ORDERS:
      return { ...state, orders: [] };
    default:
      return state;
  }
};

// Order reducer
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // --- Create Order ---
    case ORDER_CONSTANTS.CREATE.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.CREATE.SUCCESS:
      return { ...state, loading: false, order: action.payload, success: true };
    case ORDER_CONSTANTS.CREATE.FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CONSTANTS.CREATE.RESET:
      return { ...state, success: false };

    // --- Get All Orders ---
    // case ORDER_CONSTANTS.GET_ALL.REQUEST:
    //   return { ...state, loading: true };
    // case ORDER_CONSTANTS.GET_ALL.SUCCESS:
    //   return { ...state, loading: false, orders: action.payload };
    // case ORDER_CONSTANTS.GET_ALL.FAIL:
    //   return { ...state, loading: false, error: action.payload };

    // --- Get Single Order ---
    case ORDER_CONSTANTS.GET_SINGLE.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.GET_SINGLE.SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_CONSTANTS.GET_SINGLE.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Get my  Order ---
    case ORDER_CONSTANTS.GET_MY_ORDERS.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.GET_MY_ORDERS.SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_CONSTANTS.GET_MY_ORDERS.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Track Order ---
    case ORDER_CONSTANTS.TRACK.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.TRACK.SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_CONSTANTS.TRACK.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Update Order Status ---
    case ORDER_CONSTANTS.UPDATE_STATUS.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.UPDATE_STATUS.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case ORDER_CONSTANTS.UPDATE_STATUS.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Get Orders for Shopkeeper ---
    case ORDER_CONSTANTS.GET_SHOPKEEPER_ORDERS.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.GET_SHOPKEEPER_ORDERS.SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_CONSTANTS.GET_SHOPKEEPER_ORDERS.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Confirm Order Ready ---
    case ORDER_CONSTANTS.CONFIRM_READY.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.CONFIRM_READY.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case ORDER_CONSTANTS.CONFIRM_READY.FAIL:
      return { ...state, loading: false, error: action.payload };

    // --- Place Order ---
    case ORDER_CONSTANTS.PLACE_ORDER.REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.PLACE_ORDER.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload],
      };
    case ORDER_CONSTANTS.PLACE_ORDER.FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CONSTANTS.CLEAR_ALL_ORDERS:
      return { ...state, orders: [], order: null, loading: false, error: null };

    default:
      return state;
  }
};

// export const CLEAR_ALL_ORDERS = "CLEAR_ALL_ORDERS";

export const clearAllOrders = () => (dispatch) => {
  dispatch({ type: ORDER_CONSTANTS.CLEAR_ALL_ORDERS });
};
