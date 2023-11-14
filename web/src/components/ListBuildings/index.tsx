import { useEffect, useState } from "react";

import { Building } from "../../model/Building";
import api from "../../service/api";

const ListBuildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  async function fetchBuildings() {
    const res = await api.get("/buildings");
    setBuildings(res.data);
  }

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <table className="table-auto border-collapse border">
      <thead className="h-12 bg-secondary text-center text-lg font-bold text-black">
        <td className="w-32">Code</td>
        <td className="w-32">Name</td>
        <td className="w-24">Width</td>
        <td className="w-24">Length</td>
        <td className="w-96">Description</td>
      </thead>
      <tbody className="h-12 text-center">
        {buildings.map((building) => (
          <tr>
            <td className="h-12">{building.code}</td>
            <td className="h-12">{building.name}</td>
            <td className="h-12">{building.maxDimensions.width}</td>
            <td className="h-12">{building.maxDimensions.length}</td>
            <td className="h-12">{building.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListBuildings;
