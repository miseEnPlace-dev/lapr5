import { Guard } from '@/core/logic/Guard';
import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RoleNameProps {
  [key: string]: string;
  value: string;
}
export class RoleName extends ValueObject<RoleNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoleNameProps) {
    super(props);
  }

  public static create(name: string): Result<RoleName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'RoleName');

    if (!guardResult.succeeded) return Result.fail<RoleName>(guardResult.message);
    if (!name.length) return Result.fail<RoleName>('Role name cannot be empty');

    return Result.ok<RoleName>(new RoleName({ value: name }));
  }
}
