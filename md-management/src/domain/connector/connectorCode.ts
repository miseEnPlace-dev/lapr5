import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface ConnectorCodeProps {
  [key: string]: string;
  value: string;
}

export class ConnectorCode extends ValueObject<ConnectorCodeProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ConnectorCodeProps) {
    super(props);
  }

  public static create(id: string): Result<ConnectorCode> {
    if (id.length > 5)
      return Result.fail<ConnectorCode>('Connector code must be 5 characters or less');
    if (!/^[a-zA-Z0-9\t\s]+$/.test(id))
      return Result.fail<ConnectorCode>('Connector code must be alphanumeric');

    return Result.ok<ConnectorCode>(new ConnectorCode({ value: id }));
  }
}
