import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { useInjection } from "inversify-react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { TYPES } from "@/inversify/types";
import { useEmail } from "@/hooks/useEmail";
import { useNif } from "@/hooks/useNif";
import { usePhoneNumber } from "@/hooks/usePhoneNumber";
import AuthContext from "@/context/AuthContext";
import { GoogleUserInfo } from "@/model/GoogleUserInfo";
import { IUserService } from "@/service/IService/IUserService";

import { AxiosError } from "axios";

export const useRegisterPageModule = () => {
  const navigate = useNavigate();

  const userService = useInjection<IUserService>(TYPES.userService);

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");
  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumber("");
  const { nif, setNif, isNifValid } = useNif("");
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const [googleUserInfo, setGoogleUserInfo] = useState<GoogleUserInfo | null>(
    null
  );
  const { state } = useLocation();

  const getGoogleUserInfo = useCallback(async () => {
    if (state?.googleCredential)
      userService.getGoogleUserInfo(state.googleCredential).then((res) => {
        setGoogleUserInfo(res);
      });
  }, []);

  useEffect(() => {
    getGoogleUserInfo();
  }, []);

  const handleRegister = async () => {
    if (
      !isEmailValid ||
      !password ||
      !firstNameInputRef.current ||
      !lastNameInputRef.current ||
      !isPhoneNumberValid ||
      !isNifValid ||
      !isAgreed
    )
      return;

    try {
      await userService.register({
        email,
        password,
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current?.value,
        nif,
        phoneNumber,
        role: "user",
      });
      swal(
        "Success",
        "You must now wait for an Administrator to approve your account",
        "success"
      );
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message)
        swal("Error", err.response.data.message, "error");
      else swal("Error", "Error creating account", "error");
      setPassword("");
    }
  };

  const handleRegisterWithGoogle = async () => {
    if (
      !isPhoneNumberValid ||
      !isNifValid ||
      !isAgreed ||
      !googleUserInfo ||
      !googleUserInfo.family_name ||
      !googleUserInfo.email ||
      !googleUserInfo.given_name
    )
      return;

    try {
      await userService.register({
        email: googleUserInfo.email,
        firstName: googleUserInfo.given_name,
        lastName: googleUserInfo.family_name,
        nif,
        phoneNumber,
        role: "user",
      });
      swal(
        "Success",
        "You must now wait for an Administrator to approve your account",
        "success"
      );
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message)
        swal("Error", err.response.data.message, "error");
      else swal("Error", "Error creating account", "error");
      setPassword("");
    }
  };

  return {
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValid,
    nif,
    setNif,
    isNifValid,
    firstNameInputRef,
    lastNameInputRef,
    isAgreed,
    setIsAgreed,
    handleRegister,
    googleUserInfo,
    handleRegisterWithGoogle,
  };
};
