import { ValueObject } from '@/core/domain/ValueObject';
import { Result } from '@/core/logic/Result';

interface FloorMapExitsProps {
  [key: string]: {
    x: number;
    y: number;
  }[];
  exits: {
    x: number;
    y: number;
  }[];
}

export class FloorMapExits extends ValueObject<FloorMapExitsProps> {
  get exits(): { x: number; y: number }[] {
    return this.props.exits;
  }

  private constructor(props: FloorMapExitsProps) {
    super(props);
  }

  public static create(exits: { x: number; y: number }[]): Result<FloorMapExits> {
    if (!exits || exits.length === 0)
      return Result.fail<FloorMapExits>('Exits is null or undefined');
    return Result.ok<FloorMapExits>(new FloorMapExits({ exits }));
  }
}