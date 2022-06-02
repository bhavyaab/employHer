import React, {useState} from 'react'

export function FormInput(props:any) {
  const { type, placeholder, name, errorMessage, onChange, onKeyDown } = props;

  
  return (
    <div className="FormInput">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
        />
        <label>{errorMessage}</label>
    </div>
  )
}