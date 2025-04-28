import USER from "../constants/UserConstants";
import axiosInstance from "../utils/config";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER.LOGIN.REQUEST });

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { user, token } = response.data;

    dispatch({
      type: USER.LOGIN.SUCCESS,
      payload: { user, token },
    });

    return { user, token };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong!";
    dispatch({
      type: USER.LOGIN.FAIL,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
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

      dispatch({
        type: USER.REGISTER.SUCCESS,
        payload: { user, token },
      });
      return { user, token };
    } catch (error) {
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
  localStorage.removeItem("token");
  dispatch({ type: USER.LOGOUT });
};
