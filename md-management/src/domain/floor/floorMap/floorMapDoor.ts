import { Entity } from '@/core/domain/Entity';

interface FloorMapDoorProps {
  url: string;
  scale: {
    x: number;
    y: number;
    z: number;
  };
}

export class FloorMapDoor extends Entity<FloorMapDoorProps> {
  private constructor(props: FloorMapDoorProps) {
    super(props);
  }

  public static create(props: FloorMapDoorProps): FloorMapDoor {
    return new FloorMapDoor(props);
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
