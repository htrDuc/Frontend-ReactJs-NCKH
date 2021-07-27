import React from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  onKeyPress,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
    />
  );
};

export default Input;
