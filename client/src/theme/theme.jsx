import { createTheme } from "@mui/material/styles";

// Color Palette
const COLORS = {
  // === Primary Colors ===
  primaryMain: "#D8C29F", // Champagne Gold
  primaryLight: "#F6F2E9", // Ivory White
  primaryDark: "#B89E79",
  primaryContrastText: "#2C2C2C",

  // === Secondary / Accent ===
  secondaryMain: "#4C9A2A", // Emerald Green
  secondaryLight: "#F0B6A1", // Rose Quartz
  secondaryDark: "#3A7A21",

  // === Status Colors ===
  successMain: "#4C9A2A",
  successLight: "#D4EDDA",
  successDark: "#35701E",

  errorMain: "#D90429",
  errorLight: "#FFDAD9",
  errorDark: "#A20320",

  warningMain: "#F7C47D",
  warningLight: "#FFF3CD",
  warningDark: "#D6A95F",

  infoMain: "#B8A3C7",
  infoLight: "#EFE3F5",
  infoDark: "#9578AD",

  // === Backgrounds ===
  backgroundDefault: "#F6F2E9",
  backgroundPaper: "#FFFFFF",
  backgroundSubtle: "#F4EEE2",

  // === Text Colors ===
  textPrimary: "#2C2C2C",
  textSecondary: "#3A3A3A",
  textMuted: "#9A9A9A",
  textHighlight: "#D8C29F",

  // === Additional ===
  borderLight: "#D9A8A1",
  shadowColor: "rgba(126, 92, 68, 0.15)",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primaryMain,
      light: COLORS.primaryLight,
      dark: COLORS.primaryDark,
      contrastText: COLORS.primaryContrastText,
    },
    secondary: {
      main: COLORS.secondaryMain,
      light: COLORS.secondaryLight,
      dark: COLORS.secondaryDark,
      contrastText: "#FFFFFF",
    },
    success: {
      main: COLORS.successMain,
      light: COLORS.successLight,
      dark: COLORS.successDark,
      contrastText: "#FFFFFF",
    },
    error: {
      main: COLORS.errorMain,
      light: COLORS.errorLight,
      dark: COLORS.errorDark,
      contrastText: "#FFFFFF",
    },
    warning: {
      main: COLORS.warningMain,
      light: COLORS.warningLight,
      dark: COLORS.warningDark,
      contrastText: "#5E4A2C",
    },
    info: {
      main: COLORS.infoMain,
      light: COLORS.infoLight,
      dark: COLORS.infoDark,
      contrastText: COLORS.textPrimary,
    },
    background: {
      default: COLORS.backgroundDefault,
      paper: COLORS.backgroundPaper,
      subtle: COLORS.backgroundSubtle,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled: COLORS.textMuted,
    },
    divider: COLORS.borderLight,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: COLORS.textPrimary,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1.2rem",
      color: COLORS.textSecondary,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  spacing: 8,

  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },

  components: {
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 600,
    //       // backgroundColor: COLORS.primaryMain,
    //       color: COLORS.primaryContrastText,
    //       // boxShadow: `0 4px 12px ${COLORS.shadowColor}`,
    //       transition: "all 0.3s ease-in-out",
    //       "&:hover": {
    //         // backgroundColor: COLORS.primaryDark,
    //         color: COLORS.primaryLight,
    //         // transform: "translateY(-2px)",
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 24,
          paddingBlock: 12,
          fontWeight: 600,
          backgroundColor: COLORS.primaryMain,
          color: COLORS.primaryContrastText,
          boxShadow: `0 4px 12px ${COLORS.shadowColor}`,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: COLORS.primaryDark,
            color: COLORS.primaryLight,
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: `0 4px 12px ${COLORS.shadowColor}`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          justifyContent: "initial",
          padding: "12px 20px",
          margin: 8,
          borderRadius: 16,
          transition: "all 0.3s ease",
          "&.Mui-selected": {
            backgroundColor: COLORS.secondaryMain,
            color: COLORS.backgroundDefault,
            fontWeight: "bold",
          },
          "&:hover": {
            backgroundColor: COLORS.textSecondary,
            color: COLORS.secondaryLight,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: `0 4px 12px ${COLORS.shadowColor}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#fff",
          "& fieldset": {
            borderColor: COLORS.borderLight,
          },
          "&:hover fieldset": {
            borderColor: COLORS.primaryMain,
          },
          "&.Mui-focused fieldset": {
            borderColor: COLORS.secondaryMain,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: COLORS.primaryDark,
          color: COLORS.primaryLight,
          fontSize: "0.875rem",
          borderRadius: 8,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: 12,
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
      },
    },
  },
});

export default theme;
