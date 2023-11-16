import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";

import { DeviceModel } from "../../model/DeviceModel";
import { IDeviceModelService } from "../../service/IService/IDeviceModelService";

export const useListDeviceModelModule = () => {
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  const [deviceModels, setDeviceModel] = useState<DeviceModel[]>([]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);

  const fetchDeviceModel = useCallback(async () => {
    const b = await deviceModelService.getDeviceModels();
    setDeviceModel(b);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDeviceModel();
  }, [deviceModelService, fetchDeviceModel]);

  const handleSave = async () => {
    if (!codeInputRef.current || !nameInputRef.current)
      throw new Error("Invalid data");

    const deviceModel: DeviceModel = {
      code: codeInputRef.current?.value,
      name: nameInputRef.current?.value,
      brand: brandInputRef.current?.value,
      type: "robot",
      capabilities,
    };
    await deviceModelService.createDeviceModel(deviceModel);
    fetchDeviceModel();
  };

  return {
    deviceModels,
    codeInputRef,
    nameInputRef,
    brandInputRef,
    handleSave,
  };
};
