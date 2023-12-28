import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { Request } from "@/model/Request";
import { IUserService } from "@/service/IService/IUserService";
import { RequestService } from "@/service/requestService";
import { useAuth } from "@/hooks/useAuth";

export const useListTaskRequestsModule = () => {
  const userService = useInjection<IUserService>(TYPES.userService);
  const requestService = useInjection<RequestService>(TYPES.requestService);
  const { id, username, phoneNumber } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);

  const [stateFilter, setStateFilter] = useState<string | null>("");
  const stateInputRef = useRef<HTMLSelectElement>(null);

  const [userFilter, setUserFilter] = useState<string | null>("");
  const userInputRef = useRef<HTMLSelectElement>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const r = await requestService.getAllRequests(
        stateFilter ? "state" : userFilter ? "userId" : undefined,
        stateFilter || userFilter || undefined
      );
      setRequests(r);
    } catch (error) {
      setRequests([]);
    }
  }, [requestService, stateFilter, userFilter]);

  async function handleAcceptRequest(id: string) {
    try {
      if (!id || id.length === 0 || id == "") throw new Error("Invalid request id");
      await requestService.acceptRequest(id);
      fetchRequests();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleRejectRequest(id: string) {
    try {
      if (!id || id.length === 0 || id == "") throw new Error("Invalid request id");
      await requestService.rejectRequest(id);
      fetchRequests();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    stateFilter,
    setStateFilter,
    handleAcceptRequest,
    handleRejectRequest
  };
};
