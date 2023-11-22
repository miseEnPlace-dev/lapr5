import { Entity } from '@/core/domain/Entity';

interface FloorMapElevatorProps {
  url: string;
  scale: {
    x: number;
    y: number;
    z: number;
  };
}

export class FloorMapElevator extends Entity<FloorMapElevatorProps> {
  private constructor(props: FloorMapElevatorProps) {
    super(props);
  }

  public static create(props: FloorMapElevatorProps): FloorMapElevator {
    return new FloorMapElevator(props);
  }

  get url(): string {
    return this.props.url;
  }

  get scale(): {
    x: number;
    y: number;
    z: number;
  } {
    return this.props.scale;
  }
}
