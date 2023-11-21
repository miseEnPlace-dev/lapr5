export interface IFloorMapDTO {
  maze: {
    size: {
      width: number;
      depth: number;
    };
    map: number[][];
    exits: number[][];
    elevator: number[];
    exitLocation: number[];
  };
  player: {
    initialPosition: number[];
    initialDirection: number;
  };
}
