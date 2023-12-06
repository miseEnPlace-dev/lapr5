import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Building } from "@/model/Building";
import { Connector } from "@/model/Connector";
import { IBuildingService } from "@/service/IService/IBuildingService";
import { IConnectorService } from "@/service/IService/IConnectorService";

export const useListConnectorsModule = () => {
  const connectorSvc = useInjection<IConnectorService>(TYPES.connectorService);
  const buildingsService = useInjection<IBuildingService>(
    TYPES.buildingService
  );
  const [connectors, setConnectors] =
    useState<IPaginationDTO<Connector> | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);

  const [filters, setFilters] = useState<string[] | null>(null);
  const [page, setPage] = useState<number>(1);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const floor1InputRef = useRef<HTMLInputElement>(null);
  const floor2InputRef = useRef<HTMLInputElement>(null);

  const itemsPerPage = 3;

  const fetchConnectors = useCallback(async () => {
    try {
      let b = await connectorSvc.getConnectors(
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

  const fetchBuildings = useCallback(async () => {
    const buildings = await buildingsService.getBuildings();
    setBuildings(buildings.data);
  }, [buildingsService]);

  useEffect(() => {
    fetchConnectors();
    fetchBuildings();
  }, [connectorSvc, buildingsService, fetchBuildings, fetchConnectors]);

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
  };
};
