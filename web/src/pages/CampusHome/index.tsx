import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";
import ListConnectors from "@/components/ListConnectors";

import ListBuildings from "../../components/ListBuildings";

interface CampusHomeProps {
  activeOption: string;
}

const CampusHome: React.FC<CampusHomeProps> = ({ activeOption }) => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-slate-500">
        Here you can manage all the information about all the components of the
        campus.
      </p>
      <h2 className="my-4 text-3xl font-bold text-primary">Quick Links</h2>
      <CardContainer>
        <Card
          title="Floor Editor"
          description="Explore the campus in a 3D environment to have a better understanding
        about the campus."
          link="/floor-editor"
          action="Go to Floor Editor"
        />
        <Card
          title="Buildings"
          description="Manage all the buildings of the campus."
          link="/buildings"
          action="Go to Buildings"
        />
        <Card
          title="RGPD"
          description="Read the RGPD of the application."
          link="/rgpd"
          action="Go to RGPD"
        />
      </CardContainer>

      {activeOption === "buildings" && <ListBuildings />}
      {activeOption === "connectors" && <ListConnectors />}
    </div>
  );
};

export default CampusHome;
