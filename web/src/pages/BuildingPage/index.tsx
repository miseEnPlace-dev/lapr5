import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import { Building } from "../../model/Building";
import api from "../../service/api";

const BuildingPage: React.FC = () => {
  const { buildingCode } = useParams();

  const [building, setBuilding] = useState<Building>();

  useEffect(() => {
    async function fetchBuilding() {
      const res = await api.get(`/buildings/${buildingCode}`);

      if (res.data) setBuilding(res.data);
    }

    fetchBuilding();
  }, [buildingCode]);

  return (
    <div className="mx-auto w-11/12">
      <div className="my-8 h-full w-full rounded-xl bg-slate-200 py-4">
        <h1 className="text-center text-4xl font-bold">
          {building?.code}. {building?.name}
        </h1>
      </div>

      <div className="my-8 flex h-full w-full gap-x-8">
        <div className="h-full w-3/4 rounded-xl bg-slate-200 px-4 py-4">
          Sítio para editar edifício
          <input
            className="w-full rounded-lg bg-slate-300 px-4 py-2 placeholder:text-slate-600"
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="flex h-full w-1/4 flex-col gap-y-2 rounded-xl bg-slate-200 px-4 py-8">
          <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
          <Button className="w-full" type="submit">
            Add Elevator
          </Button>
          <Button className="w-full" type="submit">
            Add Floor
          </Button>
          <Button className="w-full" type="destroy">
            Delete Building
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildingPage;
