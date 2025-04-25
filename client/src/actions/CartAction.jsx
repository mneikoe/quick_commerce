import CART_CONSTANTS from "../constants/CartConstants";

export const addToCart = (product) => ({
  type: CART_CONSTANTS.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: CART_CONSTANTS.REMOVE_FROM_CART,
  payload: productId,
});

export const updateCartQuantity = (productId, quantity) => ({
  type: CART_CONSTANTS.UPDATE_CART_QUANTITY,
  payload: { productId, quantity },
});
