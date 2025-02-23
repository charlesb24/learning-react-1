import {useState} from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [edited, setEdited] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputBlur() {
    setEdited(true);
  }

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setEdited(false);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: edited && !valueIsValid,
  };
}