// import Constants from "../constants/Constants";
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

      console.log("User list data received: ", data);

      dispatch({
        type: USER.LIST.SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
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
    console.info("verify user", data);
    dispatch({
      type: USER.VERIFY.SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER.VERIFY.FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// import { USER_CONSTANTS } from "../constants/UserConstants";
// import axiosInstance from "../utils/axiosInstance";

// export const fetchUsersByRole = (role) => async (dispatch) => {
//   try {
//     dispatch({ type: USER.LIST.REQUEST });
//     // console.log("Fetching users with role:", role);
//     // console.log(axiosInstance.defaults.baseURL + `/admin/users?role=${role}`);

//     const { data } = await axiosInstance.get(`/admin/users?role=${role}`);
//     // console.log(data);
//     dispatch({
//       type: USER.LIST.SUCCESS,
//       payload: { role, users: data },
//     });
//   } catch (error) {
//     // console.log(error);
//     dispatch({
//       type: USER.LIST.FAIL,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };
