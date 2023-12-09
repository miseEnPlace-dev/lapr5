import { useState } from "react";

export const useNif = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (nif: string) => {
    setValue(nif);
    setIsValid(validateNif(nif));
  };

  // TODO: Expand this to validate all PT NIFs
  // This only validates PT Singular Person NIFs
  // Source: https://codepen.io/caneco/pen/gOMZvqQ
  function validateNif(nif: string) {
    // has 9 digits?
    if (!/^[0-9]{9}$/.test(nif)) return false;

    // is from a person?
    if (!/^[123]|45|5/.test(nif)) return false;

    const value = nif.split("").map(Number);

    // digit check
    const tot =
      value[0] * 9 +
      value[1] * 8 +
      value[2] * 7 +
      value[3] * 6 +
      value[4] * 5 +
      value[5] * 4 +
      value[6] * 3 +
      value[7] * 2;
    const div = tot / 11;
    const mod = tot - Math.trunc(div) * 11;
    const tst = mod == 1 || mod == 0 ? 0 : 11 - mod;
    return value[8] == tst;
  }

  return {
    nif: value,
    setNif: onChange,
    isNifValid: isValid,
  };
};
