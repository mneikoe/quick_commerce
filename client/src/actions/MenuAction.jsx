import axiosInstance from "../utils/config";
import { MENU_CONSTANTS } from "../constants/MenuConstants";

export const getMenuItems = () => async (dispatch) => {
  try {
    dispatch({ type: MENU_CONSTANTS.GET_MENU.REQUEST });
    const { data } = await axiosInstance.get("/menu");
    console.log("✅ Menu fetched:", data);
    dispatch({
      type: MENU_CONSTANTS.GET_MENU.SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("❌ Failed to fetch menu:", error);
    dispatch({
      type: MENU_CONSTANTS.GET_MENU.FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

export const createMenuItem = (menuData) => async (dispatch) => {
  try {
    dispatch({ type: MENU_CONSTANTS.CREATE_MENU.REQUEST });
    const { data } = await axiosInstance.post("/menu", menuData);
    console.log("✅ Menu item created:", data);
    dispatch({
      type: MENU_CONSTANTS.CREATE_MENU.SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("❌ Failed to create menu item:", error);
    dispatch({
      type: MENU_CONSTANTS.CREATE_MENU.FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

export const deleteMenuItem = (menuItemId) => async (dispatch) => {
  try {
    dispatch({ type: MENU_CONSTANTS.DELETE_MENU.REQUEST });
    const { data } = await axiosInstance.delete(`/menu/${menuItemId}`);
    console.log("🗑️ Menu item deleted:", data);
    dispatch({
      type: MENU_CONSTANTS.DELETE_MENU.SUCCESS,
      payload: menuItemId,
    });
  } catch (error) {
    console.error("❌ Failed to delete menu item:", error);
    dispatch({
      type: MENU_CONSTANTS.DELETE_MENU.FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

export const updateMenuItem = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: MENU_CONSTANTS.UPDATE_MENU.REQUEST });

    const { data } = await axiosInstance.put(`/menu/${id}`, updatedData);

    console.log("✏️ Menu item updated:", data);

    dispatch({
      type: MENU_CONSTANTS.UPDATE_MENU.SUCCESS,
      payload: data.data, // Assuming updated item is in `data.data`
    });
  } catch (error) {
    console.error("❌ Failed to update menu item:", error);
    dispatch({
      type: MENU_CONSTANTS.UPDATE_MENU.FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};
