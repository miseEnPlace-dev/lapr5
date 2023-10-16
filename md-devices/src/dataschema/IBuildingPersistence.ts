export interface IBuildingPersistence {
  _id: string;
  code: string;
  name?: string;
  description?: string;
  maxDimensions: {
    width: number;
    height: number;
  };
}
