export interface IRoomDTO {
  name: string;
  description?: string;
  floorCode: string;
  buildingCode?: string;
  dimensions: {
    width: number;
    length: number;
  };
  category: string;
}
