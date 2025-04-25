import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { IconButton } from "@mui/material";

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = true,
  className = "",
  icon,
  size = "medium", // Default to medium
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  // Size-specific class mapping
  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-5 py-4 text-lg",
  };

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative ">
        <input
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full ${sizeClasses[size]} pr-12 pl-4 border border-gray-300 rounded-xl shadow-sm appearance-none transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-green-500 ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 flex items-center text-gray-500 right-3"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* Uncomment this if you want to use icon inside the input */}
        {/* {icon && (
          <IconButton
            className="flex items-center text-gray-900 "
            tabIndex={-1}
            onClick={icon.onClick}
            aria-label={icon.component}
          >
            {icon.component}
          </IconButton>
        )} */}
      </div>
    </div>
  );
};

export default TextInput;
