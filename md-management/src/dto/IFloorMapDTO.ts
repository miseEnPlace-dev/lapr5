export interface IFloorMapDTO {
  size: {
    width: number;
    depth: number;
  };
  map: number[][];
  exits: {
    x: number;
    y: number;
  }[];
  elevators: {
    x: number;
    y: number;
  }[];
  exitLocation: {
    x: number;
    y: number;
  };
}
