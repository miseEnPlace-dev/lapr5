import { motion } from "framer-motion";

import { useRoomPageModule } from "@/pages/RoomPage/module";

const ListRooms: React.FC = () => {
  const { rooms, building, floor } = useRoomPageModule();

  const ANIMATION_DELAY = 0.1;

  if (!building || !floor) return null;

  return (
    <div className="flex w-full flex-col gap-8 overflow-y-scroll rounded-xl bg-slate-300 px-12 py-4">
      {rooms.map((room, i) => (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={room.name}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-3xl font-bold">{room.name}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-xl font-bold">{room.category}</h3>
            <div className="text-left text-sm text-slate-600">
              {room.dimensions.length} x {room.dimensions.width}
              {room.description && (
                <span>&nbsp;&middot; {room.description}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ListRooms;
