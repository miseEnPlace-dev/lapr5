import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useRoomPageModule } from "@/pages/RoomPage/module";

const ListRooms: React.FC = () => {
  const { rooms, building, floor } = useRoomPageModule();
  const navigate = useNavigate();

  const ANIMATION_DELAY = 0.1;

  if (!building || !floor) return null;

  return (
    <div className="flex gap-8 rounded-xl bg-slate-300 px-12 py-4">
      {rooms.map((room, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={room.name}
          onClick={() =>
            navigate(`/building/${building.code}/floors/${floor.code}/rooms`)
          }
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

export default ListRooms;
