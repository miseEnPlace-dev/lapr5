export class UserState {
  private constructor(private name: string) {}

  static get Active() {
    return new UserState('active');
  }
  static get Pending() {
    return new UserState('pending');
  }
  static get Rejected() {
    return new UserState('rejected');
  }

  get value() {
    return this.name;
  }

  static create(value: string): UserState {
    if (value !== 'active' && value !== 'pending' && value !== 'rejected')
      throw new Error('Invalid user state');

    return new UserState(value);
  }
}
