import { ValueObject } from '../../../../core/domain/ValueObject';
import { Result } from '../../../../core/logic/Result';

interface FloorMazeExitsProps {
  [key: string]: {
    x: number;
    y: number;
  }[];
  exits: {
    x: number;
    y: number;
    floorCode: string;
  }[];
}

export class FloorMazeExits extends ValueObject<FloorMazeExitsProps> {
  get exits(): { x: number; y: number; floorCode: string }[] {
    return this.props.exits;
  }

  private constructor(props: FloorMazeExitsProps) {
    super(props);
  }

  public static create(
    exits: { x: number; y: number; floorCode: string }[]
  ): Result<FloorMazeExits> {
    if (!exits) return Result.fail<FloorMazeExits>('Exits is null or undefined');
    return Result.ok<FloorMazeExits>(new FloorMazeExits({ exits }));
  }
}
