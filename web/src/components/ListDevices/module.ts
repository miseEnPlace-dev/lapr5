import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";

import { IDeviceService } from "@/service/IService/IDeviceService";
import { Device } from "@/model/Device";

export const useListDeviceModule = () => {
  const deviceService = useInjection<IDeviceService>(
    TYPES.deviceService
  );
  const [devices, setDevices] = useState<Device[]>([]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLInputElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchDevices = useCallback(async () => {
    const devices = await deviceService.getDevicesRobots();
    console.log(devices);
    setDevices(devices);
  }, [deviceService]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleSave = async () => {
    if (!codeInputRef.current) {
      throw new Error("Code is required");
    }

    if (!nicknameInputRef.current) {
      throw new Error("Nickname is required");
    };

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
