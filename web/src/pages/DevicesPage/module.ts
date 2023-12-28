import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Device } from "@/model/Device";
import { DeviceModel } from "@/model/DeviceModel";
import { Floor } from "@/model/Floor";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IDeviceService } from "@/service/IService/IDeviceService";
import { IFloorService } from "@/service/IService/IFloorService";

export const useListDeviceModule = () => {
  const deviceService = useInjection<IDeviceService>(TYPES.deviceService);
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const [devices, setDevices] = useState<IPaginationDTO<Device> | null>(null);
  const [deviceModels, setDeviceModels] =
    useState<IPaginationDTO<DeviceModel> | null>(null);
  const [modelFilter, setModelFilter] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<string | null>(null);
  const [floors, setFloors] = useState<Floor[]>([]);

  const [page, setPage] = useState<number>(1);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLSelectElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const depthInputRef = useRef<HTMLInputElement>(null);
  const floorCodeInputRef = useRef<HTMLSelectElement>(null);

  const taskFilterInputRef = useRef<HTMLSelectElement>(null);
  const modelFilterInputRef = useRef<HTMLSelectElement>(null);

  const itemsPerPage = 3;

  const fetchDevices = useCallback(async () => {
    try {
      const devices = await deviceService.getDevicesRobots(
        taskFilter ? "task" : modelFilter ? "model" : undefined,
        taskFilter || modelFilter || undefined,
        page,
        itemsPerPage
      );

      setDevices(devices);
    } catch (e) {
      setDevices({ data: [] });
    }
  }, [deviceService, taskFilter, modelFilter, page, itemsPerPage]);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const fetchFloors = useCallback(async () => {
    try {
      const floors = await floorService.getAllFloors();

      setFloors(floors);
    } catch (e) {
      setFloors([]);
    }
  }, [floorService, page, itemsPerPage]);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels(1, 1000);
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDevices();
    fetchDeviceModels();
    fetchFloors();
  }, [
    fetchDevices,
    deviceModelService,
    fetchDeviceModels,
    deviceService,
    fetchFloors,
    floorService,
  ]);

  const handleSave = async () => {
    if (!codeInputRef.current) {
      throw new Error("Code is required");
    }

    if (!nicknameInputRef.current) {
      throw new Error("Nickname is required");
    }

    if (!modelCodeInputRef.current) {
      throw new Error("Model code is required");
    }

    if (!serialNumberInputRef.current) {
      throw new Error("Serial number is required");
    }

    if (!widthInputRef.current) {
      throw new Error("Width is required");
    }

    if (!depthInputRef.current) {
      throw new Error("Depth is required");
    }

    if (!floorCodeInputRef.current) {
      throw new Error("Floor code is required");
    }

    const device: Device = {
      code: codeInputRef.current.value,
      nickname: nicknameInputRef.current.value,
      modelCode: modelCodeInputRef.current?.value || "",
      serialNumber: serialNumberInputRef.current?.value || "",
      description: descriptionInputRef.current?.value || "",
      isAvailable: true,
      initialCoordinates: {
        width: parseFloat(widthInputRef.current?.value || "0"),
        depth: parseFloat(depthInputRef.current?.value || "0"),
        floorCode: floorCodeInputRef.current?.value || "",
      },
    };
    await deviceService.createDevice(device);
    fetchDevices();
  };

  const capabilities = [
    {
      name: "Pick and Delivery",
      code: "pick_delivery",
    },
    {
      name: "Surveillance",
      code: "surveillance",
    },
  ];

  return {
    devices,
    handleSave,
    codeInputRef,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    deviceModels,
    capabilities,
    modelFilter,
    setModelFilter,
    taskFilter,
    setTaskFilter,
    taskFilterInputRef,
    modelFilterInputRef,
    handlePagination,
    widthInputRef,
    depthInputRef,
    floorCodeInputRef,
    floors,
  };
};
