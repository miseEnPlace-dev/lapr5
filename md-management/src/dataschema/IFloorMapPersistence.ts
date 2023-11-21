export interface IFloorMapPersistence {
  domainId: string;
  maze: {
    size: {
      width: number;
      depth: number;
    };
    map: number[][];
    exits: { x: number; y: number }[];
    elevator: { x: number; y: number };
    exitLocation: { x: number; y: number };
  };
  player: {
    initialPosition: { x: number; y: number };
    initialDirection: number;
  };
}
