// reducers/orderReducer.js
import { ORDER_CONSTANTS } from "../constants/OrderConstants";

// Initial state for orders
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// Reducer to handle order-related actions
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Place order
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

    // Get all orders
    case ORDER_CONSTANTS.GET_ALL.REQUEST:
      return { ...state, loading: true };

    case ORDER_CONSTANTS.GET_ALL.SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case ORDER_CONSTANTS.GET_ALL.FAIL:
      return { ...state, loading: false, error: action.payload };

    // Update order status
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

    // Confirm order ready
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

    // Get a single order
    case ORDER_CONSTANTS.GET_SINGLE.REQUEST:
      return { ...state, loading: true };

    case ORDER_CONSTANTS.GET_SINGLE.SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case ORDER_CONSTANTS.GET_SINGLE.FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
