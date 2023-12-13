import { useContext } from "react";
import { redirect } from "react-router-dom";

import SideBar from "../../components/SideBar";
import AuthContext from "../../context/AuthContext";
import { useMenuOptions } from "../../hooks/useMenuOptions";
import AdminHome from "../AdminHome ";
import CampusHome from "../CampusHome";
import FleetHome from "../FleetHome";
import UserHome from "../UserHome";

const HomePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const { role } = useContext(AuthContext);
  if (!role) redirect("/login");

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      {role === "campus" && <CampusHome />}
      {role === "fleet" && <FleetHome />}
      {role === "admin" && <AdminHome />}
      {role === "user" && <UserHome />}
    </div>
  );
};

export default HomePage;
