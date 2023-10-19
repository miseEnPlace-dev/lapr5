import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface UserPhoneNumberProps {
  [key: string]: string;
  value: string;
}

export class UserPhoneNumber extends ValueObject<UserPhoneNumberProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPhoneNumberProps) {
    super(props);
  }

  public static create(phoneNumber: string): Result<UserPhoneNumber> {
    const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'phoneNumber');

    // regex for portuguese phone numbers
    const regex = /^[9][1236]\d{7}$/;

    if (!guardResult.succeeded) {
      return Result.fail<UserPhoneNumber>(guardResult.message);
    }

    if (!regex.test(phoneNumber)) {
      return Result.fail<UserPhoneNumber>('Invalid phone number');
    }

    return Result.ok<UserPhoneNumber>(new UserPhoneNumber({ value: phoneNumber }));
  }
}
