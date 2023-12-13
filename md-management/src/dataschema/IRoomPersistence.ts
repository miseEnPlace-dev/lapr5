export interface IRoomPersistence {
  domainId: string;
  name: string;
  description?: string;
  dimensions: {
    width: number;
    length: number;
  };
  floorCode: string;
  category: string;
  roomDoor: { x: number; y: number };
}
