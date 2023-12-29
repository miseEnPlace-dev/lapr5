import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { Request } from "@/model/Request";
import { Sequence } from "@/model/Sequence";
import { IRequestService } from "@/service/IService/IRequestService";

export const useModule = () => {
  const requestService = useInjection<IRequestService>(TYPES.requestService);
  const [requests, setRequests] = useState<Request[]>([]);
  const [sequence, setSequence] = useState<Sequence>();
  const [loading, setLoading] = useState(false);

  const sanitizeTaskType = (taskType: string) => {
    switch (taskType) {
      case "pick_delivery":
        return "Pick & Delivery";
      case "surveillance":
        return "Vigilância";
      default:
        return "Tarefa";
    }
  };

  const generateSequence = async () => {
    setLoading(true);
    const s = await requestService.getSequence();
    setLoading(false);
    setSequence(s);
  };

  const sanitizeDate = (date: string) => {
    const dateArray = date.split(" ");
    const datePart = dateArray[0].split("/");
    const timePart = dateArray[1].split(":");

    const ampm = timePart[2].slice(2);
    const hour = parseInt(timePart[0]) + (ampm === "PM" ? 12 : 0);
    const minute = parseInt(timePart[1]);
    const seconds = parseInt(timePart[2].slice(0, 2));

    const day = parseInt(datePart[1]);
    const month = parseInt(datePart[0]);
    const year = parseInt(datePart[2]);

    const newDate = new Date(year, month - 1, day, hour, minute, seconds);
    const now = new Date();

    const diff = Math.abs(newDate.getTime() - now.getTime());

    if (diff >= 60 * 60 * 24 * 1000) {
      const days = Math.floor(diff / (60 * 60 * 24 * 1000));
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    if (diff >= 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    if (diff >= 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    const s = Math.floor(diff / 1000);
    return `${s} second${s > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await requestService.getAcceptedRequests();
      setRequests(data);
    };
    fetchRequests();
  }, [requestService]);

  return {
    requests,
    sanitizeTaskType,
    sanitizeDate,
    generateSequence,
    sequence,
    loading,
  };
};