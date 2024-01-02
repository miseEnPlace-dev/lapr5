import { useContext, useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import swal from "sweetalert";

import { TYPES } from "@/inversify/types";
import SequenceContext from "@/context/SequenceContext";
import { Device } from "@/model/Device";
import { Task } from "@/model/Task";
import { IDeviceService } from "@/service/IService/IDeviceService";
import { ITaskService } from "@/service/IService/ITaskService";

import { AxiosError } from "axios";

export const useModule = () => {
  const tasksService = useInjection<ITaskService>(TYPES.taskService);
  const devicesService = useInjection<IDeviceService>(TYPES.deviceService);

  const [tasks, setTasks] = useState<Task[]>([]);
  const { sequence, setSequence, selectedDevice, setSelectedDevice } =
    useContext(SequenceContext);

  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

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
    try {
      const s = await tasksService.getSequence(selectedDevice);
      setLoading(false);
      setSequence(s);
    } catch (err) {
      if (err instanceof AxiosError) {
        swal({
          title: "An error occurred",
          text: err.response?.data?.message || err.message,
          icon: "error",
        });
      } else {
        swal({
          title: "An error occurred",
          text: "More details in the console.",
          icon: "error",
        });
        console.log(err);
      }
    }
  };

  const executeAll = async () => {
    for (const task of sequence!.tasks) await executeTask(task.id);
  };

  const executeTask = async (id: string) => {
    await tasksService.finishTask(id);
    setExecuting(id);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
        setSequence((sequence) =>
          sequence
            ? {
                ...sequence,
                tasks: sequence.tasks.filter((task) => task.id !== id),
              }
            : undefined
        );
        resolve();
      }, 2500);
    });
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
    const fetchDevices = async () => {
      const data = (
        await devicesService.getDevicesRobots(undefined, undefined, 0, 20)
      ).data;
      setDevices(data);
    };

    fetchDevices();
  }, [devicesService]);

  useEffect(() => {
    if (!selectedDevice) return;
    const fetchTasks = async () => {
      const data = await tasksService.getDeviceTasks(selectedDevice);
      setTasks(data);
    };
    fetchTasks();
  }, [selectedDevice, tasksService]);

  return {
    tasks,
    sanitizeTaskType,
    sanitizeDate,
    generateSequence,
    sequence,
    loading,
    executeTask,
    executing,
    executeAll,
    devices,
    setSelectedDevice,
    selectedDevice,
  };
};
