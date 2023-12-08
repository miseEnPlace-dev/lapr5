import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { useAuth } from "@/hooks/useAuth";
import { Building } from "@/model/Building";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";
import { sanitizeRole } from "@/utils/sanitizeRole";

export const useModule = () => {
  const userService = useInjection<IUserService>(TYPES.userService);
  const { username, role } = useAuth();
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
    fetchUser();
  };

  return {
    deleteUser,
    username,
    user,
    firstNameInputRef,
    lastNameInputRef,
    phoneNumberInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    handleUpdate,
    role: sanitizedRole,
  };
};
