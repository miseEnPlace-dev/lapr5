import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { DeviceModel } from "@/model/DeviceModel";
import { Request } from "@/model/Request";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IRequestService } from "@/service/IService/IRequestService";

const states = [
  {
    name: "Pending",
    code: "pending",
  },
  {
    name: "Accepted",
    code: "accepted",
  },
  {
    name: "Rejected",
    code: "rejected",
  },
  {
    name: "Executed",
    code: "executed",
  },
];

export const useListTaskRequestsModule = () => {
  // const userService = useInjection<IUserService>(TYPES.userService);
  const requestService = useInjection<IRequestService>(TYPES.requestService);
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  // const { id, username, phoneNumber } = useAuth();

  const [requests, setRequests] = useState<IPaginationDTO<Request> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);

  const [stateFilter, setStateFilter] = useState<string | null>("");
  const stateInputRef = useRef<HTMLSelectElement>(null);

  const [userFilter, setUserFilter] = useState<string | null>("");
  const userInputRef = useRef<HTMLSelectElement>(null);

  const [deviceModelFilter, setDeviceModelFilter] = useState<string | null>("");
  const deviceModelInputRef = useRef<HTMLSelectElement>(null);

  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);

  const itemsPerPage = 3;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels(1, 1000);
    setDeviceModels(deviceModels.data);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDeviceModels();
  }, [fetchDeviceModels]);

  const fetchRequests = useCallback(async () => {
    try {
      if (deviceModelFilter) {
        const deviceModel =
          await deviceModelService.getDeviceModelWithCode(deviceModelFilter);

        if (deviceModel.capabilities.length == 2) {
          const r = await requestService.getAllRequests(
            undefined,
            undefined,
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }

        if (deviceModel.capabilities[0] == "surveillance") {
          const r = await requestService.getRequestsByType(
            "surveillance",
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }

        if (deviceModel.capabilities[0] == "pick_delivery") {
          const r = await requestService.getRequestsByType(
            "pick_delivery",
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }
      }
      const r = await requestService.getAllRequests(
        stateFilter ? "state" : userFilter ? "userId" : undefined,
        stateFilter || userFilter || undefined,
        page,
        itemsPerPage
      );
      setRequests(r);
    } catch (error) {
      setRequests({ data: [] });
    }
  }, [requestService, stateFilter, userFilter, page, itemsPerPage]);

  async function handleAcceptRequest(id: string) {
    try {
      if (!id || id.length === 0 || id == "")
        throw new Error("Invalid request id");
      await requestService.acceptRequest(id);
      fetchRequests();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleRejectRequest(id: string) {
    try {
      if (!id || id.length === 0 || id == "")
        throw new Error("Invalid request id");
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
    states,
    requests,
    stateInputRef,
    stateFilter,
    setStateFilter,
    handleAcceptRequest,
    handleRejectRequest,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
    userInputRef,
    userFilter,
    setUserFilter,
    deviceModelInputRef,
    deviceModelFilter,
    setDeviceModelFilter,
    deviceModels,
  };
};
