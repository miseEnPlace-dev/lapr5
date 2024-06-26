import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Device } from "@/model/Device";
import { DeviceModel } from "@/model/DeviceModel";
import { Request } from "@/model/Request";
import { User } from "@/model/User";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IDeviceService } from "@/service/IService/IDeviceService";
import { IRequestService } from "@/service/IService/IRequestService";
import { IUserService } from "@/service/IService/IUserService";

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
  const userService = useInjection<IUserService>(TYPES.userService);
  const deviceService = useInjection<IDeviceService>(TYPES.deviceService);
  // const { id, username, phoneNumber } = useAuth();

  const [requests, setRequests] = useState<IPaginationDTO<Request> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);

  const [stateFilter, setStateFilter] = useState<string | null>("Pending");
  const stateInputRef = useRef<HTMLSelectElement>(null);

  const [userFilter, setUserFilter] = useState<string | null>("");
  const userInputRef = useRef<HTMLSelectElement>(null);

  const [deviceModelFilter, setDeviceModelFilter] = useState<string | null>("");
  const deviceModelInputRef = useRef<HTMLSelectElement>(null);

  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const [devices, setDevices] = useState<Device[]>([]);

  const [requestId, setRequestId] = useState<string>("");

  const deviceInputRef = useRef<HTMLSelectElement>(null);

  const itemsPerPage = 3;

  const requestTypes = [
    {
      code: "pick-delivery",
      name: "Pick and Delivery",
    },
    {
      code: "surveillance",
      name: "Surveillance",
    },
  ];

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels(1, 1000);
    setDeviceModels(deviceModels.data);
  }, [deviceModelService]);

  const fetchUsers = useCallback(async () => {
    const users = await userService.getAllUsers(1, 1000);
    setUsers(users.data);
  }, [userService]);

  const fetchDevices = useCallback(async () => {
    const request = requests?.data.find((r) => r.id == requestId);
    const devices = await deviceService.getDevicesRobots(
      "task",
      request?.type,
      1,
      1000
    );
    setDevices(devices.data);
  }, [deviceService, requestId, requests?.data]);

  useEffect(() => {
    fetchDeviceModels();
    fetchUsers();
    fetchDevices();
  }, [fetchDeviceModels, fetchDevices, fetchUsers]);

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
  }, [
    deviceModelFilter,
    requestService,
    stateFilter,
    userFilter,
    page,
    deviceModelService,
  ]);

  async function handleAcceptRequest() {
    try {
      if (!requestId || requestId.length === 0 || requestId == "")
        throw new Error("Invalid request id");

      const device = devices.find((d) => d.id == deviceInputRef.current?.value);

      if (!device) throw new Error("Invalid device id");

      await requestService.acceptRequest(requestId, device.id);
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
    devices,
    deviceInputRef,
    setRequestId,
    users,
    requestTypes,
  };
};
