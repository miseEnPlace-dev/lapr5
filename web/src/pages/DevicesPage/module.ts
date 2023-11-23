import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { Device } from "@/model/Device";
import { DeviceModel } from "@/model/DeviceModel";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IDeviceService } from "@/service/IService/IDeviceService";

export const useListDeviceModule = () => {
  const deviceService = useInjection<IDeviceService>(TYPES.deviceService);
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);
  const [modelFilter, setModelFilter] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<string | null>(null);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLSelectElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const taskFilterInputRef = useRef<HTMLSelectElement>(null);
  const modelFilterInputRef = useRef<HTMLSelectElement>(null);

  const fetchDevices = useCallback(async () => {
    try {
      let devices: Device[];
      if (modelFilter)
        devices = await deviceService.getDevicesRobots("model", modelFilter);
      else if (taskFilter)
        devices = await deviceService.getDevicesRobots("task", taskFilter);
      else devices = await deviceService.getDevicesRobots();

      setDevices(devices);
    } catch (e) {
      setDevices([]);
    }
  }, [deviceService, taskFilter, modelFilter]);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels();
    console.log(deviceModels);
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDevices();
    fetchDeviceModels();
  }, [fetchDevices, deviceModelService, fetchDeviceModels]);

  const handleSave = async () => {
    if (!codeInputRef.current) {
      throw new Error("Code is required");
    }

    if (!nicknameInputRef.current) {
      throw new Error("Nickname is required");
    }

    const device: Device = {
      code: codeInputRef.current.value,
      nickname: nicknameInputRef.current.value,
      modelCode: modelCodeInputRef.current?.value || "",
      serialNumber: serialNumberInputRef.current?.value || "",
      description: descriptionInputRef.current?.value || "",
      isAvailable: true,
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
  };
};
