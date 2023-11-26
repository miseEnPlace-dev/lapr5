export interface GetRouteProps {
  fromX: number;
  fromY: number;
  fromFloor: string;
  toX: number;
  toY: number;
  toFloor: string;
  method: string;
}

export interface IRouteService {
  getRoutes: (props: GetRouteProps) => Promise<
    {
      x: number;
      y: number;
      floor: string;
    }[]
  >;
}
