import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";
import ListDeviceModels from "@/components/ListDeviceModels";
import ListDevices from "@/components/ListDevices";

interface FleetHomeProps {
  activeOption: string;
}

const FleetHome: React.FC<FleetHomeProps> = ({ activeOption }) => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-slate-500">
        Here you can manage all the information about all the components of the
        devices.
      </p>
      <h2 className="my-4 text-3xl font-bold text-primary">Quick Links</h2>
      <CardContainer>
        <Card
          title="RGPD"
          description="Read the RGPD of the application."
          link="/rgpd"
          action="Go to RGPD"
        />
      </CardContainer>
      {activeOption === "device-models" && <ListDeviceModels />}
      {activeOption === "devices" && <ListDevices />}
    </div>
  );
};

export default FleetHome;
