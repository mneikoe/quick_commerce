import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = true,
  fullWidth = true,
  className = "",
}) => {
  const theme = useTheme();
  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      className={className}
    >
      <InputLabel
        id={`${name}-label`}
        sx={{ color: theme.palette.text.primary }}
        shrink={true}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        displayEmpty
        value={value ?? ""}
        sx={{ color: theme.palette.text.primary }}
        onChange={onChange}
        label={label}
      >
        <MenuItem value="" sx={{ color: theme.palette.text.primary }}>
          {placeholder || "Select the role"}
        </MenuItem>

        {options.map((option) => (
          <MenuItem
            key={option.value || option}
            value={option.value || option}
            // sx={{ color: theme.palette.text.primary }}
          >
            {option.label || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
