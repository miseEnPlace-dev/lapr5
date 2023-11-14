import Button from "../../components/Button";
import { useBuildingPageModule } from "./module";

const BuildingPage: React.FC = () => {
  const { building } = useBuildingPageModule();

  return (
    <div className="mx-auto flex h-screen min-h-screen w-11/12 flex-col gap-y-8 py-8">
      <div className="w-full rounded-xl bg-slate-200 py-4">
        <h1 className="text-center text-4xl font-bold">
          Edifício no. {building?.code} - {building?.name}
        </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <main className="h-full w-3/4 rounded-xl bg-slate-200 p-8">
          <input
            className="w-full rounded-lg bg-slate-300 px-4 py-2 placeholder:text-slate-600"
            placeholder="Email"
            type="email"
          />
        </main>

        <div className="flex h-full w-1/4 flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button className="w-full" type="default">
              Add Elevator
            </Button>
            <Button className="w-full" type="default">
              Add Floor
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button className="w-full self-end" type="confirm">
              Save
            </Button>
            <Button className="w-full self-end" disabled type="destroy">
              Delete Building
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
