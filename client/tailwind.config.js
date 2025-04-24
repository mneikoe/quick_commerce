/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#84C225", // Bright Green
        secondary: "#F5F5F5", // Light Grey
        accent: "#FFC107", // Yellow Accent
        darkBg: "#1E1E1E", // Dark background for sidebars/footers
        textPrimary: "#212121", // Primary text color
        textSecondary: "#757575", // Secondary text color for muted text
        cardBg: "#2A2A2A", // Card background color
        borderColor: "#E0E0E0", // Light border color
        buttonBg: "#4CAF50", // Button background color
        buttonHover: "#388E3C", // Button hover color
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Default font family
        poppins: ["Poppins", "sans-serif"], // Alternative font family for headings
      },
      fontSize: {
        sm: "0.875rem", // Small text
        base: "1rem", // Default text size
        lg: "1.125rem", // Larger text
        xl: "1.25rem", // Extra-large text
      },
      fontWeight: {
        light: 300, // Light font weight
        normal: 400, // Normal font weight
        medium: 500, // Medium font weight
        bold: 700, // Bold font weight
      },
      lineHeight: {
        tight: 1.25, // Tight line height
        normal: 1.5, // Normal line height
        loose: 1.75, // Loose line height
      },
      boxShadow: {
        sidebar: "0 4px 6px rgba(0, 0, 0, 0.2)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)", // Small shadow for minor elements
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)", // Default shadow for cards
        md: "0 4px 6px rgba(0, 0, 0, 0.1)", // Medium shadow for buttons
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)", // Large shadow for heavy content
        xl: "0 20px 30px rgba(0, 0, 0, 0.1)", // Extra large shadow for large cards
      },
      spacing: {
        "sidebar-width": "240px", // Sidebar width
        "header-height": "64px", // Header height
        "footer-height": "60px", // Footer height
        sidebarWidth: "240px",
      },
    },
  },
  plugins: [],
};
