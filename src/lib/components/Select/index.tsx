import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import CheckBox from "../CheckBox";

export type SelectItem = {
  id: string | number;
  name: string;
};

type SelectProps = {
  placeholder?: string;
  label?: string;
  supportive?: string;
  isMultiple?: boolean;
  options?: Array<SelectItem>;
  values?: Array<SelectItem>;
  onChanged?: (items: Array<SelectItem>) => void;
  onItemChanged?: (item: SelectItem, isSelected: boolean) => void;
};

type SelectItemProps = {
  isSelected: boolean;
  item: SelectItem;
  onChange: (isSelected: boolean) => void;
  multiple?: boolean;
};

const SelectItemComponent = ({
  isSelected,
  item,
  onChange,
  multiple,
}: SelectItemProps) => {
  const onClick = () => onChange(!isSelected);
  return (
    <div className="normal-button select-item" onClick={onClick}>
      {multiple && <CheckBox checked={isSelected} readOnly />}
      <span>{item.name}</span>
    </div>
  );
};

const Select = ({
  label,
  placeholder,
  supportive,
  isMultiple,
  options = [],
  values,
  onChanged,
  onItemChanged,
}: SelectProps) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState(options);
  const [inputVal, setInputVal] = useState(options?.[0]?.name || "");
  const [selectedItems, setSelectedItems] = useState<Array<any> | undefined>(
    values
  );
  useEffect(() => {
    setItems(options);
  }, [options]);
  const toggle = () => setOpen(!isOpen);
  const getIsSelected = (item: SelectItem) => {
    if (isMultiple)
      return selectedItems?.find((si) => si.id === item.id) != null;
    return selectedItems?.[0]?.id === item.id;
  };
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setInputVal(val);
    setOpen(true);
    if (val === "") {
      setItems(options);
    } else {
      const res = options.filter((dt) =>
        dt.name.toLowerCase().includes(val.toLowerCase())
      );
      setItems(res);
    }
  };
  const onChange = (item: SelectItem) => (isSelected: boolean) => {
    onItemChanged?.(item, isSelected);
    let newSelectedItems: Array<any> | undefined = [];
    if (isMultiple) {
      newSelectedItems = isSelected
        ? [...(selectedItems || []), item]
        : selectedItems?.filter((si) => si.id !== item.id);
    } else {
      toggle();
      newSelectedItems = isSelected ? [item] : [];
      setInputVal(newSelectedItems?.[0]?.name || "");
    }
    onChanged?.(newSelectedItems || []);
    setSelectedItems(newSelectedItems);
  };
  const onRemoveItem = (el: any) => (e: any) => {
    e.stopPropagation();
    onChange(el)(false);
  };
  return (
    <div className="select__container">
      <div className="field__wrapper">
        {!!label && (
          <div className="label">
            <span>{label}</span>
          </div>
        )}
        <div className="field-container normal-button" onClick={toggle}>
          {isMultiple ? (
            <div className="input-multiple">
              {selectedItems?.map((el) => (
                <div
                  className="tag-item normal-button"
                  key={el.id}
                  onClick={onRemoveItem(el)}
                >
                  <span>{el.name}</span>
                  <i className="material-icons close-tag-icon">close</i>
                </div>
              ))}
            </div>
          ) : (
            <input
              className="input"
              placeholder={placeholder || "Select item"}
              value={inputVal}
              onChange={onChangeText}
            />
          )}
          <i className="material-icons">
            {isOpen ? "expand_less" : "expand_more"}
          </i>
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
          {items.length > 0 ? (
            items.map((el, index) => (
              <SelectItemComponent
                key={`${el.id}-${index}`}
                item={el}
                isSelected={getIsSelected(el)}
                onChange={onChange(el)}
                multiple={isMultiple}
              />
            ))
          ) : (
            <span className="empty">No options</span>
          )}
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
