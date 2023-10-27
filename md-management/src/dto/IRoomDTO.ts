export interface IRoomDTO {
  name: string;
  description?: string;
  floorCode: string;
  dimensions: {
    width: number;
    height: number;
  };
  category: string;
}
