import USER from "../constants/UserConstants";
import axiosInstance from "../utils/config";
const PREFIX = "/admin";
export const listUsers =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER.LIST.REQUEST });

      const queryString = new URLSearchParams(params);
      const { data } = await axiosInstance.get(
        `${PREFIX}/users?${queryString}`
      );

      dispatch({
        type: USER.LIST.SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER.LIST.FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const verifyUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER.VERIFY.REQUEST });

    const { data } = await axiosInstance.patch(`/admin/verify/${userId}`);

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
