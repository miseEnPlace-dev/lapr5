import { describe, expect, it } from 'vitest';

import { UserPassword } from '../../../../src/domain/user/userPassword';

describe('User Password', () => {
  it('should fail if the password is null', () => {
    const result = UserPassword.create({
      value: (null as unknown) as string,
      hashed: false
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Password is null or undefined');
  });

  it('should fail if the password is undefined', () => {
    const result = UserPassword.create({
      value: (undefined as unknown) as string,
      hashed: false
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Password is null or undefined');
  });

  it('should fail if the password is not in the right format', () => {
    const result = UserPassword.create({
      value: '1234567',
      hashed: false
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(
      "Password doesn't meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min]."
    );
  });

  it('should create a new password', () => {
    const result = UserPassword.create({
      value: 'Password1',
      hashed: false
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('Password1');
  });

  it('should create a new hashed password', async () => {
    const result = UserPassword.create({
      value: 'Password1'
    });

    expect(result.isSuccess).toBe(true);
    expect(await result.getValue().getHashedValue()).not.toBe('Password1');
  });

  it('should compare plain-text and hashed password', async () => {
    const result = UserPassword.create({
      value: 'Password1'
    });

    expect(result.isSuccess).toBe(true);
    expect(await result.getValue().comparePassword('Password1')).toBe(true);
    expect(await result.getValue().comparePassword('Password2')).toBe(false);
  });
});
