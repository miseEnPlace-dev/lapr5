import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";

import { Building } from "../../model/Building";
import { Elevator } from "../../model/Elevator";
import { Floor } from "../../model/Floor";
import { IBuildingService } from "../../service/IService/IBuildingService";
import { IElevatorService } from "../../service/IService/IElevatorService";
import { IFloorService } from "../../service/IService/IFloorService";

export const useBuildingPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const elevatorService = useInjection<IElevatorService>(TYPES.elevatorService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const { buildingCode } = useParams();

  const [building, setBuilding] = useState<Building>();
  const [elevator, setElevator] = useState<Elevator | null>(null);
  const [floors, setFloors] = useState<Floor[]>();

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode) return;

      const building = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(building);

      const elevator = await elevatorService.getBuildingElevator(buildingCode);
      setElevator(elevator);

      const floors = await floorService.getBuildingFloors(buildingCode);
      setFloors(floors);
    }

    fetchData();
  }, [buildingCode, buildingService, elevatorService, floorService]);

  return {
    building,
    elevator,
    floors,
  };
};
