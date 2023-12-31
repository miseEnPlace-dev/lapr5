import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Role } from '../role/role';
import { PhoneNumber } from './phoneNumber';
import { UserEmail } from './userEmail';
import { UserNif } from './userNif';
import { UserPassword } from './userPassword';
import { UserState } from './userState';

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password?: UserPassword;
  role: Role;
  phoneNumber: PhoneNumber;
  nif?: UserNif;
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

  get password(): UserPassword | undefined {
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

  set password(password: UserPassword) {
    this.props.password = password;
  }

  set email(email: UserEmail) {
    this.props.email = email;
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  set phoneNumber(phoneNumber: PhoneNumber) {
    this.props.phoneNumber = phoneNumber;
  }

  get state(): UserState {
    return this.props.state;
  }

  set state(value: UserState) {
    this.props.state = value;
  }

  get nif(): UserNif | undefined {
    return this.props.nif;
  }

  set nif(value: UserNif | undefined) {
    this.props.nif = value;
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
