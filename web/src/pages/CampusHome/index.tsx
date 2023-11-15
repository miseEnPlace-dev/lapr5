import ListBuildings from "../../components/ListBuildings";

interface CampusHomeProps {
  activeOption: string;
}

const CampusHome: React.FC<CampusHomeProps> = ({ activeOption }) => {
  return (
    <div className="pl-12 mt-12 flex h-full w-full flex-col gap-y-4">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {activeOption === "buildings" && <ListBuildings />}
    </div>
  );
};

export default CampusHome;
