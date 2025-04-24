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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Determine input type based on showPassword state
  const inputType = isPassword && showPassword ? "text" : type;

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

      <div className="relative bg-white">
        <input
          type={inputType}
          name={name}
          id={name} // Ensure accessibility with the 'id' attribute
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 pl-4 border border-gray-300 rounded-xl shadow-sm appearance-none transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-green-500 ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 flex items-center text-gray-500 right-3"
            aria-label={showPassword ? "Hide password" : "Show password"} // Improve accessibility
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* {icon && (
          <IconButton
            className="absolute inset-y-0 flex items-center text-gray-500 left-3 bg-inherit"
            tabIndex={-1}
            onClick={icon.onClick}
          >
            {icon} 
          </IconButton>
        )} */}
      </div>
    </div>
  );
};

export default TextInput;
