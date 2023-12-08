import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { useAuth } from "@/hooks/useAuth";
import { IUserDataDTO } from "@/dto/IUserDataDTO";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";
import { sanitizeRole } from "@/utils/sanitizeRole";

export const useModule = () => {
  const userService = useInjection<IUserService>(TYPES.userService);
  const { username, role, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const sanitizedRole = role ? sanitizeRole(role) : "";

  const fetchUser = useCallback(async () => {
    try {
      const u = await userService.getCurrentUser();

      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, [userService]);

  useEffect(() => {
    fetchUser();
  }, [userService, fetchUser]);

  const deleteUser = async () => {
    await userService.deleteUser();
  };

  const handleUpdate = async () => {
    if (
      !firstNameInputRef.current ||
      !lastNameInputRef.current ||
      !phoneNumberInputRef.current
    )
      throw new Error("Invalid data");

    if (
      passwordInputRef.current?.value !== confirmPasswordInputRef.current?.value
    )
      throw new Error("Passwords do not match");

    const part: Partial<User> = {
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
      phoneNumber: phoneNumberInputRef.current?.value,
      password:
        passwordInputRef.current?.value === ""
          ? undefined
          : passwordInputRef.current?.value,
    };

    await userService.updateUser(part);
  };

  // TODO: This is a temporary solution!!!!!!!!!!!!!!!
  const downloadData = async () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        JSON.stringify(
          user,
          (k, v) => {
            if (k === "id") return undefined;
            if (k === "exp") return undefined;
            if (k === "iat") return undefined;
            if (k === "password") return undefined;
            return v;
          },
          2
        ),
      ],
      {
        type: "application/json",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${user?.firstName}_${user?.lastName}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return {
    deleteUser,
    username,
    user,
    logout,
    firstNameInputRef,
    lastNameInputRef,
    phoneNumberInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    handleUpdate,
    downloadData,
    role: sanitizedRole,
  };
};
