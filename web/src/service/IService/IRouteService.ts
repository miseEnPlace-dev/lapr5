export interface IRouteService {
  getRoutes: (from: string, to: string, method: string) => Promise<string[]>;
}
