export interface IFloorPersistence {
  _id: string;
  domainId: string;
  code: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
  buildingCode: string;
}
