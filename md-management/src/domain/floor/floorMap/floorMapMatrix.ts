import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface FloorMapMatrixProps {
  [key: string]: number[][];
  map: number[][];
}

export class FloorMapMatrix extends ValueObject<FloorMapMatrixProps> {
  get matrix(): number[][] {
    return this.props.map;
  }

  private constructor(props: FloorMapMatrixProps) {
    super(props);
  }

  public static create(map: number[][]): Result<FloorMapMatrix> {
    const mapGuardResult = Guard.is2DArray(map, 'map');
    if (!mapGuardResult.succeeded) return Result.fail<FloorMapMatrix>(mapGuardResult.message);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] < 0 || map[i][j] > 3) {
          return Result.fail<FloorMapMatrix>('Matrix values must be between 0 and 3');
        }
      }
    }

    return Result.ok<FloorMapMatrix>(new FloorMapMatrix({ map }));
  }
}
