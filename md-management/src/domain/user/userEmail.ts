import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

import config from '@/config';

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

    const domain = /[^@]*$/.exec(email)![0];
    if (config.allowedEmailDomains && !config.allowedEmailDomains.includes(domain))
      return Result.fail<UserEmail>(
        'Invalid email domain: ' +
          domain +
          '. Allowed domains: ' +
          config.allowedEmailDomains.join(', ')
      );

    return Result.ok<UserEmail>(new UserEmail({ value: email }));
  }
}
