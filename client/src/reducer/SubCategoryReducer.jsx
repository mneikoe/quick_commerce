import { SUB_CATEGORY_CONSTANTS } from "../constants/CategoryConstants";

export const subCategoryReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_CONSTANTS.LIST_REQUEST:
    case SUB_CATEGORY_CONSTANTS.ALL_REQUEST:
      return { ...state, loading: true };

    case SUB_CATEGORY_CONSTANTS.LIST_SUCCESS:
    case SUB_CATEGORY_CONSTANTS.ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: action.payload,
        error: null,
      };

    case SUB_CATEGORY_CONSTANTS.LIST_FAIL:
    case SUB_CATEGORY_CONSTANTS.ALL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SUB_CATEGORY_CONSTANTS.CREATE_REQUEST:
    case SUB_CATEGORY_CONSTANTS.UPDATE_REQUEST:
    case SUB_CATEGORY_CONSTANTS.DELETE_REQUEST:
      return { ...state, loading: true };

    case SUB_CATEGORY_CONSTANTS.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: [...state.subCategories, action.payload],
        error: null,
      };

    case SUB_CATEGORY_CONSTANTS.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: state.subCategories.map((sub) =>
          sub._id === action.payload._id ? action.payload : sub
        ),
        error: null,
      };

    case SUB_CATEGORY_CONSTANTS.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: state.subCategories.filter(
          (sub) => sub._id !== action.payload
        ),
        error: null,
      };

    case SUB_CATEGORY_CONSTANTS.CREATE_FAIL:
    case SUB_CATEGORY_CONSTANTS.UPDATE_FAIL:
    case SUB_CATEGORY_CONSTANTS.DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
