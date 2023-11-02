import { Guard } from '@/core/logic/Guard';
import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RoleTitleProps {
  [key: string]: string;
  value: string;
}
export class RoleTitle extends ValueObject<RoleTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoleTitleProps) {
    super(props);
  }

  public static create(title: string): Result<RoleTitle> {
    const guardResult = Guard.againstNullOrUndefined(title, 'RoleTitle');

    if (!guardResult.succeeded) return Result.fail<RoleTitle>(guardResult.message);
    if (!title.length) return Result.fail<RoleTitle>('Role title cannot be empty');

    return Result.ok<RoleTitle>(new RoleTitle({ value: title }));
  }
}
