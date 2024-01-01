import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

import bcrypt from 'bcrypt';

interface UserPasswordProps {
  [key: string]: string | boolean | undefined;
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private readonly SALT_ROUNDS = 10;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */
  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    }

    return this.props.value === plainTextPassword;
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  public isAlreadyHashed(): boolean {
    return !!this.props.hashed;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  public getHashedValue(): Promise<string> {
    return new Promise(resolve => {
      if (this.isAlreadyHashed()) return resolve(this.props.value);

      return resolve(this.hashPassword(this.props.value));
    });
  }

  public static isAppropriateLength(value: string): boolean {
    return value.length >= 8;
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'Password');

    if (!propsResult.succeeded) return Result.fail<UserPassword>(propsResult.message);

    if (!props.hashed && !this.isAppropriateLength(props.value))
      return Result.fail<UserPassword>(
        "Password doesn't meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min]."
      );

    return Result.ok<UserPassword>(
      new UserPassword({
        value: props.value,
        hashed: !!props.hashed
      })
    );
  }

  public static createEmpty(): Result<UserPassword> {
    return Result.ok<UserPassword>(
      new UserPassword({
        value: ''
      })
    );
  }
}
