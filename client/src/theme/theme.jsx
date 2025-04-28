import { createTheme } from "@mui/material/styles";

// Create a MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Modern green (more vivid and stylish)
      light: "#E8F5E9", // Soft green background tint
    },
    secondary: {
      main: "#81E7AF", // Deep slate (better contrast and modern feel)
      light: "#E9F5BE", // Fresh minty secondary light
    },
    background: {
      default: "#F9FAFB", // Light neutral (elegant off-white background)
      paper: "#FFFFFF", // Clean white for cards and sections
    },
    text: {
      primary: "#111827", // Deep neutral text (tailwind gray-900)
      secondary: "#6B7280", // Muted text for descriptions (gray-500)
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
  },
});

export default theme;
