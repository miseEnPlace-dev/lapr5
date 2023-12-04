import { useState } from "react";

export const usePhoneNumber = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (phoneNumber: string) => {
    setValue(phoneNumber);
    setIsValid(validatePhoneNumber(phoneNumber));
  };

  function validatePhoneNumber(phoneNumber: string) {
    const re = /^(9[1236]\d{7})|([23]\d{8})$/;
    if (!re.test(phoneNumber)) return false;
    return true;
  }

  return {
    phoneNumber: value,
    setPhoneNumber: onChange,
    isPhoneNumberValid: isValid,
  };
};
