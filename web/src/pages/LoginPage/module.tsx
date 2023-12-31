import { useContext, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { useInjection } from "inversify-react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { TYPES } from "@/inversify/types";
import { useEmail } from "@/hooks/useEmail";
import AuthContext from "@/context/AuthContext";
import { IUserService } from "@/service/IService/IUserService";

export const useLoginPageModule = () => {
  const service = useInjection<IUserService>(TYPES.userService);

  const navigate = useNavigate();
  const { login, loginWithGoogle } = useContext(AuthContext);
  const { state } = useLocation();

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async (response: CredentialResponse) => {
    if (response.credential) {
      const userExists = await service.checkIfUserExistsByGoogleCredential(
        response.credential
      );

      if (userExists) {
        loginWithGoogle(response.credential)
          .then(() => {
            navigate(state?.path || "/");
          })
          .catch(() => {
            handleGoogleError();
          });
      } else {
        navigate("/register", {
          state: { googleCredential: response.credential },
        });
      }
    } else handleGoogleError();
  };

  const handleGoogleError = () => {
    swal("Error", "Something went wrong... Please try again.", "error");
  };

  const handleLogin = () => {
    login(email, password)
      .then(() => {
        navigate(state?.path || "/");
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Invalid email or password", "error");
        setPassword("");
      });
  };

  return {
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    handleGoogleLogin,
    handleGoogleError,
    handleLogin,
  };
};
