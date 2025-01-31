import React from "react";

const Select = props => {
  return (
    <div className="form-group">
      <label> {props.title} </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-control"
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          if(option === props.defaultValue)
          return (
            <option key={option} value={option} label={option} selected>
              {option}
            </option>);
          else
            return (
              <option key={option} value={option} label={option} >
                {option}
              </option>);
        })}
      </select>
    </div>
  );
};

export default Select;
