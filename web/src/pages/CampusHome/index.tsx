import ListConnectors from "@/components/ListConnectors";

import ListBuildings from "../../components/ListBuildings";

interface CampusHomeProps {
  activeOption: string;
}

const CampusHome: React.FC<CampusHomeProps> = ({ activeOption }) => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {activeOption === "buildings" && <ListBuildings />}
      {activeOption === "connectors" && <ListConnectors />}
      {activeOption === "rooms" && <ListConnectors />}
    </div>
  );
};

export default CampusHome;
