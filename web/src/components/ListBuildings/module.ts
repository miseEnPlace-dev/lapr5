import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useListBuildingsModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const [buildings, setBuildings] = useState<Building[]>([]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchBuildings = useCallback(async () => {
    const b = await buildingService.getBuildings();
    setBuildings(b);
  }, [buildingService]);

  useEffect(() => {
    fetchBuildings();
  }, [buildingService, fetchBuildings]);

  const handleSave = async () => {
    if (
      !codeInputRef.current ||
      !lengthInputRef.current ||
      !widthInputRef.current ||
      !nameInputRef.current
    )
      throw new Error("Invalid data");

    const building: Building = {
      code: codeInputRef.current?.value,
      maxDimensions: {
        length: parseFloat(lengthInputRef.current?.value),
        width: parseFloat(widthInputRef.current?.value),
      },
      name: nameInputRef.current?.value,
      description: descriptionInputRef.current?.value,
    };
    await buildingService.createBuilding(building);
    fetchBuildings();
  };

  return {
    buildings,
    codeInputRef,
    nameInputRef,
    lengthInputRef,
    widthInputRef,
    descriptionInputRef,
    handleSave,
  };
};
