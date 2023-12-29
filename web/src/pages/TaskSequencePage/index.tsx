import { useMenuOptions } from "@/hooks/useMenuOptions";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

const TaskSequencePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const { requests } = useModule();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Sequence</h1>
        <p className="text-slate-500">
          Check the task sequence for all the approved task requests.
        </p>
        <section>
          {requests.map((request) => (
            <article key={request.id}>
              <h2 className="text-2xl font-bold">{request.userId}</h2>
              <h2 className="text-2xl font-bold">{request.type}</h2>
              <p className="text-slate-500">{request.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TaskSequencePage;
