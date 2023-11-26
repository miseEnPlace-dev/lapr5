export interface GetRouteProps {
  fromX: number;
  fromY: number;
  fromFloor: string;
  toX: number;
  toY: number;
  toFloor: string;
  method: string;
}

export type Cell = {
  x: number;
  y: number;
  floor: string;
};

export type RouteAction = {
  floor1: string;
  floor2: string;
  type: string;
};

export type RouteCell = Cell | RouteAction;

export interface IRouteService {
  getRoutes: (props: GetRouteProps) => Promise<RouteCell[]>;
}
