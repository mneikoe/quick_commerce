import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          onClick={toggleDropdown}
          className={`block w-full px-4 py-3 text-sm md:text-base text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm appearance-none transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-green-500 ${className}`}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
              className="px-4 py-2 text-gray-700 hover:bg-green-700 hover:text-gray-900"
            >
              {option.label || option}
            </option>
          ))}
        </select>

        <div className="absolute transform -translate-y-1/2 pointer-events-none top-1/2 right-3">
          {isOpen ? (
            <ChevronUp className="text-gray-500" size={20} />
          ) : (
            <ChevronDown className="text-gray-500" size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
