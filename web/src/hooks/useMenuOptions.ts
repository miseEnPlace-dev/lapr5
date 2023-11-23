import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import {
  BridgeIcon,
  BuildingIcon,
  DeviceModelIcon,
  ElevatorIcon,
  HomeIcon,
  LogoutIcon,
  RobotIcon,
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
