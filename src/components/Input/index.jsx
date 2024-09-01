import React from 'react'
import './index.css';

function Input({ type, value,name, onChange, errorMessage, label }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoCorrect='off'
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default Input;
