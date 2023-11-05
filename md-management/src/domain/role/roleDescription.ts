import { Guard } from '@/core/logic/Guard';
import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RoleDescriptionProps {
  [key: string]: string;
  value: string;
}
export class RoleDescription extends ValueObject<RoleDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoleDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<RoleDescription> {
    const guardResult = Guard.againstNullOrUndefined(description, 'Role Description');

    if (!guardResult.succeeded) return Result.fail<RoleDescription>(guardResult.message);
    if (!description.length)
      return Result.fail<RoleDescription>('Role description cannot be empty');

    return Result.ok<RoleDescription>(new RoleDescription({ value: description }));
  }
}
