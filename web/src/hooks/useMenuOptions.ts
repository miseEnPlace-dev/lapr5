import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import {
  BridgeIcon,
  BuildingIcon,
  ElevatorIcon,
  HomeIcon,
  LogoutIcon,
  RobotIcon,
  RoomIcon,
} from "../styles/Icons";

export const useMenuOptions = () => {
  const { role, logout } = useContext(AuthContext);
  const navigation = useNavigate();
  const [activeOption, setActiveOption] = useState("Home");

  const menuOptions = useMemo(() => {
    const options = [
      {
        label: "Home",
        icon: HomeIcon,
        onClick: () => setActiveOption("home"),
      },
    ];

    if (role === "campus") {
      options.push({
        label: "Buildings",
        icon: BuildingIcon,
        onClick: () => setActiveOption("buildings"),
      });
      options.push({
        label: "Elevators",
        icon: ElevatorIcon,
        onClick: () => setActiveOption("elevators"),
      });
      options.push({
        label: "Rooms",
        icon: RoomIcon,
        onClick: () => setActiveOption("rooms"),
      });
      options.push({
        label: "Connectors",
        icon: BridgeIcon,
        onClick: () => setActiveOption("connectors"),
      });
    }

    if (role === "fleet") {
      options.push({
        label: "Device Models",
        icon: RobotIcon,
        onClick: () => setActiveOption("device-models"),
      });
      options.push({
        label: "Devices",
        icon: RobotIcon,
        onClick: () => setActiveOption("devices"),
      });
    }

    options.push({
      label: "Logout",
      icon: LogoutIcon,
      onClick: () => {
        logout();
        navigation("/login");
        setActiveOption("home");
      },
    });

    return options;
  }, [navigation, role, logout]);

  return { menuOptions, activeOption };
};
