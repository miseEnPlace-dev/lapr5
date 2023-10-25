import { Mapper } from '../core/infra/Mapper';

import config from '@/config.mjs';
import { IElevatorPersistence } from '@/dataschema/IElevatorPersistence';
import { Elevator } from '@/domain/elevator/elevator';
import { ElevatorBranding } from '@/domain/elevator/elevatorBranding';
import { ElevatorCode } from '@/domain/elevator/elevatorCode';
import { ElevatorDescription } from '@/domain/elevator/elevatorDescription';
import { ElevatorSerialNumber } from '@/domain/elevator/elevatorSerialNumber';
import { IElevatorDTO } from '@/dto/IElevatorDTO';
import IFloorRepo from '@/services/IRepos/IFloorRepo';
import Container from 'typedi';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): Omit<IElevatorDTO, 'buildingCode'> {
    return {
      code: elevator.code.value,
      floorCodes: elevator.floors.map(floor => floor.code.value.toString()),
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber?.value,
      description: elevator.description?.value
    };
  }

  public static async toDomain(elevator: IElevatorPersistence): Promise<Elevator | null> {
    const floorRepo = Container.get<IFloorRepo>(config.repos.floor.name);
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

    const domainFloors = [];
    for (const floor of elevator.floors) {
      const domainFloor = await floorRepo.findByCode(floor);
      domainFloor && domainFloors.push(domainFloor);
    }

    const elevatorOrError = Elevator.create(
      {
        code,
        branding,
        serialNumber,
        description,
        floors: domainFloors
      },
      new UniqueEntityID(elevator.domainId)
    );

    elevatorOrError.isFailure && console.log(elevatorOrError.error);

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): IElevatorPersistence {
    const floors = elevator.floors.map(floor => floor.id.toString());
    return {
      domainId: elevator.id.toString(),
      code: elevator.code.value,
      floors,
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber?.value,
      description: elevator.description?.value
    };
  }
}
