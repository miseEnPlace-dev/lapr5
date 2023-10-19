export interface IBuildingDTO {
  code: string;
  name?: string;
  description?: string;
  maxDimensions: {
    width: number;
    height: number;
  };
}
