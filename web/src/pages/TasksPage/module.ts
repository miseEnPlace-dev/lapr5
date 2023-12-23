import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Floor } from "@/model/Floor";
import { IFloorService } from "@/service/IService/IFloorService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

const taskTypes = [
  {
    name: "Pick and Delivery",
    code: "pick_delivery",
  },
  {
    name: "Surveillance",
    code: "surveillance",
  },
];

export const useTasksModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const [requests, setRequests] = useState<IPaginationDTO<Building> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string | null>(null);

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [building1Floors, setBuilding1Floors] = useState<Floor[]>([]);

  const [building1Code, setBuilding1Code] = useState<string | null>("");
  const [building2Code, setBuilding2Code] = useState<string | null>("");

  const typeInputRef = useRef<HTMLSelectElement>(null);

  const itemsPerPage = 3;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    async function fetchBuildings() {
      const b = await buildingService.getBuildings();
      setBuildings(b.data);
    }

    fetchBuildings();
  }, [buildingService]);

  useEffect(() => {
    async function fetchFloors() {
      if (building1Code) {
        const floors = await floorService.getBuildingFloors(building1Code);
        setBuilding1Floors(floors);
      }
    }
    fetchFloors();
  }, [building1Code, floorService]);

  return {
    requests,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
    taskTypes,
    typeInputRef,
    type,
    setType,
    building1Floors,
    setBuilding1Code,
    setBuilding2Code,
    building2Code,
    building1Code,
    buildings,
  };
};
