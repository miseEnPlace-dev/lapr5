import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface UserNifProps {
  [key: string]: string;
  value: string;
}

export class UserNif extends ValueObject<UserNifProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNifProps) {
    super(props);
  }

  public static create(nif: string): Result<UserNif> {
    const guardResult = Guard.againstNullOrUndefined(nif, 'nif');
    if (!guardResult.succeeded) return Result.fail<UserNif>(guardResult.message);

    if (!this.validateNif(nif)) return Result.fail<UserNif>('Invalid NIF');

    return Result.ok<UserNif>(new UserNif({ value: nif }));
  }

  private static validateNif(nif: string): boolean {
    // has 9 digits?
    if (!/^[0-9]{9}$/.test(nif)) return false;

    // is from a person?
    if (!/^[123]|45|5/.test(nif)) return false;

    const value = nif.split('').map(Number);

    // digit check
    const tot =
      value[0] * 9 +
      value[1] * 8 +
      value[2] * 7 +
      value[3] * 6 +
      value[4] * 5 +
      value[5] * 4 +
      value[6] * 3 +
      value[7] * 2;
    const div = tot / 11;
    const mod = tot - Math.trunc(div) * 11;
    const tst = mod == 1 || mod == 0 ? 0 : 11 - mod;
    return value[8] == tst;
  }
}
