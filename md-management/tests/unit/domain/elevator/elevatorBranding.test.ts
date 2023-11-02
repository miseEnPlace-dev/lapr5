import { describe, expect, it } from 'vitest';
import { ElevatorBranding } from '../../../../src/domain/elevator/elevatorBranding';

describe('ElevatorBranding', () => {
  it('should not allow to create a branding with a brand with more than 50 characters', () => {
    const result = ElevatorBranding.create(
      [...Array(51)].map(() => 'a').join(''),
      [...Array(50)].map(() => 'a').join('')
    );

    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a branding with a model with more than 50 characters', () => {
    const result = ElevatorBranding.create(
      [...Array(50)].map(() => 'a').join(''),
      [...Array(51)].map(() => 'a').join('')
    );

    expect(result.isFailure).toBe(true);
  });

  it('should not allow to create a branding with a brand and model with more than 50 characters', () => {
    const result = ElevatorBranding.create(
      [...Array(51)].map(() => 'a').join(''),
      [...Array(51)].map(() => 'a').join('')
    );

    expect(result.isFailure).toBe(true);
  });

  it('should create new branding with 50 characters', () => {
    const result = ElevatorBranding.create(
      [...Array(50)].map(() => 'a').join(''),
      [...Array(50)].map(() => 'a').join('')
    );
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().brand).toBe([...Array(50)].map(() => 'a').join(''));
    expect(result.getValue().model).toBe([...Array(50)].map(() => 'a').join(''));
  });
});
