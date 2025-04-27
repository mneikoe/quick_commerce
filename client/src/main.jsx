import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store.jsx";
// import { ThemeProvider } from "@material-tailwind/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AuthProvider> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      {/* </AuthProvider> */}
    </ThemeProvider>
  </StrictMode>
);
