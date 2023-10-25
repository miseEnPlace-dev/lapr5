export interface IFloorMapDTO {
  size: {
    width: number;
    depth: number;
  };
  map: number[][];
  exits: number[][];
  elevators: number[][];
  exitLocation: number[];
}
