export interface IBuildingDTO {
  code: string;
  name?: string;
  description?: string;
  elevatorFloors?: string[];
  maxDimensions: {
    width: number;
    length: number;
  };
}
