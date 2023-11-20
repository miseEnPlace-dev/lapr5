import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Device } from "@/model/Device";
import { IDeviceService } from "@/service/IService/IDeviceService";

export const useBuildingPageModule = () => {
  const deviceService = useInjection<IDeviceService>(TYPES.deviceService);

  const { deviceCode } = useParams();

  const [device, setDevice] = useState<Device>();

  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const modelCodeInputRef = useRef<HTMLInputElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchDevice = useCallback(
    async (deviceCode: string) => {
      const device = await deviceService.getDevice(deviceCode);
      setDevice(device);
    },
    [deviceService]
  );

  useEffect(() => {
    async function fetchData() {
      if (!deviceCode) return;

      fetchDevice(deviceCode);
    }

    fetchData();
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
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    handleSaveDevice,
    handleInhibitDevice,
  };
};
