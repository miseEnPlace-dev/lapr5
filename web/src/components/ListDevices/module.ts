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
  const [filters, setFilters] = useState<string[] | null>(null);
  const [values, setValues] = useState<string[] | null>(null);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLSelectElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const deviceTaskFilterInputRef = useRef<HTMLInputElement>(null);
  const deviceTaskFilterValueInputRef = useRef<HTMLInputElement>(null);
  const deviceModelDesignationFilterInputRef = useRef<HTMLInputElement>(null);
  const deviceModelDesignationFilterValueInputRef =
    useRef<HTMLInputElement>(null);

  const fetchDevices = useCallback(async () => {
    try {
      let devices: Device[];
      if (!filters || !values) devices = await deviceService.getDevicesRobots();
      else devices = await deviceService.getDevicesRobots(filters, values);

      console.log(devices);

      setDevices(devices);
    } catch (e) {
      setDevices([]);
    }
  }, [deviceService]);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels();
    console.log(deviceModels);
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDeviceModels();
  }, [deviceModelService, fetchDeviceModels]);

  useEffect(() => {
    fetchDevices();
    fetchDeviceModels();
  }, [fetchDevices, fetchDeviceModels]);

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

  return {
    devices,
    handleSave,
    codeInputRef,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    deviceModels,
    filters,
    setFilters,
    values,
    setValues,
    deviceTaskFilterInputRef,
    deviceTaskFilterValueInputRef,
    deviceModelDesignationFilterInputRef,
    deviceModelDesignationFilterValueInputRef,
  };
};
