import { useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { useEmail } from "@/hooks/useEmail";
import { usePhoneNumber } from "@/hooks/usePhoneNumber";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";

export const useListUsersModule = () => {
  const [users, setUsers] = useState<User[]>([]);
  const userService = useInjection<IUserService>(TYPES.userService);

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");
  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumber("");
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  async function fetchUsers() {
    try {
      const res = await userService.getAllUsers();

      setUsers(res);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleCreateUser() {
    if (
      !isEmailValid ||
      !password ||
      !firstNameInputRef.current ||
      !lastNameInputRef.current ||
      !isPhoneNumberValid ||
      !isAgreed
    )
      return;

    try {
      const res = await userService.register({
        email,
        password,
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current?.value,
        phoneNumber,
      });

      if (res) {
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  useEffect(() => {
    fetchUsers();
  });

  return {
    users,
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValid,
    firstNameInputRef,
    lastNameInputRef,
    isAgreed,
    handleCreateUser,
    setIsAgreed,
  };
};
