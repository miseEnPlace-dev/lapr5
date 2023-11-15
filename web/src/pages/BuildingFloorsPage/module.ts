import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Floor } from "@/model/Floor";
import { IFloorService } from "@/service/IService/IFloorService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useBuildingFloorsPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const { buildingCode } = useParams();

  const [building, setBuilding] = useState<Building>();
  const [floors, setFloors] = useState<Floor[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode) return;

      const b = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(b);

      const floors = await floorService.getBuildingFloors(buildingCode);
      setFloors(floors);
    }

    fetchData();
  }, [buildingCode, buildingService, floorService]);

  return {
    building,
    floors,
  };
};
