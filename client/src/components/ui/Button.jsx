import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  children,
  sx = {},
  ...rest
}) => {
  return (
    <MUIButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      sx={(theme) => ({
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontWeight: 500,
        backgroundColor:
          variant === "contained"
            ? theme.palette.secondary.light
            : "transparent",
        color:
          variant === "contained"
            ? theme.palette.primary.main
            : theme.palette.secondary.light,
        "&:hover": {
          backgroundColor:
            variant === "contained"
              ? theme.palette.secondary.main
              : theme.palette.secondary.light,
          color:
            variant === "contained"
              ? theme.palette.primary.light
              : theme.palette.secondary.main,
        },
        ...(typeof sx === "function" ? sx(theme) : sx),
      })}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
