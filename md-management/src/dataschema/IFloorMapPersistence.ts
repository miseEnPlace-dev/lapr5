export interface IFloorMapPersistence {
  domainId: string;
  size: {
    width: number;
    depth: number;
  };
  map: number[][];
  exits: number[][];
  elevators: number[][];
  exitLocation: number[];
}
