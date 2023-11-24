import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Room } from "@/model/Room";

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
  const mapInputRef = useRef<HTMLInputElement>(null);

  const fetchFloor = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const floor = await floorService.getFloor(buildingCode, floorCode);
      setFloor(floor);
    },
    [floorService]
  );

  const fetchRooms = useCallback(
    async (_buildingCode: string, _floorCode: string) => {
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
    if (
      !floorCode ||
      !buildingCode ||
      !lengthInputRef.current ||
      !widthInputRef.current ||
      !descriptionInputRef.current
    )
      throw new Error("Invalid data");

    const floor: Floor = {
      code: floorCode,
      buildingCode: buildingCode,
      dimensions: {
        length: parseFloat(lengthInputRef.current?.value),
        width: parseFloat(widthInputRef.current?.value),
      },
      description: descriptionInputRef.current?.value,
    };

    await floorService.updateFloor(buildingCode, floor);
    fetchFloor(buildingCode, floorCode);
  }

  async function handleUploadMap() {
    if (!mapInputRef.current?.files?.[0] || !buildingCode || !floorCode) return;

    const reader = new FileReader();
    reader.readAsText(mapInputRef.current?.files?.[0] as Blob);

    const result = await new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });

    const data = await floorService.uploadFloor(
      buildingCode,
      floorCode,
      result as string
    );
  }

  return {
    floor,
    descriptionInputRef,
    lengthInputRef,
    widthInputRef,
    mapInputRef,
    handleSaveFloor,
    handleUploadMap,
  };
};
