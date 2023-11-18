export interface Room {
  name: string;
  description?: string;
  dimensions: {
    width: number;
    length: number;
  };
  floorCode: string;
  category: string;
}
