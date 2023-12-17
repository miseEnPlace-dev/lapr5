import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { Building } from "@/model/Building";
import { Floor } from "@/model/Floor";
import { IBuildingService } from "@/service/IService/IBuildingService";
import { IFloorService } from "@/service/IService/IFloorService";
import { IRouteService, RouteCell } from "@/service/IService/IRouteService";

const strategies = [
  {
    code: "elevators",
    name: "Less Elevators",
  },
  {
    code: "connectors",
    name: "Less Connectors",
  },
];

export const usePathsPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const routeService = useInjection<IRouteService>(TYPES.routeService);

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [building1Code, setBuilding1Code] = useState<string>("");
  const [building2Code, setBuilding2Code] = useState<string>("");

  const [building1Floors, setBuilding1Floors] = useState<Floor[]>([]);
  const [building2Floors, setBuilding2Floors] = useState<Floor[]>([]);

  const [strategy, setStrategy] = useState<string>("");

  const [floor1Code, setFloor1Code] = useState<string>("");
  const [floor2Code, setFloor2Code] = useState<string>("");

  const [mapModelOpen, setMapModelOpen] = useState<boolean>(false);
  const [activeMap, setActiveMap] = useState<{
    floorCode: string;
    map: number[][];
  }>({
    floorCode: "",
    map: [],
  });

  const [fromCoords, setFromCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [toCoords, setToCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [loading, setLoading] = useState(false);

  const [path, setPath] = useState<RouteCell[]>([]);

  async function handleFind() {
    setLoading(true);

    const p = await routeService.getRoutes({
      fromX: fromCoords.x,
      fromY: fromCoords.y,
      fromFloor: floor1Code,
      toX: toCoords.x,
      toY: toCoords.y,
      toFloor: floor2Code,
      method: strategy,
    });

    setPath(p);
  }

  useEffect(() => {
    async function fetchBuildings() {
      const b = await buildingService.getBuildings();
      setBuildings(b.data);
    }

    fetchBuildings();
  }, [buildingService]);

  useEffect(() => {
    if (path) setLoading(false);
  }, [path]);

  useEffect(() => {
    async function fetchFloors() {
      if (building1Code) {
        const floors = await floorService.getBuildingFloors(building1Code);
        setBuilding1Floors(floors);
      }
    }
    fetchFloors();
  }, [building1Code, floorService]);

  useEffect(() => {
    async function fetchFloors() {
      if (building2Code) {
        const floors = await floorService.getBuildingFloors(building2Code);
        setBuilding2Floors(floors);
      }
    }
    fetchFloors();
  }, [building2Code, floorService]);

  async function fetchFloorMap(buildingCode: string, floorCode: string) {
    const floor = await floorService.getFloor(buildingCode, floorCode);
    if (!floor.map) return;
    setActiveMap({
      floorCode,
      map: floor.map.maze.map,
    });
  }

  function handleMapShow(buildingCode: string, floorCode: string) {
    setMapModelOpen(true);
    fetchFloorMap(buildingCode, floorCode);
  }

  return {
    buildings,
    handleMapShow,
    building1Floors,
    setBuilding1Code,
    setBuilding2Code,
    building2Floors,
    building1Code,
    building2Code,
    floor1Code,
    floor2Code,
    setFloor1Code,
    setFloor2Code,
    strategies,
    strategy,
    setStrategy,
    handleFind,
    loading,
    path,
    fromCoords,
    toCoords,
    setFromCoords,
    setToCoords,
    mapModelOpen,
    setMapModelOpen,
    activeMap,
  };
};
