import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { DeviceCode } from './deviceCode';
import { DeviceDescription } from './deviceDescription';
import { DeviceNickname } from './deviceNickname';
import { DeviceSerialNumber } from './deviceSerialNumber';
import { DeviceModel } from '../deviceModel/deviceModel';
import { DeviceCoordinates } from './deviceCoordinates';

interface DeviceProps {
  code: DeviceCode;
  nickname: DeviceNickname;
  description?: DeviceDescription;
  serialNumber: DeviceSerialNumber;
  model: DeviceModel;
  isAvailable?: boolean;
  initialCoordinates: DeviceCoordinates;
}

export class Device extends AggregateRoot<DeviceProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): DeviceCode {
    return this.props.code;
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

  get model(): DeviceModel {
    return this.props.model;
  }

  get isAvailable(): boolean | undefined {
    return this.props.isAvailable;
  }

  set isAvailable(value: boolean) {
    this.isAvailable = value;
  }

  public inhibit() {
    this.isAvailable = false;
  }

  get initialCoordinates(): DeviceCoordinates {
    return this.props.initialCoordinates;
  }

  constructor(props: DeviceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: DeviceProps, id?: UniqueEntityID): Result<Device> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.serialNumber, argumentName: 'serialNumber' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.isAvailable, argumentName: 'isAvailable' },
      { argument: props.initialCoordinates, argumentName: 'initialCoordinates' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) return Result.fail<Device>(guardResult.message);

    const device = new Device({ ...props }, id);

    return Result.ok<Device>(device);
  }
}
