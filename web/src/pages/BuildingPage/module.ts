import { useCallback, useEffect, useRef, useState } from "react";
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

  const codeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const serialNumberInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const [selectedFloors, setSelectedFloors] = useState<
    { name: string; selected: boolean }[]
  >([]);

  const fetchBuilding = useCallback(
    async (buildingCode: string) => {
      const building = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(building);
    },
    [buildingService]
  );

  const fetchElevator = useCallback(
    async (buildingCode: string) => {
      const elevator = await elevatorService.getBuildingElevator(buildingCode);
      setElevator(elevator);
    },
    [elevatorService]
  );

  const fetchFloors = useCallback(
    async (buildingCode: string) => {
      const floors = await floorService.getBuildingFloors(buildingCode);
      setFloors(floors);
    },
    [floorService]
  );

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode) return;

      fetchBuilding(buildingCode);
      fetchElevator(buildingCode);
      fetchFloors(buildingCode);
    }

    fetchData();
  }, [
    buildingCode,
    buildingService,
    elevatorService,
    floorService,
    fetchBuilding,
    fetchElevator,
    fetchFloors,
  ]);

  useEffect(() => {
    setSelectedFloors(
      floors?.map((floor) => ({
        name: floor.code,
        selected: elevator?.floorCodes.includes(floor.code) || false,
      })) || []
    );
  }, [elevator?.floorCodes, floors]);

  async function handleCreate() {
    if (!buildingCode || !codeInputRef.current) throw new Error("Invalid data");

    const e: Elevator = {
      code: codeInputRef.current.value,
      model: modelInputRef.current?.value,
      brand: brandInputRef.current?.value,
      serialNumber: serialNumberInputRef.current?.value,
      description: descriptionInputRef.current?.value,
      floorCodes: selectedFloors
        .filter((floor) => floor.selected)
        .map((floor) => floor.name),
    };

    await elevatorService.createElevator(buildingCode, e);
  }

  async function handleUpdate() {
    if (!buildingCode || !elevator) throw new Error("Invalid data");

    const e: Partial<Elevator> = {
      model:
        modelInputRef.current?.value === ""
          ? undefined
          : modelInputRef.current?.value,
      brand:
        brandInputRef.current?.value === ""
          ? undefined
          : brandInputRef.current?.value,
      serialNumber:
        serialNumberInputRef.current?.value === ""
          ? undefined
          : serialNumberInputRef.current?.value,
      description:
        descriptionInputRef.current?.value === ""
          ? undefined
          : descriptionInputRef.current?.value,
      floorCodes: selectedFloors
        .filter((floor) => floor.selected)
        .map((floor) => floor.name),
    };

    await elevatorService.updateElevator(buildingCode, e);
  }

  async function handleSave() {
    if (!elevator) return await handleCreate();
    await handleUpdate();

    if (buildingCode) fetchElevator(buildingCode);
  }

  return {
    building,
    elevator,
    selectedFloors,
    setSelectedFloors,
    handleSave,
    codeInputRef,
    modelInputRef,
    brandInputRef,
    serialNumberInputRef,
    descriptionInputRef,
  };
};
