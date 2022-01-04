import React from "react";
import "../styles/button.scss";

type ButtonProps = {
  size: "s" | "m" | "l";
  kind: "strong" | "light";
  type: "primary" | "secondary" | "destructive";
  label: string;
  prefixIcon?: any;
  postfixIcon?: any;
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
      {prefixIcon && <img src={prefixIcon} className={`prefix-icon ${size}`} />}
      <span>{label}</span>
      {postfixIcon && <img src={postfixIcon} className={`postfix-icon ${size}`} />}
    </div>
  );
};

export default Button;
