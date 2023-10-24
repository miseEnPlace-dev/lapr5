import { Entity } from '@/core/domain/Entity';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Floor } from '../floor/floor';

interface ConnectorProps {
  floor1: Floor;
  floor2: Floor;
}

export class Connector extends Entity<ConnectorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get floor1(): Floor {
    return this.floor1;
  }

  get floor2(): Floor {
    return this.floor2;
  }

  private constructor(props: ConnectorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ConnectorProps, id?: UniqueEntityID): Result<Connector> {
    const connector = new Connector({ ...props }, id);
    return Result.ok<Connector>(connector);
  }
}
