export interface IFloorPersistence {
  _id: string;
  code: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
}
