import { describe, expect, it } from 'vitest';
import { ConnectorCode } from '../../../../src/domain/connector/connectorCode';

describe('ConnectorCode', () => {
  it('should not allow to create a code with more than 5 characters', () => {
    const result = ConnectorCode.create([...Array(6)].map(() => 'a').join(''));

    expect(result.isFailure).toBe(true);
  });

  it('should create new code with 5 characters', () => {
    const result = ConnectorCode.create([...Array(5)].map(() => 'a').join(''));
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe([...Array(5)].map(() => 'a').join(''));
  });

  it('should allow spaces', () => {
    const result = ConnectorCode.create('12 a');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('12 a');
  });

  it('should not allow special characters', () => {
    const code = ConnectorCode.create('12a!');
    expect(code.isFailure).toBe(true);
  });
});
