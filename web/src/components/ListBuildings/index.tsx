import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Building } from "../../model/Building";
import api from "../../service/api";

const ListBuildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const navigate = useNavigate();

  async function fetchBuildings() {
    const res = await api.get("/buildings");
    setBuildings(res.data);
  }

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <div className="mt-8 flex w-11/12 flex-col gap-y-6 text-left text-lg">
      {buildings.map((building) => (
        <button
          onClick={() => navigate(`/buildings/${building.code}`)}
          className="flex w-full gap-x-8 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-center text-6xl font-bold">{building.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{building.name}</h3>
            <span className="text-left text-sm text-slate-600">
              {building.maxDimensions.width} x {building.maxDimensions.length}
            </span>
          </div>
          {building.description && (
            <div>
              <h3 className="text-left text-lg font-bold text-slate-600">
                Description
              </h3>
              <p>{building.description}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ListBuildings;
