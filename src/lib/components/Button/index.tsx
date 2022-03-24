import React from "react";

type ButtonProps = {
  size: "s" | "m" | "l";
  kind: "strong" | "light";
  type: "primary" | "secondary" | "destructive";
  prefixIcon?: any;
  postfixIcon?: any;
  label: string;
};

const Button = ({
  size = "s",
  kind = "strong",
  type = "primary",
  label,
  prefixIcon,
  postfixIcon,
}: ButtonProps) => {
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
