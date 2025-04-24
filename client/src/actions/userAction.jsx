import USER from "../constants/UserConstants";
import axiosInstance from "../utils/config";
const PREFIX = "/admin";
export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER.LIST.REQUEST });

    const { data } = await axiosInstance.get(`${PREFIX}/users`);
    // console.log(data);
    dispatch({
      type: USER.LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER.LIST.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const verifyUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER.VERIFY.REQUEST });

    const { data } = await axiosInstance.put(`/api/users/verify/${userId}`);

    dispatch({
      type: USER.VERIFY.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.VERIFY.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
