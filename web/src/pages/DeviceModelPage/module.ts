import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Device } from "@/model/Device";
import { DeviceModel } from "@/model/DeviceModel";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IDeviceService } from "@/service/IService/IDeviceService";

export const useDeviceModelPageModule = () => {
  const deviceService = useInjection<IDeviceService>(TYPES.deviceService);
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );

  const { deviceCode } = useParams();

  const [device, setDevice] = useState<Device>();
  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);

  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLSelectElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchDevice = useCallback(
    async (deviceCode: string) => {
      const device = await deviceService.getDevice(deviceCode);
      setDevice(device);
    },
    [deviceService]
  );

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels();
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    async function fetchData() {
      if (!deviceCode) return;

      fetchDevice(deviceCode);
    }

    fetchData();
    fetchDeviceModels();
  }, [
    deviceCode,
    fetchDevice,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
  ]);

  async function handleSaveDevice() {
    // TODO
  }

  async function handleInhibitDevice() {
    if (!deviceCode) return;

    await deviceService.inhibitDevice(deviceCode);

    fetchDevice(deviceCode);
  }

  return {
    device,
    deviceModels,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    handleSaveDevice,
    handleInhibitDevice,
  };
};
