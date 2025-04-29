import { ORDER_CONSTANTS } from "../constants/OrderConstants";
import USER from "../constants/UserConstants";

// User List Reducer
export const userListReducer = (
  state = { users: [], loading: false },
  action
) => {
  switch (action.type) {
    case USER.LIST.REQUEST:
      return { ...state, loading: true };

    case USER.LIST.SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case USER.LIST.FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// User Verify Reducer
export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.VERIFY.REQUEST:
      return { loading: true };
    case USER.VERIFY.SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER.VERIFY.FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  order: null,
  error: null,
};

// place order
export const placeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CONSTANTS.PLACE_ORDER_REQUEST:
      return { ...state, loading: true };
    case ORDER_CONSTANTS.PLACE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_CONSTANTS.PLACE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
