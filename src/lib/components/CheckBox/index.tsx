import React, { useEffect, useState } from "react";

type CheckBoxProps = {
  size?: "l" | "m";
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  readOnly?: boolean;
  label?: string;
};

const CheckBox = ({
  size = "m",
  checked,
  indeterminate,
  disabled = false,
  onChange,
  readOnly,
  label,
}: CheckBoxProps) => {
  const [isChecked, setChecked] = useState(!!checked);
  const [isIndeterminate, setIndeterminate] = useState(!!indeterminate);

  useEffect(() => {
    setIndeterminate(!!indeterminate);
  }, [indeterminate]);

  useEffect(() => {
    setChecked(!!checked);
  }, [checked]);

  return (
    <div
      className={`check-box__container ${!disabled && "normal-button"}`}
      onClick={() => {
        if (disabled || readOnly) return;
        setIndeterminate(false);
        onChange?.(!isChecked);
        setChecked(!isChecked);
      }}
    >
      {isIndeterminate ? (
        <i
          className={`material-icons icon-${size} indeterminate ${
            disabled && "disabled"
          }`}
        >
          indeterminate_check_box
        </i>
      ) : isChecked ? (
        <i
          className={`material-icons icon-${size} checked ${
            disabled && "disabled"
          }`}
        >
          check_box
        </i>
      ) : (
        <i
          className={`material-icons icon-${size} unchecked ${
            disabled && "disabled"
          }`}
        >
          check_box_outline_blank
        </i>
      )}
      {!!label && <span className={`label-${size}`}>{label}</span>}
    </div>
  );
};

export default CheckBox;
