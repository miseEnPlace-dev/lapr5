import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Building } from "@/model/Building";
import { Connector } from "@/model/Connector";
import { Floor } from "@/model/Floor";
import { IBuildingService } from "@/service/IService/IBuildingService";
import { IConnectorService } from "@/service/IService/IConnectorService";
import { IFloorService } from "@/service/IService/IFloorService";

export const useListConnectorsModule = () => {
  const connectorSvc = useInjection<IConnectorService>(TYPES.connectorService);
  const buildingsService = useInjection<IBuildingService>(
    TYPES.buildingService
  );
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const [connectors, setConnectors] =
    useState<IPaginationDTO<Connector> | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);

  const [filters, setFilters] = useState<string[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [floors, setFloors] = useState<Floor[]>([]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const floor1InputRef = useRef<HTMLSelectElement>(null);
  const floor2InputRef = useRef<HTMLSelectElement>(null);

  const itemsPerPage = 3;

  const fetchConnectors = useCallback(async () => {
    try {
      const b = await connectorSvc.getConnectors(
        filters || undefined,
        page,
        itemsPerPage
      );

      setConnectors(b);
    } catch (e) {
      setConnectors({ data: [] });
    }
  }, [connectorSvc, filters, page]);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const fetchFloors = useCallback(async () => {
    try {
      const floors = await floorService.getAllFloors();

      setFloors(floors);
    } catch (e) {
      setFloors([]);
    }
  }, [floorService, page, itemsPerPage]);

  const fetchBuildings = useCallback(async () => {
    const buildings = await buildingsService.getBuildings();
    setBuildings(buildings.data);
  }, [buildingsService]);

  useEffect(() => {
    fetchConnectors();
    fetchBuildings();
    fetchFloors();
  }, [
    connectorSvc,
    buildingsService,
    fetchBuildings,
    fetchConnectors,
    fetchFloors,
    floorService,
  ]);

  const handleSave = async () => {
    if (
      !codeInputRef.current ||
      !floor1InputRef.current ||
      !floor2InputRef.current
    )
      throw new Error("Invalid data");

    const connector: Connector = {
      code: codeInputRef.current.value,
      floor1Code: floor1InputRef.current.value,
      floor2Code: floor2InputRef.current.value,
    };
    await connectorSvc.createConnector(connector);
    fetchConnectors();
  };

  return {
    connectors,
    codeInputRef,
    floor1InputRef,
    floor2InputRef,
    filters,
    buildings,
    setFilters,
    handleSave,
    handlePagination,
    floors,
  };
};
