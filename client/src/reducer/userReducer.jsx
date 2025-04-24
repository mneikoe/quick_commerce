import USER from "../constants/UserConstants";

// User List Reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER.LIST.REQUEST:
      return { loading: true, users: [] };
    case USER.LIST.SUCCESS:
      return { loading: false, users: action.payload };
    case USER.LIST.FAIL:
      return { loading: false, error: action.payload };
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
