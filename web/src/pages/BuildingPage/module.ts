import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useBuildingPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);

  const { buildingCode } = useParams();
  const [building, setBuilding] = useState<Building>();

  useEffect(() => {
    async function fetchBuilding() {
      if (!buildingCode) return;

      const building = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(building);
    }

    fetchBuilding();
  }, [buildingCode, buildingService]);

  return {
    building,
  };
};
