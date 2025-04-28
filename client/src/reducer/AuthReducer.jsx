import USER from "../constants/UserConstants";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.CURRENT_USER.REQUEST:
    case USER.LOGIN.REQUEST:
    case USER.REGISTER.REQUEST:
      return { ...state, loading: true };

    case USER.CURRENT_USER.SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case USER.LOGIN.SUCCESS:
    case USER.REGISTER.SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        currentUser: action.payload.user,
        token: action.payload.token,
      };

    case USER.CURRENT_USER.FAIL:
    case USER.LOGIN.FAIL:
    case USER.REGISTER.FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER.LOGOUT:
      localStorage.removeItem("token");
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
