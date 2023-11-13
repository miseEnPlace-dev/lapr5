import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Floor } from '../floor/floor';
import { ConnectorCode } from './connectorCode';
import { Guard } from '@/core/logic/Guard';
import { AggregateRoot } from '@/core/domain/AggregateRoot';

interface ConnectorProps {
  code: ConnectorCode;
  floor1: Floor;
  floor2: Floor;
}

export class Connector extends AggregateRoot<ConnectorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): ConnectorCode {
    return this.props.code;
  }

  get floor1(): Floor {
    return this.props.floor1;
  }

  get floor2(): Floor {
    return this.props.floor2;
  }

  private constructor(props: ConnectorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ConnectorProps, id?: UniqueEntityID): Result<Connector> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.floor1, argumentName: 'floor1' },
      { argument: props.floor2, argumentName: 'floor2' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Connector>(guardResult.message);

    const connector = new Connector({ ...props }, id);
    return Result.ok<Connector>(connector);
  }
}
