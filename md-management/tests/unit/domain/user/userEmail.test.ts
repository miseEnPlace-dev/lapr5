import { describe, expect, it } from 'vitest';

import { UserEmail } from '../../../../src/domain/user/userEmail';

describe('User Email', () => {
  it('should fail if the email is null', () => {
    const result = UserEmail.create((null as unknown) as string);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Email is null or undefined');
  });

  it('should fail if the email is undefined', () => {
    const result = UserEmail.create((undefined as unknown) as string);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Email is null or undefined');
  });

  it('should fail if the email is not in the right format', () => {
    const result = UserEmail.create('test');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Invalid email format');
  });

  it('should create a new email', () => {
    const result = UserEmail.create('email@email.com');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('email@email.com');
  });
});
