import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import {
  BridgeIcon,
  BuildingIcon,
  DeviceModelIcon,
  HomeIcon,
  LogoutIcon,
  MapIcon,
  RequestsIcon,
  RobotIcon,
  TaskRequestsIcon,
  TasksIcon,
  UsersIcon,
} from "../styles/Icons";

export const useMenuOptions = () => {
  const { role, logout } = useContext(AuthContext);
  const navigation = useNavigate();

  const menuOptions = useMemo(() => {
    const options = [
      {
        label: "Home",
        icon: HomeIcon,
        onClick: () => navigation("/"),
      },
    ];

    if (role === "campus") {
      options.push({
        label: "Buildings",
        icon: BuildingIcon,
        onClick: () => navigation("/buildings"),
      });
      options.push({
        label: "Connectors",
        icon: BridgeIcon,
        onClick: () => navigation("/connectors"),
      });
      options.push({
        label: "Paths",
        icon: MapIcon,
        onClick: () => navigation("/paths"),
      });
    }

    if (role === "admin") {
      options.push({
        label: "Users",
        icon: UsersIcon,
        onClick: () => navigation("/users"),
      });
      options.push({
        label: "Requests",
        icon: RequestsIcon,
        onClick: () => navigation("/requests"),
      });
    }

    if (role === "fleet") {
      options.push({
        label: "Device Models",
        icon: DeviceModelIcon,
        onClick: () => navigation("/device-models"),
      });
      options.push({
        label: "Devices",
        icon: RobotIcon,
        onClick: () => navigation("/devices"),
      });
    }

    if (role === "user") {
      options.push({
        label: "Tasks",
        icon: TasksIcon,
        onClick: () => navigation("/tasks"),
      });
    }

    if (role === "task") {
      options.push({
        label: "Task Requests",
        icon: TaskRequestsIcon,
        onClick: () => navigation("/task-requests"),
      });
      options.push({
        label: "Task Sequence",
        icon: MapIcon,
        onClick: () => navigation("/task-sequence"),
      });
    }

    options.push({
      label: "Logout",
      icon: LogoutIcon,
      onClick: () => {
        logout();
        navigation("/login");
      },
    });

    return options;
  }, [navigation, role, logout]);

  return { menuOptions };
};
