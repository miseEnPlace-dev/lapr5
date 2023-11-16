import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";

import { DeviceModel } from "../../model/DeviceModel";
import { IDeviceModelService } from "../../service/IService/IDeviceModelService";

export const useListDeviceModelModule = () => {
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<
    { name: "pick_delivery" | "surveillance"; selected: boolean }[]
  >([
    {
      name: "pick_delivery",
      selected: false,
    },
    {
      name: "surveillance",
      selected: false,
    },
  ]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels();
    console.log(deviceModels);
    setDeviceModels(deviceModels);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDeviceModels();
  }, [deviceModelService, fetchDeviceModels]);

  const handleSave = async () => {
    if (!codeInputRef.current || !nameInputRef.current)
      throw new Error("Invalid data");

    const deviceModel: DeviceModel = {
      code: codeInputRef.current?.value,
      name: nameInputRef.current?.value,
      brand: brandInputRef.current?.value,
      type: "robot",
      capabilities: selectedCapabilities.map((capability) => capability.name),
    };
    await deviceModelService.createDeviceModel(deviceModel);
    fetchDeviceModels();
  };

  return {
    deviceModels,
    codeInputRef,
    nameInputRef,
    brandInputRef,
    handleSave,
    selectedCapabilities,
    setSelectedCapabilities,
  };
};
