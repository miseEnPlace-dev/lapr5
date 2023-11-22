import { Entity } from '@/core/domain/Entity';

interface FloorMapPlayerProps {
  initialPosition: {
    x: number;
    y: number;
  };
  initialDirection: number;
}

export class FloorMapPlayer extends Entity<FloorMapPlayerProps> {
  private constructor(props: FloorMapPlayerProps) {
    super(props);
  }

  get initialPosition(): { x: number; y: number } {
    return this.props.initialPosition;
  }

  get initialDirection(): number {
    return this.props.initialDirection;
  }

  public static create(props: FloorMapPlayerProps): FloorMapPlayer {
    return new FloorMapPlayer(props);
  }
}
