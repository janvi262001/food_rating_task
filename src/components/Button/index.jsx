import React from "react";
import "./index.css";

function Button({
  children,
  onClick,
  classes,
  isDisabled,
  type,
}) {

  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`btn ${classes}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
