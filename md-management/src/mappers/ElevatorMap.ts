import { Mapper } from '../core/infra/Mapper';

import config from '@/config.mjs';
import { IElevatorPersistence } from '@/dataschema/IElevatorPersistence';
import { Elevator } from '@/domain/elevator/elevator';
import { ElevatorBranding } from '@/domain/elevator/elevatorBranding';
import { ElevatorCode } from '@/domain/elevator/elevatorCode';
import { ElevatorDescription } from '@/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '@/domain/elevator/elevatorSerialNumber';
import { Floor } from '@/domain/floor/floor';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import Container from 'typedi';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): Omit<IElevatorDTO, 'buildingCode'> {
    return {
      code: elevator.code.code,
      floorIds: elevator.floorsList.map(floor => floor.code.value.toString()),
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber?.value,
      description: elevator.description?.value
    };
  }

  public static async toDomain(elevator: IElevatorPersistence): Promise<Elevator | null> {
    const floorRepo = Container.get<IFloorRepo>(config.repos.floor.name);

    const floors: Floor[] = [];

    for (const floorId of elevator.floors) {
      const floor = await floorRepo.findByDomainId(floorId);
      if (!floor) throw new Error('Floor not found');
      /* if (floor.building.code !== building.code)
        return Result.fail<IElevatorDTO>('Floor not found in building'); */
      floors.push(floor);
    }

    const code = ElevatorCode.create(elevator.code).getValue();
    const branding =
      elevator.brand && elevator.model
        ? ElevatorBranding.create(elevator.brand, elevator.model).getValue()
        : undefined;
    const serialNumber = elevator.serialNumber
      ? ElevatorSerialNumber.create(elevator.serialNumber).getValue()
      : undefined;
    const description = elevator.description
      ? ElevatorDescription.create(elevator.description).getValue()
      : undefined;

    const elevatorOrError = Elevator.create(
      {
        code,
        branding,
        serialNumber,
        description,
        floors
      },
      new UniqueEntityID(elevator.domainId)
    );

    elevatorOrError.isFailure && console.log(elevatorOrError.error);

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator) {
    return {
      domainId: elevator.id.toString(),
      code: elevator.code.code,
      floors: elevator.floorsList.map(floor => floor.id.toString()),
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber?.value,
      description: elevator.description?.value
    };
  }
}
