// /src/redux/reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default is localStorage

import * as userReducer from "./userReducer";

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
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
