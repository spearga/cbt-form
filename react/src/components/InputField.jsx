import React from 'react';

const InputField = ({ label, type = "text", name, value, onChange, error, min, max }) => {
  return (
    <div className="form-group">
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </label>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputField;

