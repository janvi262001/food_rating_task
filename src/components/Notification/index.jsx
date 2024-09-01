import React, { useEffect, useState } from "react";
import "./index.css";

function Notification({ type = "success", message, duration = 5000, onClose,visible }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
      <span className="close-icon" onClick={handleClose}>
        &times;
      </span>
    </div>
  );
}

export default Notification;
