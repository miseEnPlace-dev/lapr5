import { describe, expect, it } from 'vitest';
import { PhoneNumber } from '../../../../src/domain/user/phoneNumber';

describe('Phone Number', () => {
  it('should fail if the phone number is null', () => {
    const result = PhoneNumber.create((null as unknown) as string);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Phone Number is null or undefined');
  });

  it('should fail if the phone number is undefined', () => {
    const result = PhoneNumber.create((undefined as unknown) as string);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Phone Number is null or undefined');
  });

  it('should fail if the phone number is not in the right format', () => {
    const result = PhoneNumber.create('123456789');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Invalid phone number format');
  });

  it('should create a new phone number', () => {
    const result = PhoneNumber.create('912345678');

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('912345678');
  });
});
