import { useState } from "react";

export const useEmail = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (email: string) => {
    setValue(email);
    setIsValid(validateEmail(email));
  };

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return false;
    return true;
  }

  return {
    email: value,
    setEmail: onChange,
    isEmailValid: isValid,
  };
};
