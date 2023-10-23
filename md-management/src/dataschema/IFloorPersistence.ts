export interface IFloorPersistence {
  _id: string;
  domainId: string;
  code: string;
  buildingCode: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
}
