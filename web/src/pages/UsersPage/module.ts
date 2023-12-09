import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { useEmail } from "@/hooks/useEmail";
import { usePhoneNumber } from "@/hooks/usePhoneNumber";
import { Role } from "@/model/Role";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";

export const useListUsersModule = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);
  const userService = useInjection<IUserService>(TYPES.userService);

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");
  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumber("");
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const roleInputRef = useRef<HTMLSelectElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await userService.getAllUsers();

      setUsers(res);
    } catch (err) {
      setUsers([]);
      console.log(err);
      throw err;
    }
  }, [userService]);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await userService.getAllRoles();

      setRoles(
        res.map((role: Role) => ({ code: role.name, name: role.title }))
      );
    } catch (err) {
      throw err;
    }
  }, [userService]);

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
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  return {
    users,
    email,
    role,
    setRole,
    roles,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValid,
    firstNameInputRef,
    lastNameInputRef,
    roleInputRef,
    isAgreed,
    handleCreateUser,
    setIsAgreed,
  };
};
