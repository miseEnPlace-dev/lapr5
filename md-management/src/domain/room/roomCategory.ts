import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { RoomCategoryEnum } from './roomCategoryEnum';

interface RoomCategoryProps {
  [key: string]: RoomCategoryEnum;
  value: RoomCategoryEnum;
}

export class RoomCategory extends ValueObject<RoomCategoryProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoomCategoryProps) {
    super(props);
  }

  public static create(category: string): Result<RoomCategory> {
    if (
      category !== RoomCategoryEnum.OFFICE &&
      category !== RoomCategoryEnum.LAB &&
      category !== RoomCategoryEnum.MEETING_ROOM &&
      category !== RoomCategoryEnum.CLASSROOM
    )
      return Result.fail<RoomCategory>(
        'Room category must be OFFICE, LAB, MEETING_ROOM or CLASSROOM'
      );

    return Result.ok<RoomCategory>(new RoomCategory({ value: category }));
  }
}
