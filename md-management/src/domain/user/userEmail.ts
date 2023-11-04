import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface UserEmailProps {
  [key: string]: string;
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): Result<UserEmail> {
    const guardResult = Guard.againstNullOrUndefined(email, 'Email');
    if (!guardResult.succeeded) return Result.fail<UserEmail>(guardResult.message);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return Result.fail<UserEmail>('Invalid email format');

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }
}
