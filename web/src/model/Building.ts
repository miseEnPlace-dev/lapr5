export interface Building {
  code: string;
  name: string;
  maxDimensions: {
    width: number;
    length: number;
  };
  description?: string;
}
