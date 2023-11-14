import ListBuildings from "../../components/ListBuildings";

interface CampusHomeProps {
  activeOption: string;
}

const CampusHome: React.FC<CampusHomeProps> = ({ activeOption }) => {
  return (
    <div className="ml-8 mt-4 flex flex-col gap-y-4">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {activeOption === "buildings" && <ListBuildings />}
    </div>
  );
};

export default CampusHome;
