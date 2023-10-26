import { Guard } from '@/core/logic/Guard';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { DeviceDescription } from './deviceDescription';
import { DeviceNickname } from './deviceNickname';
import { DeviceSerialNumber } from './deviceSerialNumber';
import { Result } from '@/core/logic/Result';
import { DeviceModelCode } from '../device-model/deviceModelCode';

interface DeviceProps {
  nickname: DeviceNickname;
  description?: DeviceDescription;
  serialNumber: DeviceSerialNumber;
  modelCode: DeviceModelCode;
  isAvailable?: boolean;
}

export class Device extends AggregateRoot<DeviceProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get nickname(): DeviceNickname {
    return this.props.nickname;
  }

  get description(): DeviceDescription | undefined {
    return this.props.description;
  }

  get serialNumber(): DeviceSerialNumber {
    return this.props.serialNumber;
  }

  get modelCode(): DeviceModelCode {
    return this.props.modelCode;
  }

  get isAvailable(): boolean | undefined {
    return this.props.isAvailable;
  }

  constructor(props: DeviceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: DeviceProps, id?: UniqueEntityID): Result<Device> {
    const guardedProps = [
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.serialNumber, argumentName: 'serialNumber' },
      { argument: props.modelCode, argumentName: 'modelCode' },
      { argument: props.isAvailable, argumentName: 'isAvailable' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Device>(guardResult.message);

    const device = new Device({ ...props }, id);

    return Result.ok<Device>(device);
  }
}
