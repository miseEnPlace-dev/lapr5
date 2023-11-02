import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface PhoneNumberProps {
  [key: string]: string;
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  public static create(phoneNumber: string): Result<PhoneNumber> {
    const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'phoneNumber');

    // regex for portuguese phone numbers
    const regex = /^[9][1236]\d{7}$/;

    if (!guardResult.succeeded) return Result.fail<PhoneNumber>(guardResult.message);
    if (!regex.test(phoneNumber)) return Result.fail<PhoneNumber>('Invalid phone number format');

    return Result.ok<PhoneNumber>(new PhoneNumber({ value: phoneNumber }));
  }
}
