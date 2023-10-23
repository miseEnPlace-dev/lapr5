export interface IBuildingPersistence {
  _id: string;
  domainId: string;
  code: string;
  name?: string;
  description?: string;
  maxDimensions: {
    width: number;
    height: number;
  };
}
