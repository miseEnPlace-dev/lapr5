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
    <div className="mt-8 flex flex-col gap-y-6 mr-12 text-left text-lg">
      {buildings.map((building) => (
        <button
          onClick={() => navigate(`/buildings/${building.code}`)}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-6xl font-bold">{building.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-2xl text-left font-bold">{building.name}</h3>
            <div className="text-left text-sm text-slate-600">
              {building.maxDimensions.length} x {building.maxDimensions.width}
              {building.description && (
              <span>
                &nbsp;&middot; {building.description}
              </span> 
              )}
            </div>
            
          </div>
        </button>
      ))}
    </div>
  );
};

export default ListBuildings;
