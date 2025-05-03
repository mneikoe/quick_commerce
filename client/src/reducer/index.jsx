// /src/redux/reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default is localStorage

import * as userReducer from "./userReducer";
import * as cartReducer from "./CartReducer";
import * as orderReducer from "./OrderReducer";
import * as menuReducer from "./MenuReducer";
import * as categoryReducer from "./CategoryReducer";
import * as authReducer from "./AuthReducer";
import * as subcategory from "./SubCategoryReducer";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Root Reducer
const rootReducer = combineReducers({
  // user
  userList: userReducer.userListReducer,
  userVerify: userReducer.userVerifyReducer,

  // auth
  auth: authReducer.authReducer,

  // cart
  cart: cartReducer.cartReducer,

  // order
  orders: orderReducer.orderReducer,
  allOrders: orderReducer.getAllOrdersReducer,
  getMyOrders: orderReducer.getMyOrdersReducer,
  getUserOrders: orderReducer.getUserOrdersReducer,
  getDeliveryBoyOrders: orderReducer.getDeliveryBoyOrdersReducer,
  deliveryBoyOrders: orderReducer.deliveryBoyOrdersReducer,

  // menu
  menu: menuReducer.menuReducer,

  // category
  category: categoryReducer.categoryReducer,
  subCategory: subcategory.subCategoryReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
