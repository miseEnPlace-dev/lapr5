import { useCallback, useEffect, useRef, useState } from "react";
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
  const [floor, setFloor] = useState<Floor | null>(null);
  const [floors, setFloors] = useState<Floor[] | null>(null);
  const [filters, setFilters] = useState<SelectorItem[]>(
    availableFilters.map((f) => ({ name: f, selected: false }))
  );

  const floorCodeInputRef = useRef<HTMLInputElement>(null);
  const floorDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const floorLengthInputRef = useRef<HTMLInputElement>(null);
  const floorWidthInputRef = useRef<HTMLInputElement>(null);
  const floorMapInputRef = useRef<HTMLInputElement>(null);

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


  const fetchFloor = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const floor = await floorService.getFloor(buildingCode, floorCode);
      setFloor(floor);
    },
    [floorService]
  );

  async function handleCreate() {
    if (!buildingCode) throw new Error("No building code provided");

    if (!floorCodeInputRef.current?.value) throw new Error("No floor code provided");
    if (!floorLengthInputRef.current?.value) throw new Error("No floor length provided");
    if (!floorWidthInputRef.current?.value) throw new Error("No floor width provided");

    const f: Floor = {
      code: floorCodeInputRef.current?.value as string,
      buildingCode: buildingCode,
      description: floorDescriptionInputRef.current?.value as string,
      dimensions: {
        length: Number(floorLengthInputRef.current?.value),
        width: Number(floorWidthInputRef.current?.value),
      },
    };

    await floorService.createFloor(buildingCode, f);
    if (!floors) return setFloors([f]);
    setFloors([...floors, f]);
  }

  async function handleSave() {
    if (!floor) return await handleCreate();

    if (buildingCode) fetchFloor(buildingCode, floor.code);
  }


  return {
    building,
    floor,
    floors,
    filters,
    setFilters,
    handleSave,
    floorCodeInputRef,
    floorDescriptionInputRef,
    floorLengthInputRef,
    floorWidthInputRef,
    floorMapInputRef,
  };
};
