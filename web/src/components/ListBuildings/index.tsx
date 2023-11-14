import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useListBuildingsModule } from "./useListBuildingsModule";

const ListBuildings: React.FC = () => {
  const navigate = useNavigate();
  const { buildings } = useListBuildingsModule();

  return (
    <div className="mt-8 flex w-11/12 flex-col gap-y-6 text-left text-lg">
      {buildings.map((building, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 * i }}
          key={building.code}
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
            <>
              <div>
                <h3 className="text-left text-lg font-bold text-slate-600">
                  Description
                </h3>
                <p>{building.description}</p>
              </div>
            </>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ListBuildings;
