import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Role } from '../role/role';
import { PhoneNumber } from './phoneNumber';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { UserState } from './userState';

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
  phoneNumber: PhoneNumber;
  state: UserState;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
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

  get phoneNumber(): PhoneNumber {
    return this.props.phoneNumber;
  }

  get state(): UserState {
    return this.props.state;
  }

  set state(value: UserState) {
    this.props.state = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.firstName, argumentName: 'First Name' },
      { argument: props.lastName, argumentName: 'Last Name' },
      { argument: props.email, argumentName: 'Email' },
      { argument: props.role, argumentName: 'Role' },
      { argument: props.phoneNumber, argumentName: 'Phone Number' }
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
