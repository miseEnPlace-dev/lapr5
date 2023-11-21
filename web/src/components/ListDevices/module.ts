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

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLInputElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchDevices = useCallback(async () => {
    const devices = await deviceService.getDevicesRobots();
    setDevices(devices);
  }, [deviceService]);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels();
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

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
  };
};
