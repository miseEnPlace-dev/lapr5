import { useCallback, useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { User } from "@/model/User";
import { IUserService } from "@/service/IService/IUserService";

export const useListRequestsModule = () => {
  const [requests, setRequests] = useState<User[]>([]);
  const userService = useInjection<IUserService>(TYPES.userService);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await userService.getRequests();

      setRequests(res);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, [userService]);

  async function handleAcceptRequest(id: string) {
    try {
      await userService.acceptRequest(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleRejectRequest(id: string) {
    try {
      await userService.rejectRequest(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    requests,
    handleAcceptRequest,
    handleRejectRequest,
  };
};
