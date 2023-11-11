import { useContext } from "react";
import { redirect } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import CampusHome from "../CampusHome";
import FleetHome from "../FleetHome";

const HomePage: React.FC = () => {
  const { role } = useContext(AuthContext);
  if (!role) redirect("/login");

  return (
    <>
      {role === "campus" && <CampusHome />}
      {role === "fleet" && <FleetHome />}
    </>
  );
};

export default HomePage;
