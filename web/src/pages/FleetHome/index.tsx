import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";

const FleetHome: React.FC = () => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-slate-500">
        Here you can manage all the information about all the components of the
        devices.
      </p>
      <h2 className="my-4 text-3xl font-bold text-primary">Quick Links</h2>
      <CardContainer>
        <Card
          title="Campus Explorer"
          description="Explore the campus in a 3D environment to have a better understanding
        about the campus."
          link="/floor-editor"
          action="Go to Campus Explorer"
        />
        <Card
          title="Devices"
          description="Manage all the devices of the fleet."
          link="/devices"
          action="Go to Devices"
        />
        <Card
          title="Privacy Policy"
          description="Read the Privacy Policy of the application."
          link="/privacy-policy"
          action="Go to Privacy Policy"
        />
      </CardContainer>
    </div>
  );
};

export default FleetHome;
