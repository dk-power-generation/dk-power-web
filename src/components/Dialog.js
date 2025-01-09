import React from 'react';

function Dialog({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;