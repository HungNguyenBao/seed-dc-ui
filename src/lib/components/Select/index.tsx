import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

type SelectProps = {
  placeholder?: string;
  label?: string;
  supportive?: string;
};

const Select = ({ label, placeholder, supportive }: SelectProps) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  return (
    <div className="select__container">
      <div className="field__wrapper">
        {!!label && (
          <div className="label">
            <span>{label}</span>
          </div>
        )}
        <div className="field-container normal-button" onClick={toggle}>
          <input className="input" placeholder={placeholder || "Select item"} />
          <i className="material-icons">expand_more</i>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggle}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="select"
        unmountOnExit
        onEnter={() => {}}
        onExited={() => {}}
      >
        <div className="selection-container selection-color">
          <span className="empty">No options</span>
        </div>
      </CSSTransition>
      {!!supportive && (
        <div className="supportive">
          <span>{supportive}</span>
        </div>
      )}
    </div>
  );
};

export default Select;
