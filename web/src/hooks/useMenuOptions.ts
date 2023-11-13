import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import {
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
        label: "Elevators",
        icon: ElevatorIcon,
        onClick: () => navigation("/elevators"),
      });
      options.push({
        label: "Rooms",
        icon: RoomIcon,
        onClick: () => navigation("/rooms"),
      });
    }

    if (role === "fleet") {
      options.push({
        label: "Device Models",
        icon: RobotIcon,
        onClick: () => navigation("/device-models"),
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
