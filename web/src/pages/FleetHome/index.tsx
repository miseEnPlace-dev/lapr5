import ListDeviceModels from "@/components/ListDeviceModels";
import ListDevices from "@/components/ListDevices";

interface FleetHomeProps {
  activeOption: string;
}

const FleetHome: React.FC<FleetHomeProps> = ({ activeOption }) => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {activeOption === "device-models" && <ListDeviceModels />}
      {activeOption === "devices" && <ListDevices />}
    </div>
  );
};

export default FleetHome;
