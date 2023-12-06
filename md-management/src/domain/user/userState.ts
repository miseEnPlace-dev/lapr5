export class UserState {
  private constructor(private name: string) {}

  static get Active() {
    return new UserState('active');
  }
  static get Inactive() {
    return new UserState('inactive');
  }
  static get Deleted() {
    return new UserState('deleted');
  }

  get value() {
    return this.name;
  }

  static create(value: string): UserState {
    if (value !== 'active' && value !== 'inactive' && value !== 'deleted')
      throw new Error('Invalid user state');

    return new UserState(value);
  }
}
