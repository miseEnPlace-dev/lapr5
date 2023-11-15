import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useListBuildingsModule } from "./module";

const ListBuildings: React.FC = () => {
  const navigate = useNavigate();
  const { buildings } = useListBuildingsModule();

  return (
    <div className="mr-12 mt-8 flex flex-col gap-y-6 text-left text-lg">
      {buildings.map((building, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 * i }}
          key={building.code}
          onClick={() => navigate(`/buildings/${building.code}`)}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-6xl font-bold">{building.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-2xl font-bold">{building.name}</h3>
            <div className="text-left text-sm text-slate-600">
              {building.maxDimensions.length} x {building.maxDimensions.width}
              {building.description && (
                <span>&nbsp;&middot; {building.description}</span>
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ListBuildings;
