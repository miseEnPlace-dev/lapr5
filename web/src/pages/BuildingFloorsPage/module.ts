import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Floor } from "@/model/Floor";
import { IFloorService } from "@/service/IService/IFloorService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

interface SelectorItem {
  name: string;
  selected: boolean;
}

export const useBuildingFloorsPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const { buildingCode } = useParams();

  const availableFilters = ["connectors", "elevator"];

  const [building, setBuilding] = useState<Building>();
  const [floors, setFloors] = useState<Floor[] | null>(null);
  const [filters, setFilters] = useState<SelectorItem[]>(
    availableFilters.map((f) => ({ name: f, selected: false }))
  );

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode) return;

      const b = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(b);

      const floors = await floorService.getBuildingFloors(
        buildingCode,
        filters.filter((f) => f.selected).map((f) => f.name)
      );
      setFloors(floors);
    }

    fetchData();
  }, [buildingCode, buildingService, floorService, filters]);

  return {
    building,
    floors,
    filters,
    setFilters,
  };
};
