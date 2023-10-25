export interface IFloorPersistence {
  domainId: string;
  code: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
  buildingCode: string;
}
