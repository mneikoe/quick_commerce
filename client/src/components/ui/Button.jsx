import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = ({
  variant = "contained",
  color = "primary",
  size = "small",
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
      sx={sx}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
