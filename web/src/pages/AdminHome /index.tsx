import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";

const AdminHome: React.FC = () => {
  return (
    <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-slate-500">
        Here you can manage all the information about all the users of your
        system.
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
          title="Users"
          description="Manage all the users and their roles in the system."
          link="/users"
          action="Go to Users"
        />
        <Card
          title="Requests"
          description="Manage all the sign up requests from users."
          link="/requests"
          action="Go to Requests"
        />
        <Card
          title="Paths"
          description="Generate optimal routes between floors in your campus."
          link="/paths"
          action="Go to Path Finder"
        />
        <Card
          title="Privacy Policy"
          description="Read the application's privacy policy."
          link="/privacy-policy"
          action="Read the Privacy Policy"
        />
      </CardContainer>
    </main>
  );
};

export default AdminHome;
