import { Floor } from "@/model/Floor";

import Alert from "../Alert";

interface ListFloorsProps {
  floors: Floor[] | null;
}

const ListFloors: React.FC<ListFloorsProps> = ({ floors }) => {
  if (!floors)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (!floors.length)
    return (
      <Alert type="warning" message="This building does not have any floor." />
    );

  return floors.map((f) => (
    <div className="flex flex-row gap-8 rounded-xl bg-slate-300 px-12 py-4">
      <div>
        <h2 className="text-center text-6xl font-bold">{f.code}</h2>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{f.description}</h3>
        <p>
          {f.dimensions.width} x {f.dimensions.length}
        </p>
      </div>
    </div>
  ));
};

export default ListFloors;
