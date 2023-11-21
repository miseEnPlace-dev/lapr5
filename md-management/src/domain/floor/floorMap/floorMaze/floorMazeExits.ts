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
  }[];
}

export class FloorMazeExits extends ValueObject<FloorMazeExitsProps> {
  get exits(): { x: number; y: number }[] {
    return this.props.exits;
  }

  private constructor(props: FloorMazeExitsProps) {
    super(props);
  }

  public static create(exits: { x: number; y: number }[]): Result<FloorMazeExits> {
    if (!exits || exits.length === 0)
      return Result.fail<FloorMazeExits>('Exits is null or undefined');
    return Result.ok<FloorMazeExits>(new FloorMazeExits({ exits }));
  }
}
