import React from "react";

const Select = (props) => {
  return (
    <select value={props.value} onChange={props.onChange}>
      {props.options.map((option, i) => (
        <option key={i}>{option.value}</option>
      ))}
    </select>
  );
};

export default Select;
