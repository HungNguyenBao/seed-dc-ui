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
    <div className="sc-button__container">
      {prefixIcon && <img src={prefixIcon} className="prefix-icon" />}
      <span>{label}</span>
      {postfixIcon && <img src={postfixIcon} className="postfix-icon" />}
    </div>
  );
};

export default Button;
