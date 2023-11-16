import { useNavigate } from "react-router-dom";

import ListFloors from "@/components/ListFloors";
import Selector from "@/components/Selector";

import Button from "../../components/Button";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useBuildingFloorsPageModule } from "./module";

const BuildingFloorsPage: React.FC = () => {
  const { building, floors, filters, setFilters } =
    useBuildingFloorsPageModule();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-screen min-h-screen w-11/12 flex-col gap-y-8 py-8">
      <button
        className="flex items-center gap-x-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="absolute left-4 top-4 h-8 w-8 text-slate-500" />
      </button>
      <div className="w-full rounded-xl bg-slate-200 py-4">
        <h1 className="text-center text-4xl font-bold">
          Edifício no. {building?.code} - {building?.name}
        </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <main className="flex h-full w-3/4 flex-col gap-y-6 rounded-xl bg-slate-200 p-8">
          <ListFloors floors={floors} />
        </main>

        <div className="flex h-full w-1/4 flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button className="w-full" type="default">
              Add Floor
            </Button>
            <h2 className="my-4 text-center text-3xl font-bold">Filters</h2>
            <Selector
              items={filters}
              setItems={setFilters}
              additionalText="With "
              activeClassName="bg-primary text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingFloorsPage;
