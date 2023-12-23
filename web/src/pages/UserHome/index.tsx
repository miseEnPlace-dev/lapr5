import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";

const UserHome: React.FC = () => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-slate-500">
        Here you can manage your task requests and much more.
      </p>
      <h2 className="my-4 text-3xl font-bold text-primary">Quick Links</h2>
      <CardContainer>
        <Card
          title="Tasks"
          description="Request and manage tasks to be done by one of our robots."
          link="/tasks"
          action="Go to Task Requests"
        />
      </CardContainer>
    </div>
  );
};

export default UserHome;
