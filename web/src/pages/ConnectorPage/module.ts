import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Connector } from "@/model/Connector";
import { IConnectorService } from "@/service/IService/IConnectorService";

export const useConnectorPageModule = () => {
  const connectorSvc = useInjection<IConnectorService>(TYPES.connectorService);

  const { code } = useParams();

  const [connector, setConnector] = useState<Connector>();

  const codeInputRef = useRef<HTMLInputElement>(null);
  const floor1InputRef = useRef<HTMLInputElement>(null);
  const floor2InputRef = useRef<HTMLInputElement>(null);

  const fetchConnector = useCallback(
    async (code: string) => {
      const connector = await connectorSvc.getConnectorWithCode(code);
      setConnector(connector);
    },
    [connectorSvc]
  );

  useEffect(() => {
    async function fetchData() {
      if (!code) return;
      fetchConnector(code);
    }

    fetchData();
  }, [code, fetchConnector, connectorSvc]);

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
  };
};
