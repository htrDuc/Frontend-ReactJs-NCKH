import React from "react";

const Button = ({ color, name, onClick }) => {
  const styleBtn = {
    background: color,
  };

  return (
    <button style={styleBtn} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
