import { MENU_CONSTANTS } from "../constants/MenuConstants";

const initialState = {
  menuItems: {
    data: [],
    total: 0,
  },
  loading: false,
  error: null,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_CONSTANTS.GET_MENU.REQUEST:
    case MENU_CONSTANTS.CREATE_MENU.REQUEST:
    case MENU_CONSTANTS.DELETE_MENU.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MENU_CONSTANTS.GET_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: action.payload,
      };

    case MENU_CONSTANTS.GET_MENU.FAIL:
    case MENU_CONSTANTS.CREATE_MENU.FAIL:
    case MENU_CONSTANTS.DELETE_MENU.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MENU_CONSTANTS.CREATE_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: {
          ...state.menuItems,
          data: [...state.menuItems.data, action.payload],
          total: (state.menuItems.total || 0) + 1,
        },
      };

    case MENU_CONSTANTS.DELETE_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: {
          ...state.menuItems,
          data: state.menuItems.data.filter(
            (item) => item._id !== action.payload
          ),
          total: Math.max((state.menuItems.total || 1) - 1, 0),
        },
      };
    case MENU_CONSTANTS.UPDATE_MENU.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MENU_CONSTANTS.UPDATE_MENU.SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: {
          ...state.menuItems,
          data: state.menuItems.data.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        },
      };

    case MENU_CONSTANTS.UPDATE_MENU.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
