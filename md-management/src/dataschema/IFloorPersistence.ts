export interface IFloorPersistence {
  _id: string;
  code: string;
  buildingCode: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
}
