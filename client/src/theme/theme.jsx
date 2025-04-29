import { createTheme } from "@mui/material/styles";

const BLINKIT_YELLOW = "#f8d521";
const DARK_BG = "#1a1a1a";

// Create a MUI theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // extra-small: mobile
      sm: 600, // small: tablets
      md: 900, // medium: small laptop
      lg: 1200, // large: desktop
      xl: 1536, // extra-large: large screens
    },
  },
  palette: {
    primary: {
      main: "#4CAF50", // Modern green (more vivid and stylish)
      light: "#E8F5E9", // Soft green background tint
    },
    secondary: {
      main: "#f8d521", // Deep slate (better contrast and modern feel)
      light: "#1a1a1a", // Fresh minty secondary light
    },
    background: {
      default: DARK_BG,
      paper: "#E8F5E9",
    },
    text: {
      secondary: "#fff",
      primary: "#000",
      tertiary: "#f8d521",
    },
    error: {
      main: "#EF4444", // Tailwind red-500
      light: "#FEE2E2", // Tailwind red-100
    },
    success: {
      main: "#10B981", // Tailwind green-500
      light: "#D1FAE5", // Tailwind green-100
    },
    info: {
      main: "#3B82F6", // Tailwind blue-500
      light: "#DBEAFE", // Tailwind blue-100
    },
    warning: {
      main: "#F59E0B", // Tailwind yellow-500
      light: "#FEF3C7", // Tailwind yellow-100
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontWeight: 500,
          textTransform: "none",
          "&.MuiButton-contained": {
            backgroundColor: "#fae052",
            color: "#000",
            "&:hover": {
              backgroundColor: "#e6c319",
              color: "#fff",
            },
          },
          "&.MuiButton-outlined": {
            borderColor: "#fae052",
            color: "#fae052",
            "&:hover": {
              backgroundColor: "#fae052",
              color: "#000",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000",
          backgroundColor: BLINKIT_YELLOW,
          "&:hover": {
            backgroundColor: "#333333",
            color: "#fae052",
          },
          "&.Mui-selected": {
            backgroundColor: "#fae052",
            color: "#1c1c1c",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#fae052",
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          justifyContent: "initial",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
          margin: 8,
          borderRadius: 16,
          transition: "all 0.3s ease",
          "&.Mui-selected": {
            backgroundColor: "#fae052",
            color: "#1c1c1c",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#fae052",
            },
          },
          "&:hover": {
            backgroundColor: "#333333",
            color: "#fae052",
          },
        },
      },
    },
  },
});

export default theme;
