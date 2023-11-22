import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { DeviceModel } from "@/model/DeviceModel";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";

export const useDeviceModelPageModule = () => {
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );

  const { deviceModelCode } = useParams();

  const [deviceModel, setDeviceModel] = useState<DeviceModel>();
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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);

  const fetchDeviceModel = useCallback(
    async (deviceModelCode: string) => {
      const deviceModel =
        await deviceModelService.getDeviceModelWithCode(deviceModelCode);
      setDeviceModel(deviceModel);
      setSelectedCapabilities([
        {
          name: "pick_delivery",
          selected:
            deviceModel?.capabilities?.includes("pick_delivery") || false,
        },
        {
          name: "surveillance",
          selected:
            deviceModel?.capabilities?.includes("surveillance") || false,
        },
      ]);
    },
    [deviceModelService]
  );

  useEffect(() => {
    async function fetchData() {
      if (!deviceModelCode) return;

      fetchDeviceModel(deviceModelCode);
    }

    fetchData();
  }, [deviceModelCode, fetchDeviceModel, nameInputRef, brandInputRef]);

  async function handleSaveDeviceModel() {
    if (!nameInputRef.current || !brandInputRef.current || !deviceModelCode)
      throw new Error("Invalid data");

    const deviceModel: DeviceModel = {
      code: deviceModelCode,
      name: nameInputRef.current?.value,
      brand: brandInputRef.current?.value,
      type: "robot",
      capabilities: selectedCapabilities.map((capability) => capability.name),
    };
    await deviceModelService.updateDeviceModel(deviceModel);
    fetchDeviceModel(deviceModelCode);
  }

  return {
    deviceModel,
    nameInputRef,
    brandInputRef,
    selectedCapabilities,
    setSelectedCapabilities,
    handleSaveDeviceModel,
  };
};
