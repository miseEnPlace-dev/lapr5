export interface IRoomPersistence {
  domainId: string;
  name: string;
  description?: string;
  dimensions: {
    width: number;
    length: number;
  };
  floor: string;
  category: string;
}
