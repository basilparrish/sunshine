import React from 'react';
import './Button.css'; // Import Button-specific styles

function Button({ text, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
