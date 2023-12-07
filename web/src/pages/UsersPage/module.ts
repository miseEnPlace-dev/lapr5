import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";

export const useListUsersModule = () => {
  const [users, setUsers] = useState<User[]>([]);
  const userService = useInjection<IUserService>(TYPES.userService);

  async function fetchUsers() {
    try {
      const res = await userService.getAllUsers();

      setUsers(res);
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
  };
};
