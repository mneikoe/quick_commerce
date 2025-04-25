import CART_CONSTANTS from "../constants/CartConstants";

// Reducers specify how the application’s state changes in response to actions sent to the store.
const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_CONSTANTS.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_CONSTANTS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };

    case CART_CONSTANTS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.productId === action.payload.productId
            ? { ...x, quantity: action.payload.quantity }
            : x
        ),
      };

    case CART_CONSTANTS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
