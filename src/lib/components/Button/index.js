import React from "react";

const Button = (props) => {
  const {
    size = "s",
    kind = "strong",
    type = "primary",
    label,
    prefixIcon,
    postfixIcon,
  } = props;
  return (
    <div className={`sc-button__container ${size} ${kind} ${type}`}>
      {prefixIcon && (
        <img src={prefixIcon} className={`prefix-icon ${size}`} alt="" />
      )}
      <span>{label}</span>
      {postfixIcon && (
        <img src={postfixIcon} className={`postfix-icon ${size}`} alt="" />
      )}
    </div>
  );
};

export default Button;
