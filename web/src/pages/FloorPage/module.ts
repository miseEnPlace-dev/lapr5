import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Room } from "@/model/Room";

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

  const { buildingCode, floorCode } = useParams();

  const [floor, setFloor] = useState<Floor>();
  const [rooms, setRooms] = useState<Room[]>();

  const lengthInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchFloor = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const floor = await floorService.getFloor(buildingCode, floorCode);
      setFloor(floor);
    },
    [floorService]
  );

  const fetchRooms = useCallback(
    async (buildingCode: string, floorCode: string) => {
      // const rooms = await getRooms
      setRooms([]);
    },
    [floorService]
  );

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode || !floorCode) return;

      fetchFloor(buildingCode, floorCode);
      fetchRooms(buildingCode, floorCode);
    }

    fetchData();
  }, [
    buildingCode,
    buildingService,
    elevatorService,
    floorService,
    fetchFloor,
    fetchRooms,
  ]);

  async function handleSaveFloor() {
    // TODO
  }

  return {
    floor,
    descriptionInputRef,
    lengthInputRef,
    widthInputRef,
    handleSaveFloor,
  };
};
