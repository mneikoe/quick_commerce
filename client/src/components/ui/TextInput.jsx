import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  size = "medium", // "small" or "medium"
  fullWidth = true,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      label={label}
      name={name}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      size={size} // MUI: 'small' or 'medium'
      fullWidth={fullWidth}
      className={className}
      variant="outlined"
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default TextInput;
