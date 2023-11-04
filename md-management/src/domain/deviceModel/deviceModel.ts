import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { Task } from '../shared/task';
import { DeviceModelBrand } from './deviceModelBrand';
import { DeviceModelCode } from './deviceModelCode';
import { DeviceModelName } from './deviceModelName';

interface DeviceModelProps {
  code: DeviceModelCode;
  type: 'robot' | 'drone';
  name: DeviceModelName;
  brand: DeviceModelBrand;
  capabilities: Task[];
}

export class DeviceModel extends AggregateRoot<DeviceModelProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): DeviceModelCode {
    return this.props.code;
  }

  get type(): 'robot' | 'drone' {
    return this.props.type;
  }

  get name(): DeviceModelName {
    return this.props.name;
  }

  get brand(): DeviceModelBrand {
    return this.props.brand;
  }

  get capabilities(): Task[] {
    return this.props.capabilities;
  }

  private constructor(props: DeviceModelProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: DeviceModelProps, id?: UniqueEntityID): Result<DeviceModel> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.type, argumentName: 'type' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.brand, argumentName: 'brand' },
      { argument: props.capabilities, argumentName: 'capabilities' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<DeviceModel>(guardResult.message);

    const deviceModel = new DeviceModel({ ...props }, id);

    return Result.ok<DeviceModel>(deviceModel);
  }
}
