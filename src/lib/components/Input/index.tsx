import React, {
  useState,
  HTMLInputTypeAttribute,
  ChangeEvent,
  MouseEvent,
} from "react";

type InputProps = {
  label?: string;
  supportiveText?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  leadingText?: string;
  trailingText?: string;
  state?: "normal" | "error" | "success" | "warning" | "disabled" | "read-only";
  placeholder?: string;
  size?: "s" | "m" | "l";
  type?: "text" | "text-area";
  inputType?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Input = ({
  label,
  supportiveText,
  leadingIcon,
  trailingIcon,
  leadingText,
  trailingText,
  state = "normal",
  placeholder,
  size = "m",
  type = "text",
  inputType,
  onChange,
  value,
}: InputProps) => {
  const [isFocus, setFocus] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  const togglePassword = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPassword(!isShowPassword);
  };
  return (
    <div className="sc-input__container">
      {!!label && (
        <div className="input-label">
          <span>{label}</span>
        </div>
      )}
      <div className={`input-wrapper ${size} ${state} ${isFocus && "focus"}`}>
        {inputType === "password" ? (
          <>
            <input
              className="main-input"
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              disabled={state === "disabled" || state === "read-only"}
              type={isShowPassword ? undefined : inputType}
              onChange={onChange}
              value={value}
            />
            <div className="button-password" onClick={togglePassword}>
              <i className="material-icons-outlined">
                {isShowPassword ? "visibility_off" : "visibility"}
              </i>
            </div>
          </>
        ) : type === "text-area" ? (
          <textarea
            className="main-input"
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={state === "disabled" || state === "read-only"}
            value={value}
            onChange={onChange}
          />
        ) : (
          <>
            {!!leadingIcon && (
              <i className="material-icons-outlined leading-icon">
                {leadingIcon}
              </i>
            )}
            {!!leadingText && (
              <span className="leading-text">{leadingText}</span>
            )}
            <input
              className="main-input"
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              disabled={state === "disabled" || state === "read-only"}
              type={inputType}
              onChange={onChange}
              value={value}
            />
            {!!trailingText && (
              <span className="trailing-text">{trailingText}</span>
            )}
            {!!trailingIcon && (
              <i className="material-icons-outlined trailing-icon">
                {trailingIcon}
              </i>
            )}
          </>
        )}
      </div>
      {!!supportiveText && (
        <div className="input-supportive">
          <span>{supportiveText}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
