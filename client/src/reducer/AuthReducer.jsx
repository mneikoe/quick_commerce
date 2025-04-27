import USER from "../constants/UserConstants";

const initialState = {
  currentUser: null, // Store logged-in user info
  loading: false, // Loading state to indicate ongoing actions (e.g., login/register)
  error: null, // Error message or object for handling API errors
  token: localStorage.getItem("token") || null, // Token from localStorage (for persistence)
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request Actions: Indicate that an API call is in progress
    case USER.CURRENT_USER.REQUEST:
    case USER.LOGIN.REQUEST:
    case USER.REGISTER.REQUEST:
      return { ...state, loading: true };

    // Success Actions: Successful API call responses
    case USER.CURRENT_USER.SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case USER.LOGIN.SUCCESS:
    case USER.REGISTER.SUCCESS:
      // Save the token to localStorage for persistence
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        currentUser: action.payload.user, // Store user info
        token: action.payload.token, // Store token
      };

    // Failure Actions: Handle API errors
    case USER.CURRENT_USER.FAIL:
    case USER.LOGIN.FAIL:
    case USER.REGISTER.FAIL:
      return { ...state, loading: false, error: action.payload };

    // Logout Action: Clear user and token from state on logout
    case USER.LOGOUT:
      localStorage.removeItem("token"); // Remove token from localStorage
      return { ...initialState }; // Reset state to initial state

    // Default: Return current state if action type doesn't match
    default:
      return state;
  }
};

export default authReducer;
