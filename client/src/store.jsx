import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";
import persistedReducer from "./reducer/index";

// Create Redux store
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Persistor for redux-persist
const persistor = persistStore(store);

export { store, persistor };
