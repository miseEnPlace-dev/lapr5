import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Role } from '../role/role';
import { UserEmail } from './userEmail';
import { UserId } from './userId';
import { UserPassword } from './userPassword';

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
  phoneNumber: string;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get role(): Role {
    return this.props.role;
  }

  set role(value: Role) {
    this.props.role = value;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(value: string) {
    this.props.phoneNumber = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.phoneNumber, argumentName: 'phoneNumber' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    } else {
      const user = new User(
        {
          ...props
        },
        id
      );

      return Result.ok<User>(user);
    }
  }
}
