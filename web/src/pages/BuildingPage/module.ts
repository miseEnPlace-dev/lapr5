import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";

import { Building } from "../../model/Building";
import { Elevator } from "../../model/Elevator";
import { IBuildingService } from "../../service/IService/IBuildingService";
import { IElevatorService } from "../../service/IService/IElevatorService";

export const useBuildingPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const elevatorService = useInjection<IElevatorService>(TYPES.elevatorService);

  const { buildingCode } = useParams();

  const [building, setBuilding] = useState<Building>();
  const [elevator, setElevator] = useState<Elevator | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode) return;

      const b = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(b);

      const e = await elevatorService.getBuildingElevator(buildingCode);
      setElevator(e);
    }

    fetchData();
  }, [buildingCode, buildingService, elevatorService]);

  return {
    building,
    elevator,
  };
};
