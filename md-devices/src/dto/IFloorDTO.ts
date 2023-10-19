export interface IFloorDTO {
  code: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
}
