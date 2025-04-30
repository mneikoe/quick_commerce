import CATEGORY_CONSTANTS from "../constants/CategoryConstants";
import axiosInstance from "../utils/config";

// Create a new category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CONSTANTS.CREATE_REQUEST });

    const { data } = await axiosInstance.post(
      "/admin/categories",
      categoryData,
      {
        isMultipart: true,
      }
    );

    dispatch({
      type: CATEGORY_CONSTANTS.CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANTS.CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CONSTANTS.LIST_REQUEST });

    const { data } = await axiosInstance.get("/admin/categories");

    dispatch({
      type: CATEGORY_CONSTANTS.LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANTS.LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get category by ID
export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CONSTANTS.LIST_REQUEST });

    const { data } = await axiosInstance.get(`/admin/categories/${id}`);

    dispatch({
      type: CATEGORY_CONSTANTS.LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANTS.LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update category
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CONSTANTS.UPDATE_REQUEST });

    const { data } = await axiosInstance.put(
      `/admin/categories/${id}`,
      categoryData,
      {
        isMultipart: true,
      }
    );

    dispatch({
      type: CATEGORY_CONSTANTS.UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANTS.UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CONSTANTS.DELETE_REQUEST });

    const { data } = await axiosInstance.delete(`/admin/categories/${id}`);

    dispatch({
      type: CATEGORY_CONSTANTS.DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANTS.DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
