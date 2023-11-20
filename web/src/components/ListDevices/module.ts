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
  const [filters, setFilters] = useState<string[] | null>(null);
  const [values, setValues] = useState<string[] | null>(null);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLInputElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const deviceTaskFilterInputRef = useRef<HTMLInputElement>(null);
  const deviceTaskFilterValueInputRef = useRef<HTMLInputElement>(null);
  const deviceModelDesignationFilterInputRef = useRef<HTMLInputElement>(null);
  const deviceModelDesignationFilterValueInputRef = useRef<HTMLInputElement>(null);

  const fetchDevices = useCallback(async () => {
    try {

      let devices: Device[];
      if (!filters || !values)
        devices = await deviceService.getDevicesRobots();
      else devices = await deviceService.getDevicesRobots(filters, values);

      console.log(devices)

      setDevices(devices);
    } catch (e) {
      setDevices([]);
    }
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
