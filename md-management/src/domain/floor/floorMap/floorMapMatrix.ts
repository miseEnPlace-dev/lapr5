import { ValueObject } from '@/core/domain/ValueObject';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';

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

    return Result.ok<FloorMapMatrix>(new FloorMapMatrix({ map }));
  }
}
