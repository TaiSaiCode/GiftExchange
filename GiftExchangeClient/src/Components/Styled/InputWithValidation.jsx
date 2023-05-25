import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { isEdge } from "react-device-detect";

const InputWithValidation = ({
  min,
  novalidation = false,
  valueToConfirm,
  setValidity,
  typeInput,
  placeHolder,
  className,
  value,
  setValue,
  name,
  required,
  disabled,
}) => {
  const [error_message, setErrorMessage] = useState("");
  const [type, setType] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [checkValidation, setCheckValidation] = useState(false);
  const [gotFocused, setGotFocus] = useState(false);

  const typeDict = {
    date: {
      type: "date",
      regexChecker: (valueTobeValited) => {
        return ""; //*** test
      },
    },
    restrictedText: { type: "text", regexChecker: restrictedTextRegexMatch },
    text: { type: "text", regexChecker: textRegexMatch },
    name: { type: "text", regexChecker: nameRegexMatch },
    email: { type: "email", regexChecker: emailRegexMatch },
    tel: { type: "tel", regexChecker: telTextRegexMatch },
    url: { type: "url", regexChecker: urlChecker },
    imageUrl: { type: "url", regexChecker: imageUrlChecker },
    password: { type: "password", regexChecker: passwordRegexMatch },
    confirmPassword: {
      type: "password",
      regexChecker: checkIfPasswordsMatches,
    },
  };

  //When component mount
  useEffect(() => {
    if (required && !value) setValidity(false);
    if (disabled) setErrorMessage("");
    getTypeFromTypeInput();
  }, [typeInput, disabled]);

  /** BUFFER FOR VALIDATION */

  //Waiter that set validation when waiter was not initialize and at the end
  const waitForValidation = async () => {
    if (!waiting) {
      await setWaiting(true);
      await setCheckValidation(true);
      setTimeout(async () => {
        await setWaiting(false);
        await setCheckValidation(false);
      }, 300);
    }
  };

  //Start waiter when value change
  useEffect(() => {
    waitForValidation();
  }, [value]);

  //Validate input if waiting was respected
  useEffect(() => {
    if (!disabled) validateValue(value);
  }, [checkValidation]);

  /**END OF BUFFER FOR VALIDATION */

  //function to handle onclick: changes bewteen icon and crypted/uncrypted passwords
  function eyeToggleShowPassword() {
    setToggle((prevToggle) => !prevToggle);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  //Get real input type
  function getTypeFromTypeInput() {
    if (typeDict[typeInput]) {
      setType(typeDict[typeInput].type);
    } else {
      setType("text");
    }
  }

  /**Regex function --> Does not allow special characters */
  function restrictedTextRegexMatch(valueToBeValidated) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return !usernameRegex.test(valueToBeValidated)
      ? "Le texte ne peut contenir de caractère spéciaux"
      : "";
  }

  /**Regex function --> Does not allow special characters or numbers */
  function textRegexMatch(valueToBeValidated) {
    return "";
  }

  /**Regex function --> Allows user to have ' - or accent in their name*/
  function nameRegexMatch(valueToBeValidated) {
    const nameRegex = /^[a-zA-Z0-9\u00C0-\u024F\s'’-]+$/;
    return !nameRegex.test(valueToBeValidated)
      ? "Le texte ne peut contenir de caractère spéciaux"
      : "";
  }

  /**Regex function --> Must contain email format text example@something.com */
  function emailRegexMatch(valueToBeValidated) {
    let error = "Le email doit etre sous le format example@company.com";
    let arrayOfDomain = valueToBeValidated.split("@");
    if (arrayOfDomain.length != 2) return error;

    //domain checker
    let domainSplitted = arrayOfDomain[1].split(".");
    if (domainSplitted.length < 2) return error;
    for (let j = 0; j < domainSplitted.length; j++) {
      if (j > 0 && domainSplitted[j].length > 4) return error;
      if (j > 0 && !/^[a-zA-Z0-9]+$/.test(domainSplitted[j])) return error;
      else if (!/^[a-zA-Z0-9-]+$/.test(domainSplitted[j])) return error;
    }

    //recipient checker
    let nameSplitted = arrayOfDomain[0].split(".");
    if (nameSplitted.length < 1) return error;
    for (let j = 0; j < nameSplitted.length; j++) {
      if (!/^[a-zA-Z0-9-_!#$%&'*+/=?^`{|]+$/.test(nameSplitted[j]))
        return error;
    }

    return "";
  }

  /**Regex function --> Must contain phone format 514-123-4567 */
  function telTextRegexMatch(valueToBeValidated) {
    const telRegex = /^\d{3}-\d{3}-\d{4}$/;
    return !telRegex.test(valueToBeValidated)
      ? "Le numéro de téléphone doit etre sous le format numerique 111-222-3333"
      : "";
  }

  /**Regex function --> Validation for URL */
  function urlChecker(valueToBeValidated) {
    const urlRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return !urlRegex.test(valueToBeValidated) ? "Le URL est introuvable " : "";
  }

  /**Regex function --> Validation for Image extensions */
  function imageUrlChecker(valueToBeValidated) {
    const imageUrlCheckerRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    return !imageUrlCheckerRegex.test(valueToBeValidated)
      ? "Le URL est introuvable "
      : "";
  }

  /**Regex function --> Password must contain at least 5 characters and also 1 special character*/
  function passwordRegexMatch(valueToBeValidated) {
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+-={}|[\]\\:;"'<>,.?/~])(?=.*[a-zA-Z]).{5,}$/;
    return !passwordRegex.test(valueToBeValidated)
      ? "Le mot de pass doit contenir 5 charactère et au moins 1 charactère special"
      : "";
  }

  /**Regex function --> Passwords must match*/
  function checkIfPasswordsMatches(valueToBeValidated) {
    return valueToBeValidated == valueToConfirm
      ? ""
      : "Le mot de passe doit être identique a celui précédent";
  }

  //Main on change function
  async function validateValue(valueToBeValidated) {
    if (novalidation || !gotFocused) {
      return;
    }
    let error = getErrorIfNotValid(valueToBeValidated);
    setErrorMessage(error);
    setValidity(error ? false : true);
  }

  //Function that return an error if not valide or an empty string
  function getErrorIfNotValid(valueToBeValidated) {
    if (!valueToBeValidated && required) {
      return "Ce champs est requis!";
    }
    if (valueToBeValidated && typeDict[typeInput])
      return typeDict[typeInput].regexChecker(valueToBeValidated);

    return "";
  }

  return (
    <div style={{ position: "relative" }}>
      <Input
        min={type == "date" ? min : undefined}
        value={value}
        type={showPassword ? "text" : type}
        disabled={disabled}
        error_message={error_message}
        placeHolder={placeHolder}
        style={
          disabled
            ? { backgroundColor: "#F4F5F6" }
            : { backgroundColor: "white" }
        }
        
        className={className}
        name={name}
        required={required ? true : false}
        onPaste={
          type == "password"
            ? (e) => {
                e.preventDefault();
                return false;
              }
            : undefined
        }
        onCopy={
          type == "password"
            ? (e) => {
                e.preventDefault();
                return false;
              }
            : undefined
        }
        onCut={
          type == "password"
            ? (e) => {
                e.preventDefault();
                return false;
              }
            : undefined
        }
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={(e) => {
          if (!gotFocused) setGotFocus(true);
        }}
      />

      {type === "password" && value && (
        <div style={{ position: "absolute", top: "15%", right: "10px" }}>
          {!isEdge && (
            <button
              type="button"
              onClick={eyeToggleShowPassword}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
            >
              {toggle ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          )}
        </div>
      )}
      <Error>{error_message}</Error>
    </div>
  );
};

const Error = styled.text`
  color: red;
  font-size: 12px;
  margin-top: 2px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  ${({ error_message }) =>
    error_message &&
    `
    border-color: red;
  `}
`;

export default InputWithValidation;
