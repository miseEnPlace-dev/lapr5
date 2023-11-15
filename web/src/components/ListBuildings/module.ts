import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useListBuildingsModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    async function fetchBuildings() {
      const b = await buildingService.getBuildings();
      setBuildings(b);
    }

    fetchBuildings();
  }, [buildingService]);

  return {
    buildings,
  };
};
