import USER from "../constants/UserConstants";
import axiosInstance from "../utils/config";

// export const loginUser = (email, password) => async (dispatch) => {
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER.LOGIN.REQUEST });

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { user, token } = response.data; // Destructuring user and token from response

    // Save token to localStorage (if needed)
    // localStorage.setItem("token", token);
    // console.log(token);
    // Dispatch success action to update the state with the user and token
    dispatch({
      type: USER.LOGIN.SUCCESS,
      payload: { user, token },
    });

    return { user, token }; // Return the user and token so you can use it later if needed
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong!";
    dispatch({
      type: USER.LOGIN.FAIL,
      payload: errorMessage,
    });
    throw new Error(errorMessage); // Propagate the error to handle in the component
  }
};

export const registerUser =
  (name, email, password, role, phone) => async (dispatch) => {
    dispatch({ type: USER.REGISTER.REQUEST });
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role,
        phone,
      });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      // console.log(response);
      // console.log(token, user);
      dispatch({
        type: USER.REGISTER.SUCCESS,
        payload: { user, token },
      });
      return { user, token };
    } catch (error) {
      // console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      dispatch({
        type: USER.REGISTER.FAIL,
        payload: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

export const logoutUser = () => (dispatch) => {
  // const errorMessage =
  //   error.response?.data?.message || error.message || "Something went wrong!";
  localStorage.removeItem("token");
  dispatch({ type: USER.LOGOUT });
};
