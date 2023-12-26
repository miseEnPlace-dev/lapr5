import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Connector } from "@/model/Connector";
import { Floor } from "@/model/Floor";
import { IConnectorService } from "@/service/IService/IConnectorService";
import { IFloorService } from "@/service/IService/IFloorService";

export const useConnectorPageModule = () => {
  const connectorSvc = useInjection<IConnectorService>(TYPES.connectorService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const { code } = useParams();

  const [connector, setConnector] = useState<Connector>();
  const [floors, setFloors] = useState<Floor[]>([]);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const floor1InputRef = useRef<HTMLSelectElement>(null);
  const floor2InputRef = useRef<HTMLSelectElement>(null);

  const fetchConnector = useCallback(
    async (code: string) => {
      const connector = await connectorSvc.getConnectorWithCode(code);
      setConnector(connector);
    },
    [connectorSvc]
  );

  const fetchFloors = useCallback(async () => {
    try {
      const floors = await floorService.getAllFloors();

      setFloors(floors);
    } catch (e) {
      setFloors([]);
    }
  }, [floorService]);

  useEffect(() => {
    async function fetchData() {
      if (!code) return;
      fetchConnector(code);
    }

    fetchData();
    fetchFloors();
  }, [code, fetchConnector, connectorSvc, fetchFloors, floorService]);

  async function handleCreate() {
    if (
      !code ||
      !codeInputRef.current ||
      !floor1InputRef.current ||
      !floor2InputRef.current
    )
      throw new Error("Invalid data");

    const c: Connector = {
      code: codeInputRef.current.value,
      floor1Code: floor1InputRef.current?.value,
      floor2Code: floor2InputRef.current?.value,
    };

    await connectorSvc.createConnector(c);
  }

  async function handleUpdate() {
    if (!code || !floor1InputRef.current || !floor2InputRef.current)
      throw new Error("Invalid data");

    const c: Connector = {
      code,
      floor1Code: floor1InputRef.current?.value,
      floor2Code: floor2InputRef.current?.value,
    };

    await connectorSvc.updateConnector(c);
  }

  return {
    connector,
    handleCreate,
    handleUpdate,
    floor1InputRef,
    floor2InputRef,
    floors,
  };
};
