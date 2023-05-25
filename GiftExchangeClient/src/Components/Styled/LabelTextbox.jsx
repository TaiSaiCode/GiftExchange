import React from "react";
import InputWithValidation from "./InputWithValidation";
/**
 *  * -[type]: input as string
 * -id: string
 * -labeltext: string
 * -placeholder: string
 * -required: boolean
 * -[onChange]: function
 * @param props
 * @returns
 */

export function MandatoryLegend() {
  return (
    <div style={{ fontSize: "12px" }}>
      <b>
        {" "}
        <span style={{ color: "red" }}>*</span>Champ obligatoire{" "}
      </b>
    </div>
  );
}

export function LabelTextbox({
  min,
  novalidation = false,
  type = "text",
  required = false,
  placeholder = "",
  id = "",
  name,
  value,
  setValue,
  setValidity = () => {},
  valueToConfirm,
  labelText,
  disabled,
}) {
  let req = required ? "*" : "";

  const DEFCLASSINPUT =
    "tw-bg-white tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 tw-dark:bg-gray-600 tw-dark:border-gray-500 tw-dark:placeholder-gray-400 tw-dark:text-white";
  const DEFCLASSLABEL =
    "tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 tw-dark:text-white";

  return (
    <>
      <label htmlFor={id} className={DEFCLASSLABEL}>
        {labelText}{" "}
        <span title="Obligatoire" style={{ color: "red" }}>
          {req}
        </span>{" "}
      </label>

      <InputWithValidation
        min={min}
        novalidation={novalidation}
        id={id}
        name={name}
        value={value}
        setValue={setValue}
        setValidity={setValidity}
        valueToConfirm={valueToConfirm}
        placeholder={placeholder}
        className={DEFCLASSINPUT}
        required={required}
        typeInput={type}
        disabled={disabled}
      />
    </>
  );
}
