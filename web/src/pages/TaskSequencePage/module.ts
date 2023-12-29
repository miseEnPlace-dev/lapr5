import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { Request } from "@/model/Request";
import { IRequestService } from "@/service/IService/IRequestService";

export const useModule = () => {
  const requestService = useInjection<IRequestService>(TYPES.requestService);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await requestService.getAcceptedRequests();
      setRequests(data);
    };
    fetchRequests();
  }, [requestService]);

  return {
    requests,
  };
};
