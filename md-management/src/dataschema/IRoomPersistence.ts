export interface IRoomPersistence {
  domainId: string;
  name: string;
  description?: string;
  dimensions: {
    width: number;
    height: number;
  };
  floor: string;
}
