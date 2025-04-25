import CATEGORY_CONSTANTS from "../constants/CategoryConstants";

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANTS.LIST_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_CONSTANTS.LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case CATEGORY_CONSTANTS.LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CATEGORY_CONSTANTS.CREATE_REQUEST:
    case CATEGORY_CONSTANTS.UPDATE_REQUEST:
    case CATEGORY_CONSTANTS.DELETE_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_CONSTANTS.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case CATEGORY_CONSTANTS.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };

    case CATEGORY_CONSTANTS.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload
        ),
      };

    case CATEGORY_CONSTANTS.CREATE_FAIL:
    case CATEGORY_CONSTANTS.UPDATE_FAIL:
    case CATEGORY_CONSTANTS.DELETE_FAIL:
    case CATEGORY_CONSTANTS.LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
