import { useContext } from "react";
import { redirect } from "react-router-dom";

import SideBar from "../../components/SideBar";
import AuthContext from "../../context/AuthContext";
import { useMenuOptions } from "../../hooks/useMenuOptions";
import CampusHome from "../CampusHome";
import FleetHome from "../FleetHome";

const HomePage: React.FC = () => {
  const { menuOptions, activeOption } = useMenuOptions();
  const { role } = useContext(AuthContext);
  if (!role) redirect("/login");

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} activeOption={activeOption} />
      {role === "campus" && <CampusHome activeOption={activeOption} />}
      {role === "fleet" && <FleetHome />}
    </div>
  );
};

export default HomePage;
