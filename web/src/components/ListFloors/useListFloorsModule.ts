import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { Floor } from "@/model/Floor";
import { IFloorService } from "@/service/IService/IFloorService";

export const useListFloorsModule = (buildingCode: string) => {
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const [floors, setFloors] = useState<Floor[] | null>(null);

  useEffect(() => {
    async function fetchBuildings() {
      const b = await floorService.getBuildingFloors(buildingCode);
      setFloors(b);
    }

    fetchBuildings();
  }, [floorService, buildingCode]);

  return {
    floors,
  };
};
