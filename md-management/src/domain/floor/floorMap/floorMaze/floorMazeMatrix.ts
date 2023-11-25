import { ValueObject } from '../../../../core/domain/ValueObject';
import { Guard } from '../../../../core/logic/Guard';
import { Result } from '../../../../core/logic/Result';

interface FloorMazeMatrixProps {
  [key: string]: number[][];
  map: number[][];
}

export class FloorMazeMatrix extends ValueObject<FloorMazeMatrixProps> {
  get matrix(): number[][] {
    return this.props.map;
  }

  private constructor(props: FloorMazeMatrixProps) {
    super(props);
  }

  public static create(map: number[][]): Result<FloorMazeMatrix> {
    const mapGuardResult = Guard.is2DArray(map, 'map');
    if (!mapGuardResult.succeeded) return Result.fail<FloorMazeMatrix>(mapGuardResult.message);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const pos = map[i][j];
        if (!((pos >= 0 && pos <= 5) || pos === 11 || pos === 12)) {
          return Result.fail<FloorMazeMatrix>('Matrix values must be between 0 and 5 or 11 or 12');
        }
      }
    }

    return Result.ok<FloorMazeMatrix>(new FloorMazeMatrix({ map }));
  }
}
