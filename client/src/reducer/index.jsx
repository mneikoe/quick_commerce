// /src/redux/reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default is localStorage

import * as userReducer from "./userReducer";
import * as cartReducer from "./CartReducer";
import * as orderReducer from "./OrderReducer";
import * as menuReducer from "./MenuReducer";
import * as categoryReducer from "./CategoryReducer";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  // specify which reducers to persist
};

// Root Reducer
const rootReducer = combineReducers({
  // user related reducer
  userList: userReducer.userListReducer,
  userVerify: userReducer.userVerifyReducer,

  // CART
  cart: cartReducer.cartReducer,

  // order
  // orderCreate: orderReducer.orderCreateReducer,
  // orderList: orderReducer.orderListReducer,
  // orderDetails: orderReducer.orderDetailsReducer,
  // orderTrack: orderReducer.orderTrackReducer,
  // orderStatusUpdate: orderReducer.orderStatusUpdateReducer,
  orders: orderReducer.orderReducer,
  menu: menuReducer.menuReducer,
  category: categoryReducer.categoryReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
