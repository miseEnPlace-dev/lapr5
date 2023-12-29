import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";

const TaskHome: React.FC = () => {
  return (
    <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-slate-500">
        Here you can manage all the information about all the components of the
        task requests.
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
          title="Task Requests"
          description="Manage all the task requests of the system."
          link="/task-requests"
          action="Go to Task Requests"
        />
        <Card
          title="Task Sequence"
          description="Check the task sequence for all the approved task requests."
          link="/task-sequence"
          action="Go to Task Sequence"
        />
        <Card
          title="RGPD"
          description="Read the RGPD of the application."
          link="/rgpd"
          action="Go to RGPD"
        />
      </CardContainer>
    </div>
  );
};

export default TaskHome;
