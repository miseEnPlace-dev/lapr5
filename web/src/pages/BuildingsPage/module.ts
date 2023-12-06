import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useListBuildingsModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const [buildings, setBuildings] = useState<IPaginationDTO<Building> | null>(
    null
  );
  const [filters, setFilters] = useState<string[] | null>(null);
  const [page, setPage] = useState<number>(1);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const itemsPerPage = 3;

  const fetchBuildings = useCallback(async () => {
    try {
      let b = await buildingService.getBuildings(
        filters || undefined,
        page,
        itemsPerPage
      );

      setBuildings(b);
    } catch (e) {
      setBuildings({ data: [] });
    }
  }, [buildingService, filters, page]);

  useEffect(() => {
    fetchBuildings();
  }, [buildingService, fetchBuildings]);

  const handlePagination = (page: number) => {
    setPage(page);
  };

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
    filters,
    setFilters,
    handlePagination,
  };
};
