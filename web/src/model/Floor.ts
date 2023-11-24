export interface Floor {
  code: string;
  buildingCode: string;
  description: string;
  dimensions: {
    width: number;
    length: number;
  };
  map?: {};
}
